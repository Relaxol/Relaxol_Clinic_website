import { Helmet } from "react-helmet-async";

const SITE_URL = "https://relaxolclinic.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-relaxol-clinic.jpg`;
const SITE_NAME = "Relaxol Clinic";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  authorName?: string;
}

export function PageSEO({
  title,
  description,
  path = "/",
  ogTitle,
  ogDescription,
  ogImage,
  noindex = false,
  type = "website",
  publishedAt,
  authorName,
}: PageSEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${path}`;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Article-specific */}
      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === "article" && authorName && (
        <meta property="article:author" content={authorName} />
      )}
    </Helmet>
  );
}
