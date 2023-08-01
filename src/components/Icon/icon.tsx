import React, { useRef } from 'react';
import { IconProps } from './types';
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';

const IconComponent = React.forwardRef(({ icon, className }, forwardedRef) => {
	const iconRef = useRef<HTMLElement>(null);
	useRefObjectAsForwardedRef(forwardedRef, iconRef);
	return (
		<i
			ref={iconRef}
			className={`ui-icon ${icon} ${className ? className : ''}`}
			aria-hidden
		/>
	);
}) as PolymorphicForwardRefComponent<'i', IconProps>;

IconComponent.displayName = 'Icon';

export { IconComponent };
