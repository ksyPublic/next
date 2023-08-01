import React from 'react';
import { createPortal } from 'react-dom';
import useLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

const PRIMER_PORTAL_ROOT_ID = '__PortalRoot__';
const DEFAULT_PORTAL_CONTAINER_NAME = '__default__';

export type PortalProps = {
	onMount?: () => void;
	containerName?: string;
};

const portalRootRegistry: Partial<Record<string, Element>> = {};

/**
 * Register a container to serve as a portal root.
 * @param root The element that will be the root for portals created in this container
 * @param name The name of the container, to be used with the `containerName` prop on the Portal Component.
 * If name is not specified, registers the default portal root.
 */
export function registerPortalRoot(
	root: Element,
	name = DEFAULT_PORTAL_CONTAINER_NAME,
): void {
	portalRootRegistry[name] = root;
}

function ensureDefaultPortal() {
	const existingDefaultPortalContainer =
		portalRootRegistry[DEFAULT_PORTAL_CONTAINER_NAME];
	if (
		!existingDefaultPortalContainer ||
		!document.body.contains(existingDefaultPortalContainer)
	) {
		let defaultPortalContainer = document.getElementById(PRIMER_PORTAL_ROOT_ID);
		if (!(defaultPortalContainer instanceof Element)) {
			defaultPortalContainer = document.createElement('div');
			defaultPortalContainer.setAttribute('id', PRIMER_PORTAL_ROOT_ID);
			defaultPortalContainer.style.position = 'absolute';
			defaultPortalContainer.style.top = '0';
			defaultPortalContainer.style.left = '0';
			const suitablePortalRoot = document.querySelector('[data-portal-root]');
			if (suitablePortalRoot) {
				suitablePortalRoot.appendChild(defaultPortalContainer);
			} else {
				document.body.appendChild(defaultPortalContainer);
			}
		}

		registerPortalRoot(defaultPortalContainer);
	}
}

const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({
	children,
	onMount,
	containerName: _containerName,
}) => {
	const hostElement = document.createElement('div');

	hostElement.style.position = 'relative';
	hostElement.style.zIndex = '1';
	const elementRef = React.useRef(hostElement);

	useLayoutEffect(() => {
		let containerName = _containerName;
		if (containerName === undefined) {
			containerName = DEFAULT_PORTAL_CONTAINER_NAME;
			ensureDefaultPortal();
		}
		const parentElement = portalRootRegistry[containerName];

		if (!parentElement) {
			throw new Error(
				`Portal container '${_containerName}' is not yet registered. Container must be registered with registerPortal before use.`,
			);
		}
		const element = elementRef.current;
		parentElement.appendChild(element);
		onMount?.();

		return () => {
			parentElement.removeChild(element);
		};
	}, [elementRef]);

	return createPortal(children, elementRef.current);
};

Portal.displayName = 'Portal';

export { Portal };
