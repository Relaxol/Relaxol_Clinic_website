import { useEffect, useState } from "react";
import { PageSEO } from "@/components/seo/PageSEO";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  hero_image: string | null;
  published_at: string | null;
  category: {
    name: string;
  } | null;
  author: {
    name: string;
  } | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          excerpt,
          slug,
          hero_image,
          published_at,
          category:categories(name),
          author:authors(name)
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const getImageUrl = (image: string | null) => {
    return image || "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop";
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Blog"
        description="Mental health insights, treatment breakthroughs, and wellness tips from the Relaxol Clinic team."
        path="/blog"
      />
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5C4A3A]/85 to-[#4A3C32]/90" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#D09B3C] font-medium mb-4 tracking-wider uppercase">Insights & Updates</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Relaxol Clinic Blog
            </h1>
            <p className="text-lg text-white/80">
              Stay informed with the latest insights on mental health treatments, 
              wellness tips, and breakthrough therapies from our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#D09B3C]" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
                No blog posts yet
              </h2>
              <p className="text-muted-foreground">
                Check back soon for new articles and insights.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              <div className="mb-16">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[16/10] md:aspect-auto md:h-full">
                    <img 
                      src={getImageUrl(posts[0].hero_image)} 
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    {posts[0].category && (
                      <span className="inline-block bg-[#D09B3C]/10 text-[#D09B3C] text-sm font-medium px-3 py-1 rounded-full mb-4">
                        {posts[0].category.name}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                      {posts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {posts[0].excerpt || "Read more about this topic..."}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      {posts[0].author && (
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {posts[0].author.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(posts[0].published_at)}
                      </span>
                    </div>
                    <Link 
                      to={`/blog/${posts[0].slug}`}
                      className="inline-flex items-center gap-2 text-[#D09B3C] font-medium hover:gap-3 transition-all"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Grid */}
              {posts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <article 
                      key={post.id}
                      className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={getImageUrl(post.hero_image)} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        {post.category && (
                          <span className="inline-block bg-[#D09B3C]/10 text-[#D09B3C] text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                            {post.category.name}
                          </span>
                        )}
                        <h3 className="text-lg font-bold mb-3 text-foreground line-clamp-2 group-hover:text-[#D09B3C] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt || "Read more..."}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {post.author.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.published_at)}
                          </span>
                        </div>
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="block px-6 pb-6"
                      >
                        <span className="inline-flex items-center gap-2 text-[#D09B3C] text-sm font-medium hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-[#5C4A3A] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated on Mental Health Insights
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest articles on treatment breakthroughs, 
              wellness tips, and clinic updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#D09B3C]"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-[#D09B3C] text-white font-medium rounded-lg hover:bg-[#B8862F] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;