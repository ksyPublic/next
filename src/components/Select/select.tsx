import React, { useCallback, useRef, useMemo } from 'react';
import type {
	SelectProps,
	SelectListProps,
	SelectPanelSingleSelection,
	SelectPanelMultiSelection,
	ItemProps,
	ItemInput,
} from './types';
import cx from 'clsx';
import getElementType from '../utils/getElementType';
import { useId } from '../hooks/useId';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef';
import { AnchoredOverlay, AnchoredOverlayProps } from '../AnchoredOverlay';
import { FocusZoneHookSettings } from '../hooks/useFocusZone';
import { useProvidedRefOrCreate, useProvidedStateOrCreate } from '../hooks';
import { SelectButton, SelectList } from '.';

function isMultiSelectVariant(
	selected:
		| SelectPanelSingleSelection['selected']
		| SelectPanelMultiSelection['selected'],
): selected is SelectPanelMultiSelection['selected'] {
	return Array.isArray(selected);
}

const focusZoneSettings: Partial<FocusZoneHookSettings> = {
	// Let FilteredActionList handle focus zone
	disabled: true,
};

const SelectComponent = React.forwardRef(
	(
		{
			open,
			onOpenChange,
			renderAnchor = (props: any) => <SelectButton {...props} />,
			anchorRef: externalAnchorRef,
			selected,
			title = isMultiSelectVariant(selected)
				? 'Select items'
				: 'Select an item',
			items,
			className,
			subtitle,
			overlayProps,
			id,
			placeholder,
			onChange,
			onSelectedChange,
			filterValue: externalFilterValue,
			onFilterChange: externalOnFilterChange,
			readOnly = false,
			disabled = false,
			...props
		},
		forwardedRef,
	) => {
		const selectRef = useRef<HTMLInputElement>(null);
		const ElementType = getElementType(SelectComponent, props);
		useRefObjectAsForwardedRef(forwardedRef, selectRef);

		const titleId = useId();
		const subtitleId = useId();
		const [filterValue, setInternalFilterValue] = useProvidedStateOrCreate(
			externalFilterValue,
			undefined,
			'',
		);

		const onFilterChange: SelectListProps['onFilterChange'] = useCallback(
			(value, e) => {
				externalOnFilterChange(value, e);
				setInternalFilterValue(value);
			},
			[externalOnFilterChange, setInternalFilterValue],
		);

		const focusTrapSettings = {
			initialFocusRef: selectRef,
		};

		const onOpen: AnchoredOverlayProps['onOpen'] = useCallback(
			(
				gesture: Parameters<
					Exclude<AnchoredOverlayProps['onOpen'], undefined>
				>[0],
			) => onOpenChange(true, gesture),
			[onOpenChange],
		);
		const onClose = useCallback(
			(
				gesture:
					| Parameters<Exclude<AnchoredOverlayProps['onClose'], undefined>>[0]
					| 'selection',
			) => {
				onOpenChange(false, gesture);
			},
			[onOpenChange],
		);

		const anchorRef = useProvidedRefOrCreate(externalAnchorRef);

		const renderMenuAnchor = useMemo(() => {
			if (renderAnchor === null) {
				return null;
			}

			const selectedItems = Array.isArray(selected)
				? selected
				: [...(selected ? [selected] : [])];

			return <T extends React.HTMLAttributes<HTMLElement>>(props: T) => {
				return renderAnchor({
					...props,
					children: selectedItems.length
						? selectedItems.map((item) => item.text).join(', ')
						: placeholder,
				});
			};
		}, [placeholder, renderAnchor, selected]);

		const itemsToRender = useMemo(() => {
			return (
				items &&
				items.map((item: ItemInput) => {
					const isItemSelected = isMultiSelectVariant(selected)
						? selected.includes(item)
						: selected === item;

					return {
						...item,
						role: 'option',
						selected:
							'selected' in item && item.selected === undefined
								? undefined
								: isItemSelected,
						onAction: (itemFromAction, event) => {
							item.onAction?.(itemFromAction, event);

							if (event.defaultPrevented) {
								return;
							}

							if (isMultiSelectVariant(selected)) {
								const otherSelectedItems = selected.filter(
									(selectedItem) => selectedItem !== item,
								);
								const newSelectedItems = selected.includes(item)
									? otherSelectedItems
									: [...otherSelectedItems, item];

								const multiSelectOnChange =
									onSelectedChange as SelectPanelMultiSelection['onSelectedChange'];
								multiSelectOnChange(newSelectedItems);
								return;
							}

							// single select
							const singleSelectOnChange =
								onSelectedChange as SelectPanelSingleSelection['onSelectedChange'];
							singleSelectOnChange(item === selected ? undefined : item);
							onClose('selection');
						},
					} as ItemProps;
				})
			);
		}, [onClose, onSelectedChange, items, selected]);

		const classes = cx('ui-select', `${className ? className : ''}`);

		return (
			<ElementType {...props} ref={selectRef} className="w-full">
				<AnchoredOverlay
					renderAnchor={renderMenuAnchor}
					anchorRef={anchorRef}
					open={open}
					onOpen={onOpen}
					onClose={onClose}
					overlayProps={{
						role: 'dialog',
						'aria-labelledby': titleId,
						'aria-describedby': subtitle ? subtitleId : undefined,
						...overlayProps,
					}}
					focusTrapSettings={focusTrapSettings}
					focusZoneSettings={focusZoneSettings}
				>
					<SelectList
						{...props}
						items={itemsToRender}
						onFilterChange={onFilterChange}
						inputRef={selectRef}
						filterValue={filterValue}
						role="listbox"
						aria-multiselectable={
							isMultiSelectVariant(selected) ? 'true' : 'false'
						}
						selectionVariant={
							isMultiSelectVariant(selected) ? 'multiple' : 'single'
						}
					/>
				</AnchoredOverlay>
			</ElementType>
		);
	},
) as PolymorphicForwardRefComponent<'div', SelectProps>;

SelectComponent.displayName = 'Select';

export { SelectComponent };
