import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  portalName: string;
}

const Portal = ({ children, portalName }: PropsWithChildren<PortalProps>) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById(portalName));
  }, [portalName]);

  return portalElement ? createPortal(children, portalElement) : null;
};

export default Portal;
