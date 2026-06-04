import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import ArticlePage from "../pages/ArticlePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "stuff/:slug", element: <ArticlePage type="stuff" /> },
      { path: "work/:slug", element: <ArticlePage type="work" /> },
      // Catch-all: redirect any unknown path back to home
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
