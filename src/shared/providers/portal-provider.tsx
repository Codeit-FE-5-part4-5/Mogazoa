import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children }: { children: ReactElement }) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('portal'));
  }, []);

  return portalElement ? createPortal(children, portalElement) : null;
}
