import React from 'react';
import { Button, ButtonProps } from '../Button';

export type SelectButtonProps = ButtonProps;

const SelectButton = React.forwardRef<
	HTMLElement,
	React.PropsWithChildren<SelectButtonProps>
>(({ children, ...props }: React.PropsWithChildren<SelectButtonProps>, ref) => {
	return (
		<Button ref={ref} type="button" {...props}>
			{children}
		</Button>
	);
});

export { SelectButton };
