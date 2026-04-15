interface BlogPostJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
  authorName?: string;
}

export function BlogPostJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  authorName,
}: BlogPostJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    ...(publishedAt && { datePublished: publishedAt }),
    ...(authorName && {
      author: {
        "@type": "Person",
        name: authorName,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Jersey Serenity Minds",
      url: "https://relaxolclinic.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
