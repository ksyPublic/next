export type GridColumnProps = {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export type GridProps = {
  children?: React.ReactNode
  className?: string
  Column?: GridColumnProps
  Row?: GridRowProps
  style?: React.CSSProperties
  divider?: 'vertical' | 'horizontal' | boolean
}

export type GridRowProps = {
	children?: React.ReactNode;
	className?: string;
};

