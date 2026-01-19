import { MetaTags } from "@/components/MetaTags";
import { StructuredData, breadcrumbSchema } from "@/components/StructuredData";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  Heart,
  GraduationCap,
  Users,
  Briefcase,
  Music,
  DollarSign,
  Car,
  Shield,
  MapPin
} from "lucide-react";
import { useLoaderData } from "@/lib/use-loader-data";
import { BlogData } from "@/loaders/blog";

// Blog post images - JPG
import pricingGuideImg from "@/assets/blog-party-bus-pricing-guide.jpg";
import topEventsImg from "@/assets/blog-top-events-pittsburgh.jpg";
import busVsLimoImg from "@/assets/blog-party-bus-vs-limo.jpg";
import bachelorPartyImg from "@/assets/blog-bachelor-bachelorette-party.jpg";
import weddingTransportImg from "@/assets/blog-wedding-transportation.jpg";
import corporateEventImg from "@/assets/blog-corporate-event-transportation.jpg";
import concertBusImg from "@/assets/blog-concert-party-bus.jpg";
import promSafetyImg from "@/assets/blog-prom-transportation-safety.jpg";
import safetyTipsImg from "@/assets/blog-party-bus-safety-tips.jpg";
import onlineEstimateImg from "@/assets/blog-online-party-bus-estimate.jpg";
import fleetShowcaseImg from "@/assets/fleet-showcase.jpg";
// Blog post images - WebP
import pricingGuideImgWebP from "@/assets/blog-party-bus-pricing-guide.webp";
import topEventsImgWebP from "@/assets/blog-top-events-pittsburgh.webp";
import busVsLimoImgWebP from "@/assets/blog-party-bus-vs-limo.webp";
import bachelorPartyImgWebP from "@/assets/blog-bachelor-bachelorette-party.webp";
import weddingTransportImgWebP from "@/assets/blog-wedding-transportation.webp";
import corporateEventImgWebP from "@/assets/blog-corporate-event-transportation.webp";
import concertBusImgWebP from "@/assets/blog-concert-party-bus.webp";
import promSafetyImgWebP from "@/assets/blog-prom-transportation-safety.webp";
import safetyTipsImgWebP from "@/assets/blog-party-bus-safety-tips.webp";
import onlineEstimateImgWebP from "@/assets/blog-online-party-bus-estimate.webp";
import fleetShowcaseImgWebP from "@/assets/fleet-showcase.webp";

