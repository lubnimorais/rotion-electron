import { ReactNode } from 'react';

import { NavLink } from 'react-router-dom';

interface ToCLinkProps {
  children: ReactNode;
}

export function ToCLink(props: ToCLinkProps) {
  return <NavLink to="#" className="hover:text-rotion-50" {...props} />;
}
