import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
            <Link to="/contact">
              <Button variant="luxury" size="lg">
                Get Free Quote
              </Button>
            </Link>
            <Link to="/fleet">
              <Button variant="outline" size="lg" className="bg-white/10 text-accent-foreground border-accent-foreground/20">
                View Our Fleet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostLayout;
