import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { email } from "../data/links";
import { MailIcon } from "./icons/MailIcon";
import { GitHubIcon } from "./icons/GitHubIcon";
import { TelegramIcon } from "./icons/TelegramIcon";
import { XIcon } from "./icons/XIcon";
import "./Nav.css";

export default function Nav() {
  return (
    <header className="header">
      <Link to="/" className="site-name">
        Cantaloupe Bob
      </Link>
      <div className="nav-actions">
        <div className="nav-social">
          <a
            href={`mailto:${email}`}
            className="nav-social-link"
            aria-label="Email"
          >
            <MailIcon />
          </a>
          <a
            href="https://github.com/cantaloupebob"
            className="nav-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://t.me/cantaloupe_bob"
            className="nav-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <TelegramIcon />
          </a>
          <a
            href="https://x.com/cantaloupe_bob"
            className="nav-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <XIcon />
          </a>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
