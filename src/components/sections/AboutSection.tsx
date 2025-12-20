import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import aboutClinic from "@/assets/about-clinic.jpg";

interface AboutContent {
  subtitle?: string;
  title?: string;
  bodyHtml?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface AboutSectionProps {
  content?: AboutContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  const subtitle = content?.subtitle || "WHY RELAXOL CLINIC";
  const title = content?.title || "A New Standard in Mental Health Care";
  const imageUrl = content?.imageUrl || aboutClinic;
  const imageAlt = content?.imageAlt || "Modern treatment facility interior";
  
  // Default body paragraphs
  const defaultBody = `<p class="text-muted-foreground text-lg leading-relaxed mb-6">At Relaxol Clinic, we combine advanced psychiatric expertise with FDA-approved treatments like SPRAVATO® and ketamine infusion therapy. Our approach is grounded in evidence-based medicine while remaining attentive to each patient's unique journey. Whether you're struggling with treatment-resistant depression, chronic anxiety, PTSD, or OCD, our team is here to provide compassionate, clinician-led care.</p><p class="text-muted-foreground text-lg leading-relaxed mb-8">We believe mental health care should be accessible, personalized, and delivered in an environment that feels safe. That's why our clinic offers private treatment rooms, flexible scheduling, and support navigating insurance—because healing shouldn't feel like a hurdle.</p>`;
  const bodyHtml = content?.bodyHtml ?? defaultBody;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {title.includes("Mental Health Care") ? (
              <>A New Standard in <span className="text-primary">Mental Health Care</span></>
            ) : title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="image-card aspect-[4/3]">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div 
              className="prose prose-lg max-w-none [&>p]:text-muted-foreground [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6 [&>p:last-of-type]:mb-8"
              dangerouslySetInnerHTML={{ __html: bodyHtml }} 
            />
            <Link to="/contact">
              <Button className="bg-[#D09B3C] hover:bg-[#C48A25] text-white px-8 py-6 text-base rounded-full">
                Schedule Your Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
