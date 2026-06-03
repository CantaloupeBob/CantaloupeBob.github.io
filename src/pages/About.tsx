import { Link } from 'react-router';
import Section from '../components/Section';
import PageLink from '../components/PageLink';
import { socialLinks, email } from '../data/links';

export default function About() {
  return (
    <div>
      <Link to="/" className="back-link">← Home</Link>

      <div className="page-intro">
        <h1>About</h1>
      </div>

      <Section>
        <p>
          Software engineer & hobbiast algo trader focused on the blockchain space. I currently have a
          particular interest in the Hyperliquid ecosystem.
        </p>
        <p>
          Before this, I worked at [Company]. Before that, I studied [Field]
          at [University]. I've been building things on the web since [year].
        </p>
      </Section>

      <Section heading="Currently">
        <p>
          Working on [project] at [company]. Thinking about [idea].
          Reading <em>[book]</em> by [author].
        </p>
      </Section>

      <Section heading="Elsewhere">
        <ul className="link-list">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <PageLink href={link.href} external>{link.label}</PageLink>
            </li>
          ))}
          <li>
            <PageLink href={`mailto:${email}`} external>{email}</PageLink>
          </li>
        </ul>
      </Section>
    </div>
  );
}
