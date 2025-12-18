import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

const samplePosts = [
  {
    id: 1,
    title: "Understanding Ketamine Therapy: A Breakthrough Treatment for Depression",
    excerpt: "Discover how ketamine therapy is revolutionizing the treatment of treatment-resistant depression and providing hope for millions of patients who haven't found relief with traditional medications.",
    author: "Dr. Sangeet Khanna",
    date: "December 15, 2025",
    category: "Ketamine Therapy",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop",
    slug: "understanding-ketamine-therapy"
  },
  {
    id: 2,
    title: "SPRAVATO® vs Traditional Antidepressants: What You Need to Know",
    excerpt: "Learn about the key differences between SPRAVATO® (esketamine) and traditional antidepressants, including how they work, effectiveness, and what to expect during treatment.",
    author: "Dr. Sangeet Khanna",
    date: "December 10, 2025",
    category: "SPRAVATO®",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    slug: "spravato-vs-traditional-antidepressants"
  },
  {
    id: 3,
    title: "The Science Behind IV Vitamin Infusions for Wellness",
    excerpt: "Explore the scientific evidence supporting IV vitamin infusions and how they can boost energy, immunity, and overall wellness more effectively than oral supplements.",
    author: "Relaxol Clinical Team",
    date: "December 5, 2025",
    category: "Vitamin Infusions",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=500&fit=crop",
    slug: "science-behind-iv-vitamin-infusions"
  },
  {
    id: 4,
    title: "Managing Anxiety: Combining Therapy with Modern Treatments",
    excerpt: "A comprehensive guide to managing anxiety disorders through a combination of traditional therapy approaches and innovative treatments like ketamine-assisted therapy.",
    author: "Dr. Sangeet Khanna",
    date: "November 28, 2025",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
    slug: "managing-anxiety-modern-treatments"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#5C4A3A] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#D09B3C] font-medium mb-4 tracking-wider uppercase">Insights & Updates</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
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
          {/* Featured Post */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-[16/10] md:aspect-auto md:h-full">
                <img 
                  src={samplePosts[0].image} 
                  alt={samplePosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <span className="inline-block bg-[#D09B3C]/10 text-[#D09B3C] text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {samplePosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {samplePosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {samplePosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {samplePosts[0].author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {samplePosts[0].date}
                  </span>
                </div>
                <Link 
                  to={`/blog/${samplePosts[0].slug}`}
                  className="inline-flex items-center gap-2 text-[#D09B3C] font-medium hover:gap-3 transition-all"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePosts.slice(1).map((post) => (
              <article 
                key={post.id}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-[#D09B3C]/10 text-[#D09B3C] text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold mb-3 text-foreground line-clamp-2 group-hover:text-[#D09B3C] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

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
