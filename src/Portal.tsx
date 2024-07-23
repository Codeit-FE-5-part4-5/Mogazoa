import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalTypes = 'sideBar' | 'floating';

export const Portal = ({
  children,
  portalName,
}: {
  children: ReactElement;
  portalName: PortalTypes;
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById(portalName));
  }, []);

  return portalElement ? createPortal(children, portalElement) : null;
};
