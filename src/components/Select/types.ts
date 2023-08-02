import React, { AriaRole, Key } from 'react';
import {
	AnchoredOverlayProps,
	AnchoredOverlayWrapperAnchorProps,
} from '../AnchoredOverlay';
import { OverlayProps } from '../Overlay';
import { Merge } from '../utils/types';

export type ItemInput =
	| Merge<React.ComponentPropsWithoutRef<'div'>, ItemProps>
	| ((Partial<ItemProps> & { renderItem: RenderItemFn }) & { key?: Key });

export type ItemProps = {
	text?: string;
	onAction?: (
		item: ItemProps,
		event:
			| React.MouseEvent<HTMLDivElement>
			| React.KeyboardEvent<HTMLDivElement>,
	) => void;
	item?: ItemInput;
	role?: AriaRole;
	selected?: string;
};

type RenderItemFn = (props: ItemProps) => React.ReactElement;

export type SelectPanelSingleSelection = {
	selected: ItemInput | undefined;
	onSelectedChange: (selected: ItemInput | undefined) => void;
};

export type SelectPanelMultiSelection = {
	selected: ItemInput[];
	onSelectedChange: (selected: ItemInput[]) => void;
};

interface SelectBaseProps {
	placeholder?: string;
	className?: string;
	id?: string;
	value?: string;

	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	title?: string | React.ReactElement;
	subtitle?: string | React.ReactElement;
	filterValue?: string;
	onFilterChange: (
		value: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
	onOpenChange: (
		open: boolean,
		gesture:
			| 'anchor-click'
			| 'anchor-key-press'
			| 'click-outside'
			| 'escape'
			| 'selection',
	) => void;
	overlayProps?: Partial<OverlayProps>;
}

export type SelectListProps = {
	items: ItemInput[];
	role?: AriaRole;
	id?: string;
	renderItem?: RenderItemFn;
	variant?: 'inset' | 'full';
	selectionVariant?: 'single' | 'multiple';
	showItemDividers?: boolean;
	loading?: boolean;
	placeholderText?: string;
	filterValue?: string;
	onFilterChange: (
		value: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
	inputRef?: React.RefObject<HTMLInputElement>;
};

export type SelectProps = SelectBaseProps &
	Omit<SelectListProps, 'selectionVariant'> &
	Pick<AnchoredOverlayProps, 'open'> &
	AnchoredOverlayWrapperAnchorProps &
	(SelectPanelSingleSelection | SelectPanelMultiSelection);

export type SelectButtonProps = SelectBaseProps & {};
