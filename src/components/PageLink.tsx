import { Link } from 'react-router';
import type { ReactNode } from 'react';

interface PageLinkProps {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Unified link component – handles both internal (React Router) and
 * external (new tab) links through a single interface.
 */
export default function PageLink({ href, external = false, className, children }: PageLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}
