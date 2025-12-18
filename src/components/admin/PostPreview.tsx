import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PostPreviewProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content_json: any[];
    hero_image: string;
    hero_image_alt: string;
    seo_title: string;
    seo_description: string;
  };
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        const Tag = block.level === 2 ? 'h2' : 'h3';
        return (
          <Tag 
            key={index} 
            className={block.level === 2 ? 'text-2xl font-bold mt-8 mb-4' : 'text-xl font-semibold mt-6 mb-3'}
            id={block.content?.toLowerCase().replace(/\s+/g, '-')}
          >
            {block.content}
          </Tag>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {block.content}
          </p>
        );
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2">
            {block.items?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6">
            {block.content}
          </blockquote>
        );
      case 'image':
        return (
          <figure key={index} className="my-6">
            <img 
              src={block.url} 
              alt={block.alt || ''} 
              className="w-full rounded-lg"
            />
            {block.caption && (
              <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      default:
        return null;
    }
  };

  // Generate TOC from headings
  const headings = post.content_json.filter(
    (block: any) => block.type === 'heading' && (block.level === 2 || block.level === 3)
  );

  return (
    <div className="p-6 bg-background">
      {/* SEO Preview Card */}
      <div className="mb-6 p-4 border rounded-lg bg-muted/50">
        <p className="text-xs text-muted-foreground mb-1">SEO Preview</p>
        <p className="text-blue-600 text-lg font-medium truncate">
          {post.seo_title || post.title || 'Page Title'}
        </p>
        <p className="text-green-700 text-sm truncate">
          example.com/blog/{post.slug || 'slug'}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {post.seo_description || post.excerpt || 'Meta description will appear here...'}
        </p>
      </div>

      {/* Hero Image */}
      {post.hero_image && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={post.hero_image} 
            alt={post.hero_image_alt || post.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        {post.title || 'Untitled Post'}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-muted-foreground mb-6">
          {post.excerpt}
        </p>
      )}

      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="mb-8 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Table of Contents</h4>
          <ul className="space-y-1">
            {headings.map((heading: any, index: number) => (
              <li 
                key={index}
                className={heading.level === 3 ? 'ml-4' : ''}
              >
                <a 
                  href={`#${heading.content?.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-primary hover:underline text-sm"
                >
                  {heading.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        {post.content_json.length > 0 ? (
          post.content_json.map((block, index) => renderContentBlock(block, index))
        ) : (
          <p className="text-muted-foreground italic">
            No content yet. Start adding content blocks in the editor.
          </p>
        )}
      </div>

      {/* CTA Placeholder */}
      <div className="mt-8 p-6 bg-primary/10 rounded-lg text-center">
        <p className="font-semibold mb-2">Call to Action</p>
        <p className="text-sm text-muted-foreground">
          Add a CTA block to your content for conversion
        </p>
      </div>
    </div>
  );
};

export default PostPreview;
