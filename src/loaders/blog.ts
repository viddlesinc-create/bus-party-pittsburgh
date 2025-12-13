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
  };
  post: BlogPostMeta;
  relatedPosts: BlogPostMeta[];
}

export const blogListLoader: LoaderFunction<BlogData> = async () => {
  // SSR data for blog listing page
  return {
    meta: {
      title: "Party Bus Blog - Tips, Guides & Event Ideas | Pittsburgh Party Bus",
      description: "Expert party bus tips, event planning guides, and Pittsburgh transportation advice. Learn about pricing, safety, and making your celebration unforgettable.",
      canonical: "/blog"
    },
    featuredPost: {
      slug: 'party-bus-pricing-guide',
      title: 'How Much Does a Party Bus Cost in Pittsburgh? Complete 2024 Guide',
      description: 'Everything you need to know about party bus rental pricing in Pittsburgh.',
      image: '/blog-party-bus-pricing-guide.jpg',
      date: 'March 15, 2024',
      author: 'Pittsburgh Party Bus Team',
      category: 'Pricing Guide',
      readTime: '8 min read',
    },
    posts: [
      {
        slug: 'top-events-pittsburgh',
        title: 'Top 10 Events to Book a Party Bus For in Pittsburgh',
        description: 'Discover the best events for party bus rentals in Pittsburgh.',
        image: '/blog-top-events-pittsburgh.jpg',
        date: 'March 12, 2024',
        author: 'Pittsburgh Party Bus Team',
        category: 'Event Planning',
        readTime: '6 min read',
      },
      {
        slug: 'party-bus-vs-limo',
        title: 'Party Bus vs. Limo: Which is Best for Your Group?',
        description: 'Compare party buses and limousines for your celebration.',
        image: '/blog-party-bus-vs-limo.jpg',
        date: 'March 10, 2024',
        author: 'Pittsburgh Party Bus Team',
        category: 'Vehicle Guide',
        readTime: '5 min read',
      },
    ],
    totalPosts: 10,
    categories: [
      'All Posts',
      'Pricing Guide',
      'Event Planning',
      'Vehicle Guide',
      'Wedding Tips',
      'Corporate',
      'Safety Guide',
    ],
  };
};

export const blogPostLoader: LoaderFunction<BlogPostData> = async (context) => {
  const slug = context.url.replace('/blog/', '');
  
  // Map slugs to post data for SSR
  const postMap: Record<string, BlogPostMeta> = {
    'party-bus-pricing-guide': {
      slug: 'party-bus-pricing-guide',
      title: 'How Much Does a Party Bus Cost in Pittsburgh? Complete 2024 Guide',
      description: 'Everything you need to know about party bus rental pricing in Pittsburgh.',
      image: '/blog-party-bus-pricing-guide.jpg',
      date: 'March 15, 2024',
      author: 'Pittsburgh Party Bus Team',
      category: 'Pricing Guide',
      readTime: '8 min read',
    },
    'top-events-pittsburgh': {
      slug: 'top-events-pittsburgh',
      title: 'Top 10 Events to Book a Party Bus For in Pittsburgh',
      description: 'Discover the best events for party bus rentals.',
      image: '/blog-top-events-pittsburgh.jpg',
      date: 'March 12, 2024',
      author: 'Pittsburgh Party Bus Team',
      category: 'Event Planning',
      readTime: '6 min read',
    },
    'party-bus-vs-limo': {
      slug: 'party-bus-vs-limo',
      title: 'Party Bus vs. Limo: Which is Best for Your Group?',
      description: 'Compare party buses and limousines for your celebration.',
      image: '/blog-party-bus-vs-limo.jpg',
      date: 'March 10, 2024',
      author: 'Pittsburgh Party Bus Team',
      category: 'Vehicle Guide',
      readTime: '5 min read',
    },
  };
  
  const post = postMap[slug] || {
    slug,
    title: 'Blog Post',
    description: 'Pittsburgh Party Bus blog post',
    image: '/blog-placeholder.jpg',
    date: 'January 1, 2024',
    author: 'Pittsburgh Party Bus Team',
    category: 'General',
    readTime: '5 min read',
  };
  
  return {
    meta: {
      title: `${post.title} | Pittsburgh Party Bus Blog`,
      description: post.description,
      canonical: `/blog/${slug}`
    },
    post,
    relatedPosts: [],
  };
};
