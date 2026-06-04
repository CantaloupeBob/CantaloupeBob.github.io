import Section from "../components/Section";
import PageLink from "../components/PageLink";
import { workItems } from "../content/index";

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

      <Section heading="Stuff">
        <ul className="link-list">
          {workItems.map((item) => (
            <li key={item.slug}>
              <PageLink href={`/work/${item.slug}`}>{item.title}</PageLink>
              <span className="item-meta">{item.description}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
