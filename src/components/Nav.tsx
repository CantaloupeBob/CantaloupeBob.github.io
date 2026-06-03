import { Link } from 'react-router';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <header className="header">
      <Link to="/" className="site-name">Cantaloupe Bob</Link>
      <ThemeToggle />
    </header>
  );
}
