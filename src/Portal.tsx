import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({
  children,
  portalName,
}: {
  children: ReactElement;
  portalName: string;
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById(portalName));
  }, [portalName]);

  return portalElement ? createPortal(children, portalElement) : null;
};

export default Portal;
