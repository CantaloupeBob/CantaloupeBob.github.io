import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router";
import {
  workItems,
  writingItems,
  workComponents,
  writingComponents,
} from "../content/index";
import type { WorkMeta } from "../content/index";

interface ArticlePageProps {
  type: "work" | "writing";
}

export default function ArticlePage({ type }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>();

  const meta = useMemo(() => {
    if (!slug) return null;
    const items = type === "work" ? workItems : writingItems;
    return items.find((item) => item.slug === slug) ?? null;
  }, [type, slug]);

  if (!slug || !meta) {
    return <Navigate to="/" replace />;
  }

  const Content =
    type === "work" ? workComponents[slug] : writingComponents[slug];

  if (!Content) {
    return <Navigate to="/" replace />;
  }

  const externalLink =
    type === "work" ? (meta as WorkMeta).externalLink : undefined;

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
              Perpetual trading with prediction market based signals.
            </a>
          </p>
        )}
      </div>

      <article className="article">
        <Content />
      </article>
    </div>
  );
}
