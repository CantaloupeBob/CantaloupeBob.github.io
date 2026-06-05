import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router";
import {
  stuffItems,
  workItems,
  stuffComponents,
  workComponents,
} from "../content/index";
import type { StuffMeta } from "../content/index";
import "./ArticlePage.css";

interface ArticlePageProps {
  type: "stuff" | "work";
}

export default function ArticlePage({ type }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>();

  const meta = useMemo(() => {
    if (!slug) return null;
    const items = type === "stuff" ? stuffItems : workItems;
    return items.find((item) => item.slug === slug) ?? null;
  }, [type, slug]);

  if (!slug || !meta) {
    return <Navigate to="/" replace />;
  }

  const Content =
    type === "stuff" ? stuffComponents[slug] : workComponents[slug];

  if (!Content) {
    return <Navigate to="/" replace />;
  }

  const externalLink =
    type === "stuff" ? (meta as StuffMeta).externalLink : undefined;

  return (
    <div>
      <Link to="/" className="back-link">
        ← Home
      </Link>

      <div className="page-intro">
        <h1>{meta.title}</h1>
        {externalLink && (
          <p className="subtitle">
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              Travel there
            </a>{" "}
            &rarr;
          </p>
        )}
      </div>

      <article className="article">
        <Content />
      </article>
    </div>
  );
}
