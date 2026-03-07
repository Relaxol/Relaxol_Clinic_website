import { useEffect, useState } from "react";
import { PageSEO } from "@/components/seo/PageSEO";
import { BlogPostJsonLd } from "@/components/seo/BlogPostJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  hero_image: string | null;
  hero_image_alt: string | null;
  content_json: any;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  category: {
    name: string;
    slug: string;
  } | null;
  author: {
    name: string;
    bio: string | null;
    avatar_url: string | null;
  } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          excerpt,
          slug,
          hero_image,
          hero_image_alt,
          content_json,
          published_at,
          seo_title,
          seo_description,
          category:categories(name, slug),
          author:authors(name, bio, avatar_url)
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .maybeSingle();

      if (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } else if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
        // Update document title for SEO
        document.title = data.seo_title || data.title;
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const renderContent = (contentJson: any) => {
    if (!contentJson || !Array.isArray(contentJson)) {
      return <p className="text-muted-foreground">No content available.</p>;
    }

    return contentJson.map((block: any, index: number) => {
      switch (block.type) {
        case "heading":
          const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag 
              key={index} 
              className={`font-bold mb-4 ${
                block.level === 1 ? "text-3xl" : 
                block.level === 2 ? "text-2xl" : 
                block.level === 3 ? "text-xl" : "text-lg"
              }`}
            >
              {block.text}
            </HeadingTag>
          );
        case "paragraph":
          return (
            <p key={index} className="text-foreground/80 mb-4 leading-relaxed">
              {block.text}
            </p>
          );
        case "image":
          return (
            <figure key={index} className="my-8">
              <img 
                src={block.url} 
                alt={block.alt || ""} 
                className="w-full rounded-lg"
              />
              {block.caption && (
                <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        case "list":
          const ListTag = block.style === "ordered" ? "ol" : "ul";
          return (
            <ListTag 
              key={index} 
              className={`mb-4 pl-6 ${block.style === "ordered" ? "list-decimal" : "list-disc"}`}
            >
              {block.items?.map((item: string, i: number) => (
                <li key={i} className="text-foreground/80 mb-2">{item}</li>
              ))}
            </ListTag>
          );
        case "quote":
          return (
            <blockquote 
              key={index} 
              className="border-l-4 border-[#D09B3C] pl-6 my-6 italic text-foreground/70"
            >
              {block.text}
            </blockquote>
          );
        default:
          // Fallback for plain text
          if (typeof block === "string") {
            return <p key={index} className="text-foreground/80 mb-4 leading-relaxed">{block}</p>;
          }
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-[#D09B3C]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-[#D09B3C] font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#5C4A3A] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            {post.category && (
              <span className="inline-block bg-[#D09B3C]/20 text-[#D09B3C] text-sm font-medium px-3 py-1 rounded-full mb-4">
                {post.category.name}
              </span>
            )}
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-lg text-white/80 mb-8">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex items-center gap-6 text-sm text-white/70">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.avatar_url && (
                    <img 
                      src={post.author.avatar_url} 
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author.name}
                  </span>
                </div>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {post.hero_image && (
        <div className="container mx-auto px-4 -mt-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src={post.hero_image} 
              alt={post.hero_image_alt || post.title}
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {renderContent(post.content_json)}
          </div>
        </div>
      </article>

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-6 p-6 bg-card rounded-xl">
                {post.author.avatar_url && (
                  <img 
                    src={post.author.avatar_url} 
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <h3 className="font-semibold text-lg mb-2">{post.author.name}</h3>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h3>
            <p className="text-muted-foreground mb-8">
              Schedule a consultation with our team to discuss your treatment options.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-3 bg-[#D09B3C] text-white font-medium rounded-lg hover:bg-[#B8862F] transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;