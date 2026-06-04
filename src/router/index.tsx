import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import ArticlePage from "../pages/ArticlePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "work/:slug", element: <ArticlePage type="work" /> },
      { path: "writing/:slug", element: <ArticlePage type="writing" /> },
    ],
  },
]);
