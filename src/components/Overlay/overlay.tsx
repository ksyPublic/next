import React, { useRef, ComponentPropsWithRef } from 'react';
import { Portal } from '@/components';
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';
import { TouchOrMouseEvent } from '../hooks';
import styled from 'styled-components';
import { Merge, AriaRole } from '../utils/types';
import { useOverlay } from '../hooks';

type StyledOverlayProps = {
	width?: keyof typeof widthMap;
	height?: keyof typeof heightMap;
	maxHeight?: keyof Omit<typeof heightMap, 'auto' | 'initial'>;
	maxWidth?: keyof Omit<typeof widthMap, 'auto'>;
	visibility?: 'visible' | 'hidden';
};

const heightMap = {
	xs: '240px',
	sm: '360px',
	md: '640px',
	lg: '800px',
	xlg: '960px',
	auto: 'auto',
	initial: 'auto', // Passing 'initial' initially applies 'auto'
};

const widthMap = {
	xs: '360px',
	sm: '480px',
	md: '640px',
	lg: '800px',
	xlg: '960px',
	auto: 'auto',
};

const animationDuration = 200;

export type BaseOverlayProps = {
	ignoreClickRefs?: React.RefObject<HTMLElement>[];
	initialFocusRef?: React.RefObject<HTMLElement>;
	returnFocusRef: React.RefObject<HTMLElement>;
	onClickOutside: (e: TouchOrMouseEvent) => void;
	onEscape: (e: KeyboardEvent) => void;
	portalContainerName?: string;
	visibility?: 'visible' | 'hidden';
	position?: React.CSSProperties['position'];
	top?: React.CSSProperties['top'];
	left?: React.CSSProperties['left'];
	right?: React.CSSProperties['right'];
	bottom?: React.CSSProperties['bottom'];
	preventFocusOnOpen?: boolean;
	role?: AriaRole;
	children?: React.ReactNode;
};

type OwnOverlayProps = Merge<StyledOverlayProps, BaseOverlayProps>;

const StyledOverlay = styled.div<StyledOverlayProps>``;

const Overlay = React.forwardRef<HTMLDivElement, OwnOverlayProps>(
	(
		{
			onClickOutside,
			role = 'none',
			initialFocusRef,
			returnFocusRef,
			ignoreClickRefs,
			onEscape,
			portalContainerName,
			height = 'auto',
			width = 'auto',
			top,
			visibility = 'visible',
			left,
			right,
			bottom,
			position,
			preventFocusOnOpen,
			...rest
		},
		forwardedRef,
	) => {
		const overlayRef = useRef<HTMLDivElement>(null);
		useRefObjectAsForwardedRef(forwardedRef, overlayRef);
		useOverlay({
			overlayRef,
			returnFocusRef,
			onEscape,
			ignoreClickRefs,
			onClickOutside,
			initialFocusRef,
			preventFocusOnOpen,
		});
		return (
			<Portal containerName={portalContainerName}>
				<StyledOverlay
					{...rest}
					width={width}
					height={height}
					ref={overlayRef}
					style={
						{
							right,
							top,
							bottom,
							position,
							'--styled-overlay-visibility': visibility,
						} as React.CSSProperties
					}
				/>
			</Portal>
		);
	},
) as PolymorphicForwardRefComponent<'div', OwnOverlayProps>;

export type OverlayProps = ComponentPropsWithRef<typeof Overlay>;

export default Overlay;
