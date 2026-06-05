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
        <p>This is a space for things that I like, and whatever else.</p>
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

      <Section heading="Movies/TV quick reviews">
        <p className="section-note">
          There's a difference between a quality movie and an entertaining
          movie. Ratings based on quality
        </p>
        <ul className="rapid-list">
          <li>
            <span className="item-title">Breaking Bad - 8.5/10</span>
            <span className="item-meta">
              Timeless. Should be mandatory watching in school
            </span>
          </li>
          <li>
            <span className="item-title">Better Call Saul - 9.2/10</span>
            <span className="item-meta">
              I thought the writing was even better and the characters were more
              polished than that of Breaking Bad
            </span>
          </li>
          <li>
            <span className="item-title">
              Texas Chainsaw Massacre (2022) - 0.1/10
            </span>
            <span className="item-meta">
              This might actually be the worst movie I've ever seen
            </span>
          </li>
          <li>
            <span className="item-title">Meg 2: The Trench - 2/10</span>
            <span className="item-meta">
              But so entertaining. Definitely worth the watch if you're in the
              mood for something deeply unserious
            </span>
          </li>
          <li>
            <span className="item-title">Furiosa: A Mad Max Saga - 8.5/10</span>
            <span className="item-meta">
              This could be in my top 10 all time personal favorites. Too bad
              we're gonna have to wait like another decade for a third
              installment if we get one at all
            </span>
          </li>
          <li>
            <span className="item-title">Bloodhounds - 8/10</span>
            <span className="item-meta">
              The long take fight scene choreography is sick. It's like John
              Wick but without guns. Note: It's in Korean
            </span>
          </li>
          <li>
            <span className="item-title">Tidal Wave (Haeundae) - 3.1/10</span>
            <span className="item-meta">
              Overwhelmingly mid. It's a foreign film, which I'm generally more
              charitable to, as I realize there's cultural nuance that doesn't
              always translate well to English, but between the meh character
              development and slapstick humour, I can't say I'd recommend it
            </span>
          </li>
        </ul>
      </Section>
    </div>
  );
}
