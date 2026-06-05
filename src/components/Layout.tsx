import { Outlet, ScrollRestoration } from "react-router";
import Nav from "./Nav";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <ScrollRestoration />
      <Nav />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
