import { Link } from 'react-router';
import Section from '../components/Section';
import PageLink from '../components/PageLink';
import { socialLinks, email } from '../data/links';

export default function Contact() {
  return (
    <div>
      <Link to="/" className="back-link">← Home</Link>

      <div className="page-intro">
        <h1>Contact</h1>
      </div>

      <Section>
        <p>
          The best way to reach me is by email. I try to respond within a
          few days.
        </p>
      </Section>

      <Section heading="Email">
        <ul className="link-list">
          <li>
            <PageLink href={`mailto:${email}`} external>{email}</PageLink>
          </li>
        </ul>
      </Section>

      <Section heading="Elsewhere">
        <ul className="link-list">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <PageLink href={link.href} external>{link.label}</PageLink>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
