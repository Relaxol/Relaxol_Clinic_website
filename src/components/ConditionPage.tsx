import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";
import { ConditionV1Content } from "@/lib/templates/newSchemas";
import { Loader2 } from "lucide-react";

interface ConditionPageProps {
  slug: string;
  fallbackImage: string;
  fallback: ConditionV1Content;
}

const ConditionPage = ({ slug, fallbackImage, fallback }: ConditionPageProps) => {
  const { content, loading } = usePageContent(`conditions-${slug}`);
  // Use fallback if content is null or empty object
  const hasContent = content && Object.keys(content).length > 0 && (content as any).hero;
  const c = (hasContent ? content : fallback) as ConditionV1Content;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const heroImage = c.hero.imageUrl || fallbackImage;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                  {c.hero.subtitle || 'CONDITIONS WE TREAT'}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {c.hero.headline}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {c.hero.body}
                </p>
                <Link to={c.hero.ctaHref || '/contact'}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                    {c.hero.ctaLabel || 'Schedule a Consultation'}
                  </Button>
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={heroImage} 
                  alt={c.hero.imageAlt || c.hero.headline} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">{c.content.title}</h2>
            <div className="prose prose-lg text-muted-foreground space-y-6">
              {c.content.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {c.content.subsections.map((sub, i) => (
                <div key={i}>
                  <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">{sub.title}</h3>
                  {sub.body && <p>{sub.body}</p>}
                  {sub.bullets && sub.bullets.length > 0 && (
                    <ul className="list-disc pl-6 space-y-2">
                      {sub.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link to={c.cta.href || '/contact'}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent">
                  {c.cta.label || 'Contact Us to Learn More'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConditionPage;
