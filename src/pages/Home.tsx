import Section from "../components/Section";
import PageLink from "../components/PageLink";
import { stuffItems, workItems } from "../content/index";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <div className="page-intro">
        <div className="intro-header">
          <h1>Cantaloupe Bob</h1>
        </div>
        <p className="subtitle">Rich or poor, it's nice to have money ...</p>
      </div>

      <Section>
        <p>
          Software engineer focused on blockchain with a current interest in
          perps.
        </p>
        <p>This is a space for things that I like, and whatever else.</p>
      </Section>

      <Section heading="Work">
        <p className="section-note">
          As this site reflects personal likes & interests, I'm excluding
          specifics about my professional experience. If you need help building
          something sick, message me if you want to know more
        </p>
        <ul className="link-list">
          {workItems.map((item) => (
            <li key={item.slug}>
              <PageLink href={`/work/${item.slug}`}>{item.title}</PageLink>
              <span className="item-meta">{item.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Open Source">
        <p className="section-note">
          I've been meaning to contribute to more open source projects
        </p>
        <ul className="rapid-list">
          <li>
            <span className="item-title">
              {" "}
              <a href="https://github.com/hyperliquid-dex/hyperliquid-python-sdk/pull/186">
                Hyperliquid Python SDK
              </a>
            </span>
            <span className="item-meta">
              Added the ability to run examples from encrypted keystores. Needed
              this for my local workflow and thought it was worth pushing
            </span>
          </li>
        </ul>
      </Section>

      <Section heading="Stuff">
        <p className="section-note">Things I've made fueled by boredom</p>
        <ul className="link-list">
          {stuffItems.map((item) => (
            <li key={item.slug}>
              <PageLink href={`/stuff/${item.slug}`}>{item.title}</PageLink>
              <span className="item-meta">{item.description}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
