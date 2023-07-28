import React, {
	useState,
	ChangeEventHandler,
	useCallback,
	useRef,
	useEffect,
} from 'react';
import type { SelectProps } from './types';
import cx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';
import getElementType from '../utils/getElementType';

import SelectButton from './selectbutton';
import SelectPanel from './selectpanel';

interface SelectComponentProps extends SelectProps {
	Button: typeof SelectButton;
	Panel: typeof SelectPanel;
}

const SelectComponent = React.forwardRef(
	(
		{ className, id, placeholder, selectOptions, onChange, ...props },
		forwardedRef,
	) => {
		const [selectedValue, setSelectedValue] = useState('');
		const [uniqueId, setUniqueId] = useState<string>('');

		const handleChange: ChangeEventHandler<HTMLDivElement> = useCallback(
			(event) => {
				onChange && onChange(event);
				setSelectedValue(event.target.value);
			},
			[onChange, setSelectedValue],
		);

		const selectRef = useRef<HTMLDivElement>(null);
		useRefObjectAsForwardedRef(forwardedRef, selectRef);
		const ElementType = getElementType(SelectComponent, props);

		const classes = cx('ui-select', `${className ? className : ''}`);

		useEffect(() => {
			!id ? setUniqueId(uuidv4().slice(0, 8)) : setUniqueId(id);
		}, [id]);

		return (
			<ElementType {...props} ref={selectRef} className="w-full">
				{/* <select
          {...props}
          className={classes}
          id={uniqueId}
          value={selectedValue}
          onChange={handleChange}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {selectOptions &&
            Object.entries(selectOptions).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
        </select> */}
			</ElementType>
		);
	},
) as PolymorphicForwardRefComponent<'div', SelectProps>;

SelectComponent.displayName = 'Div';

SelectComponent.Button = SelectButton;
SelectComponent.Panel = SelectPanel;

export { SelectComponent };