const Blog = () => {
  // Get SSR data if available (for meta tags during SSR)
  const { data: ssrData } = useLoaderData<BlogData>();
  
  const featuredPost = {
    title: "How Much Does a Party Bus Cost in Pittsburgh? Complete 2024 Guide",
    excerpt: "Everything you need to know about party bus rental pricing in Pittsburgh, including factors that affect cost, seasonal variations, and money-saving tips.",
    image: pricingGuideImg,
    imageWebP: pricingGuideImgWebP,
    category: "Pricing Guide",
    date: "March 15, 2024",
    readTime: "8 min read",
    author: "Pittsburgh Party Bus Team"
  };


  const blogPosts = [
    {
      title: "Top 10 Events to Book a Party Bus For in Pittsburgh",
      excerpt: "From Steelers games to weddings, discover the best occasions for luxury group transportation in the Steel City.",
      image: topEventsImg,
      imageWebP: topEventsImgWebP,
      category: "Event Planning",
      date: "March 12, 2024",
      readTime: "6 min read",
      icon: Calendar,
      slug: "top-events-pittsburgh"
    },
    {
      title: "Party Bus vs. Limo: Which is Best for Your Group?",
      excerpt: "Compare party buses and limousines to choose the perfect vehicle for your Pittsburgh celebration.",
      image: busVsLimoImg,
      imageWebP: busVsLimoImgWebP,
      category: "Vehicle Guide",
      date: "March 10, 2024",
      readTime: "5 min read",
      icon: Car,
      slug: "party-bus-vs-limo"
    },
    {
      title: "Bachelor & Bachelorette Party Bus Ideas in Pittsburgh", 
      excerpt: "Creative itinerary ideas for unforgettable bachelor and bachelorette parties using party bus transportation.",
      image: bachelorPartyImg,
      imageWebP: bachelorPartyImgWebP,
      category: "Event Ideas",
      date: "March 8, 2024",
      readTime: "7 min read",
      icon: Users,
      slug: "bachelor-bachelorette-ideas"
    },
    {
      title: "Wedding Transportation: Making Your Day Perfect",
      excerpt: "How to coordinate seamless transportation for your wedding party and guests in Pittsburgh.",
      image: weddingTransportImg,
      imageWebP: weddingTransportImgWebP,
      category: "Wedding Tips",
      date: "March 5, 2024",
      readTime: "9 min read",
      icon: Heart,
      slug: "wedding-transportation"
    },
    {
      title: "Corporate Event Transportation: Impress Your Team",
      excerpt: "Elevate your corporate events with professional group transportation that makes a lasting impression.",
      image: corporateEventImg,
      imageWebP: corporateEventImgWebP,
      category: "Corporate",
      date: "March 3, 2024",
      readTime: "6 min read",
      icon: Briefcase,
      slug: "corporate-event-transportation"
    },
    {
      title: "Concert Party Bus: The Ultimate Group Experience",
      excerpt: "Skip the parking hassles and enhance your concert experience with party bus transportation to Pittsburgh venues.",
      image: concertBusImg,
      imageWebP: concertBusImgWebP,
      category: "Entertainment",
      date: "February 28, 2024",
      readTime: "5 min read",
      icon: Music,
      slug: "concert-party-bus"
    },
    {
      title: "Prom Transportation Safety: Parents' Peace of Mind",
      excerpt: "Why professional prom transportation is the safest choice for Pittsburgh high school students.",
      image: promSafetyImg,
      imageWebP: promSafetyImgWebP,
      category: "Safety",
      date: "February 25, 2024",
      readTime: "7 min read",
      icon: GraduationCap,
      slug: "prom-transportation-safety"
    },
    {
      title: "Party Bus Safety Tips for a Fun Night Out",
      excerpt: "Essential safety guidelines to ensure your party bus experience is both fun and secure.",
      image: safetyTipsImg,
      imageWebP: safetyTipsImgWebP,
      category: "Safety Guide",
      date: "February 22, 2024",
      readTime: "6 min read",
      icon: Shield,
      slug: "party-bus-safety-tips"
    },
    {
      title: "How to Get an Accurate Party Bus Estimate Online",
      excerpt: "Learn what information to provide when requesting quotes to get the most accurate pricing estimates.",
      image: onlineEstimateImg,
      imageWebP: onlineEstimateImgWebP,
      category: "Booking Tips",
      date: "February 20, 2024",
      readTime: "4 min read",
      icon: DollarSign,
      slug: "accurate-party-bus-estimate"
    },
    {
      title: "Party Buses Near Me: Find the Best Pittsburgh Party Bus Rental",
      excerpt: "Looking for party buses near me in Pittsburgh? Discover local party bus rental services, pricing, availability, and tips.",
      image: fleetShowcaseImg,
      imageWebP: fleetShowcaseImgWebP,
      category: "Local Guide",
      date: "December 17, 2024",
      readTime: "8 min read",
      icon: MapPin,
      slug: "party-buses-near-me"
    }
  ];

  const categories = [
    "All Posts",
    "Pricing Guide",
    "Event Planning", 
    "Vehicle Guide",
    "Wedding Tips",
    "Corporate",
    "Safety Guide",
    "Entertainment",
    "Booking Tips"
  ];

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Party Bus Blog - Tips, Guides & Event Ideas"
        description="Expert party bus tips, event planning guides, and Pittsburgh transportation advice. Learn about pricing, safety, and making your celebration unforgettable."
        canonical="/blog"
      />
      <StructuredData data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" }
      ])} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Party Bus Tips, Guides & Event Planning Blog
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Expert tips, event ideas, and insider knowledge for planning the perfect 
            celebration with luxury transportation in Pittsburgh. Discover <Link to="/pricing" className="text-white hover:underline font-semibold">pricing guides</Link>, 
            explore <Link to="/events" className="text-white hover:underline font-semibold">event planning tips</Link>, 
            learn about our <Link to="/fleet" className="text-white hover:underline font-semibold">vehicle options</Link>, and 
            find answers to your questions. Serving all <Link to="/locations" className="text-white hover:underline font-semibold">Pittsburgh areas</Link>.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search articles..." 
                className="pl-12 pr-4 py-3 text-lg bg-background/90 border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground font-semibold mb-4">Featured Article</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Insights
            </h2>
          </div>

          <Card className="border-border shadow-luxury overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <picture>
                  <source type="image/webp" srcSet={featuredPost.imageWebP} />
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                </picture>
              </div>
              <div className="md:w-1/2 p-8">
                <Badge variant="secondary" className="mb-4">{featuredPost.category}</Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
                
                <Link to="/blog/party-bus-pricing-guide">
                  <Button variant="hero" size="lg">
                    Read Full Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "hero" : "outline"}
                size="sm"
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay informed with our latest tips, guides, and industry insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
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
                  <div className="absolute bottom-4 right-4 bg-hero-gradient p-2 rounded-full">
                    <post.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-3">
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
                    <Button variant="outline" size="sm" className="w-full bg-background/50 border-2 group-hover:bg-primary group-hover:text-primary-foreground">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Party Planning Tips
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest articles, event ideas, and exclusive offers delivered to your inbox.
          </p>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input 
                placeholder="Your email address" 
                className="flex-1 bg-background/90 border-0"
              />
              <Button variant="luxury">
                Subscribe
              </Button>
            </div>
          </div>
          
          <div className="opacity-90">
            <p className="text-sm">No spam, unsubscribe anytime. Privacy policy applies.</p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Topics
            </h2>
            <p className="text-xl text-muted-foreground">
              Browse articles by category to find exactly what you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Wedding Transportation", count: "12 articles" },
              { icon: DollarSign, title: "Pricing Guides", count: "8 articles" },
              { icon: Users, title: "Party Planning", count: "15 articles" },
              { icon: Shield, title: "Safety Tips", count: "6 articles" },
              { icon: Car, title: "Vehicle Guides", count: "9 articles" },
              { icon: Briefcase, title: "Corporate Events", count: "7 articles" },
              { icon: Music, title: "Entertainment", count: "11 articles" },
              { icon: GraduationCap, title: "Prom & Graduation", count: "5 articles" }
            ].map((category, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom hover:shadow-party transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                    <category.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;