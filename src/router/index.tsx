import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ArticlePage from '../pages/ArticlePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'work/:slug', element: <ArticlePage type="work" /> },
      { path: 'writing/:slug', element: <ArticlePage type="writing" /> },
    ],
  },
]);
