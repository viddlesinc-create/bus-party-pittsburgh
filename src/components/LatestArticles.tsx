import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Blog post images - JPG
import pricingGuideImg from "@/assets/blog-party-bus-pricing-guide.jpg";
import topEventsImg from "@/assets/blog-top-events-pittsburgh.jpg";
import busVsLimoImg from "@/assets/blog-party-bus-vs-limo.jpg";
// Blog post images - WebP
import pricingGuideImgWebP from "@/assets/blog-party-bus-pricing-guide.webp";
import topEventsImgWebP from "@/assets/blog-top-events-pittsburgh.webp";
import busVsLimoImgWebP from "@/assets/blog-party-bus-vs-limo.webp";

export function LatestArticles() {
  const latestPosts = [
    {
      title: "How Much Does a Party Bus Cost in Pittsburgh?",
      excerpt: "Everything you need to know about party bus rental pricing in Pittsburgh, including factors that affect cost.",
      image: pricingGuideImg,
      imageWebP: pricingGuideImgWebP,
      category: "Pricing Guide",
      date: "March 15, 2024",
      readTime: "8 min",
      slug: "party-bus-pricing-guide"
    },
    {
      title: "Top 10 Events to Book a Party Bus For",
      excerpt: "From Steelers games to weddings, discover the best occasions for luxury group transportation.",
      image: topEventsImg,
      imageWebP: topEventsImgWebP,
      category: "Event Planning",
      date: "March 12, 2024",
      readTime: "6 min",
      slug: "top-events-pittsburgh"
    },
    {
      title: "Party Bus vs. Limo: Which is Best?",
      excerpt: "Compare party buses and limousines to choose the perfect vehicle for your celebration.",
      image: busVsLimoImg,
      imageWebP: busVsLimoImgWebP,
      category: "Vehicle Guide",
      date: "March 10, 2024",
      readTime: "5 min",
      slug: "party-bus-vs-limo"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Party Bus Tips & Guides
          </h2>
          <p className="text-xl text-muted-foreground">
            Expert advice for planning your perfect Pittsburgh celebration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <picture>
                  <source type="image/webp" srcSet={post.imageWebP} />
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </picture>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" className="w-full bg-background/50 border-2">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
