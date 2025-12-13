import { LoaderFunction } from '@/lib/loader';

// Blog post metadata type
export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

// Blog listing data for SSR
export interface BlogData {
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
  featuredPost: BlogPostMeta;
  posts: BlogPostMeta[];
  totalPosts: number;
  categories: string[];
}

// Single blog post data
export interface BlogPostData {
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  post: BlogPostMeta;
  relatedPosts: BlogPostMeta[];
}

// Complete blog posts database for SSR
const BLOG_POSTS: Record<string, BlogPostMeta> = {
  'party-bus-pricing-guide': {
    slug: 'party-bus-pricing-guide',
    title: 'How Much Does a Party Bus Cost in Pittsburgh? Complete 2024 Guide',
    description: 'Everything you need to know about party bus rental pricing in Pittsburgh, including hourly rates, package deals, and money-saving tips for your celebration.',
    image: '/blog-party-bus-pricing-guide.jpg',
    date: 'March 15, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Pricing Guide',
    readTime: '8 min read',
  },
  'top-events-pittsburgh': {
    slug: 'top-events-pittsburgh',
    title: 'Top 10 Events to Book a Party Bus For in Pittsburgh',
    description: 'Discover the best occasions for party bus rentals in Pittsburgh - from Steelers games to weddings, proms, and corporate events.',
    image: '/blog-top-events-pittsburgh.jpg',
    date: 'March 12, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Event Planning',
    readTime: '6 min read',
  },
  'party-bus-vs-limo': {
    slug: 'party-bus-vs-limo',
    title: 'Party Bus vs. Limo: Which is Best for Your Pittsburgh Celebration?',
    description: 'Compare party buses and limousines to choose the perfect vehicle for your group size, budget, and celebration style in Pittsburgh.',
    image: '/blog-party-bus-vs-limo.jpg',
    date: 'March 10, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Vehicle Guide',
    readTime: '5 min read',
  },
  'bachelor-bachelorette-ideas': {
    slug: 'bachelor-bachelorette-ideas',
    title: 'Bachelor & Bachelorette Party Bus Ideas in Pittsburgh',
    description: 'Creative itinerary ideas and tips for planning unforgettable bachelor and bachelorette parties with party bus transportation in Pittsburgh.',
    image: '/blog-bachelor-bachelorette-party.jpg',
    date: 'March 8, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Event Ideas',
    readTime: '7 min read',
  },
  'wedding-transportation': {
    slug: 'wedding-transportation',
    title: 'Wedding Transportation Guide: Making Your Pittsburgh Wedding Perfect',
    description: 'Complete guide to coordinating seamless wedding transportation for your bridal party and guests in Pittsburgh and surrounding areas.',
    image: '/blog-wedding-transportation.jpg',
    date: 'March 5, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Wedding Tips',
    readTime: '9 min read',
  },
  'corporate-event-transportation': {
    slug: 'corporate-event-transportation',
    title: 'Corporate Event Transportation: Impress Your Team in Pittsburgh',
    description: 'Elevate your corporate events, team outings, and client entertainment with professional group transportation services in Pittsburgh.',
    image: '/blog-corporate-event-transportation.jpg',
    date: 'March 3, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Corporate',
    readTime: '6 min read',
  },
  'concert-party-bus': {
    slug: 'concert-party-bus',
    title: 'Concert Party Bus: The Ultimate Pittsburgh Concert Experience',
    description: 'Skip parking hassles and enhance your concert experience with party bus transportation to PPG Paints Arena, Stage AE, and other Pittsburgh venues.',
    image: '/blog-concert-party-bus.jpg',
    date: 'February 28, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Entertainment',
    readTime: '5 min read',
  },
  'prom-transportation-safety': {
    slug: 'prom-transportation-safety',
    title: 'Prom Transportation Safety: A Guide for Pittsburgh Parents',
    description: 'Why professional prom transportation is the safest choice for Pittsburgh high school students. Safety tips and what to look for in a prom limo service.',
    image: '/blog-prom-transportation-safety.jpg',
    date: 'February 25, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Safety',
    readTime: '7 min read',
  },
  'party-bus-safety-tips': {
    slug: 'party-bus-safety-tips',
    title: 'Party Bus Safety Tips for a Fun and Secure Night Out',
    description: 'Essential safety guidelines and tips to ensure your party bus experience in Pittsburgh is both enjoyable and secure for everyone.',
    image: '/blog-party-bus-safety-tips.jpg',
    date: 'February 22, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Safety Guide',
    readTime: '6 min read',
  },
  'accurate-party-bus-estimate': {
    slug: 'accurate-party-bus-estimate',
    title: 'How to Get an Accurate Party Bus Estimate Online',
    description: 'Learn what information to provide when requesting party bus quotes to get the most accurate pricing estimates for your Pittsburgh event.',
    image: '/blog-online-party-bus-estimate.jpg',
    date: 'February 20, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'Booking Tips',
    readTime: '4 min read',
  },
};

// Get related posts (excluding current post)
function getRelatedPosts(currentSlug: string, count: number = 3): BlogPostMeta[] {
  const currentPost = BLOG_POSTS[currentSlug];
  const allPosts = Object.values(BLOG_POSTS).filter(p => p.slug !== currentSlug);
  
  // Prioritize same category
  const sameCategory = allPosts.filter(p => p.category === currentPost?.category);
  const otherPosts = allPosts.filter(p => p.category !== currentPost?.category);
  
  return [...sameCategory, ...otherPosts].slice(0, count);
}

export const blogListLoader: LoaderFunction<BlogData> = async () => {
  const allPosts = Object.values(BLOG_POSTS);
  
  return {
    meta: {
      title: "Party Bus Blog - Tips, Guides & Event Ideas | Pittsburgh Party Bus",
      description: "Expert party bus tips, event planning guides, and Pittsburgh transportation advice. Learn about pricing, safety, and making your celebration unforgettable.",
      canonical: "/blog"
    },
    featuredPost: BLOG_POSTS['party-bus-pricing-guide'],
    posts: allPosts.filter(p => p.slug !== 'party-bus-pricing-guide'),
    totalPosts: allPosts.length,
    categories: [
      'All Posts',
      'Pricing Guide',
      'Event Planning',
      'Vehicle Guide',
      'Wedding Tips',
      'Corporate',
      'Safety Guide',
      'Entertainment',
      'Booking Tips',
    ],
  };
};

export const blogPostLoader: LoaderFunction<BlogPostData> = async (context) => {
  const slug = context.url.replace('/blog/', '').replace(/\/$/, '');
  
  const post = BLOG_POSTS[slug] || {
    slug,
    title: 'Blog Post',
    description: 'Pittsburgh Party Bus blog post about party bus rentals and transportation.',
    image: '/hero-party-bus.jpg',
    date: 'January 1, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'General',
    readTime: '5 min read',
  };
  
  return {
    meta: {
      title: `${post.title} | Pittsburgh Party Bus Blog`,
      description: post.description,
      canonical: `/blog/${slug}`,
      ogImage: post.image,
    },
    post,
    relatedPosts: getRelatedPosts(slug, 3),
  };
};

// Export the posts database for use elsewhere
export { BLOG_POSTS };
