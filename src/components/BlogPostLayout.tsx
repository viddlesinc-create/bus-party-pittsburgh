import { MetaTags } from "@/components/MetaTags";
import { StructuredData, articleSchema } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPosts } from "@/components/RelatedPosts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Import blog post images for related posts
import topEventsImg from "@/assets/blog-top-events-pittsburgh.jpg";
import busVsLimoImg from "@/assets/blog-party-bus-vs-limo.jpg";
import bachelorPartyImg from "@/assets/blog-bachelor-bachelorette-party.jpg";
import weddingTransportImg from "@/assets/blog-wedding-transportation.jpg";
import safetyTipsImg from "@/assets/blog-party-bus-safety-tips.jpg";
import pricingGuideImg from "@/assets/blog-party-bus-pricing-guide.jpg";

interface BlogPostLayoutProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  children: React.ReactNode;
}

const BlogPostLayout = ({
  title,
  excerpt,
  category,
  date,
  readTime,
  author,
  image,
  children,
}: BlogPostLayoutProps) => {
  const slug = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // Related posts data - can be customized per blog post
  const relatedPosts = [
    {
      title: "How Much Does a Party Bus Cost in Pittsburgh?",
      excerpt: "Complete guide to party bus pricing in Pittsburgh with cost factors and money-saving tips.",
      slug: "party-bus-pricing-guide",
      image: pricingGuideImg,
      date: "March 15, 2024",
      readTime: "8 min"
    },
    {
      title: "Party Bus Safety Tips for a Fun Night Out",
      excerpt: "Essential safety guidelines to ensure your party bus experience is both fun and secure.",
      slug: "party-bus-safety-tips",
      image: safetyTipsImg,
      date: "February 22, 2024",
      readTime: "6 min"
    },
    {
      title: "Top 10 Events to Book a Party Bus For in Pittsburgh",
      excerpt: "Discover the best occasions for luxury group transportation in the Steel City.",
      slug: "top-events-pittsburgh",
      image: topEventsImg,
      date: "March 12, 2024",
      readTime: "6 min"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title={title}
        description={excerpt}
        canonical={slug}
        ogImage={image}
        type="article"
        article={{
          publishedTime: new Date(date).toISOString(),
          author: author
        }}
      />
      <StructuredData data={articleSchema({
        title,
        description: excerpt,
        image: `https://pittpartybus.com${image}`,
        datePublished: new Date(date).toISOString(),
        author
      })} />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { name: "Blog", url: "/blog" },
          { name: title.substring(0, 50) + (title.length > 50 ? "..." : ""), url: slug }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 text-primary-foreground hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          <Badge className="bg-accent text-accent-foreground font-semibold mb-4">
            {category}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8">
            {excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
            <span className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {author}
            </span>
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {date}
            </span>
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img 
            src={image} 
            alt={title}
            className="w-full rounded-lg shadow-luxury h-96 object-cover"
            loading="lazy"
            width="1200"
            height="600"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </article>

      {/* Internal Links Section */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/fleet" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">View Our Fleet →</h3>
                <p className="text-sm text-muted-foreground">Explore luxury vehicles for any group size</p>
              </div>
            </Link>
            <Link to="/pricing" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Check Pricing →</h3>
                <p className="text-sm text-muted-foreground">Transparent rates and instant quotes</p>
              </div>
            </Link>
            <Link to="/events" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Event Services →</h3>
                <p className="text-sm text-muted-foreground">Perfect transportation for any occasion</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} title="You Might Also Like" />

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-4">
            Ready to Book Your Party Bus?
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8">
            Get a free quote for your Pittsburgh party bus rental today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="luxury" size="lg" asChild>
              <Link to="/contact">
                Get Free Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/20 border-2 text-accent-foreground border-accent-foreground/40 backdrop-blur-sm" asChild>
              <Link to="/fleet">
                View Our Fleet
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostLayout;
