import type { ReactNode } from 'react';

interface SectionProps {
  heading?: string;
  children: ReactNode;
}

/**
 * A titled content block — the primary building unit of every page.
 * Heading is optional; omit it for the opening/intro section.
 */
export default function Section({ heading, children }: SectionProps) {
  return (
    <section className="section">
      {heading && <h2>{heading}</h2>}
      <div className="section-body">{children}</div>
    </section>
  );
}
