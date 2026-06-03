import Section from "../components/Section";
import PageLink from "../components/PageLink";
import { workItems, writingItems } from "../content/index";
import { email } from "../data/links";

export default function Home() {
  return (
    <div>
      <div className="page-intro">
        <h1>Cantaloupe Bob</h1>
        <p className="subtitle">Rich or poor, it's nice to have money...</p>
      </div>

      <Section>
        <p>
          Software engineer focused on blockchain with a particular interest in
          the{" "}
          <a
            href="https://hyperfoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hyperliquid ecosystem
          </a>
          .
        </p>
        <p>
          This is a space for things that I like, and whatever else accumulates
          over time.
        </p>
      </Section>

      <Section heading="Work">
        <ul className="link-list">
          {workItems.map((item) => (
            <li key={item.slug}>
              <PageLink href={`/work/${item.slug}`}>{item.title}</PageLink>
              <span className="item-meta">{item.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Writing">
        <ul className="link-list">
          {writingItems.map((item) => (
            <li key={item.slug}>
              <PageLink href={`/writing/${item.slug}`}>{item.title}</PageLink>
              <span className="item-meta">{item.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="About">
        <p>A bit more about who I am and what I care about.</p>
        <ul className="link-list">
          <li>
            <PageLink href="/about">Read more →</PageLink>
          </li>
        </ul>
      </Section>

      <Section heading="Contact">
        <ul className="link-list">
          <li>
            <PageLink href={`mailto:${email}`} external>
              {email}
            </PageLink>
          </li>
          <li>
            <PageLink href="/contact">Other ways to reach me →</PageLink>
          </li>
        </ul>
      </Section>
    </div>
  );
}
