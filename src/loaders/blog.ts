import { LoaderFunction } from '@/lib/loader';

// Blog post metadata type
export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

// Blog listing data
export interface BlogData {
  posts: BlogPostMeta[];
  totalPosts: number;
}

// Single blog post data
export interface BlogPostData {
  post: BlogPostMeta;
  relatedPosts: BlogPostMeta[];
}

export const blogListLoader: LoaderFunction<BlogData> = async () => {
  // This would typically fetch from a CMS or database
  return {
    posts: [
      {
        slug: 'party-bus-pricing-guide',
        title: 'Party Bus Pricing Guide: What to Expect in Pittsburgh',
        description: 'Complete guide to party bus rental prices in Pittsburgh.',
        image: '/blog-party-bus-pricing-guide.jpg',
        date: '2024-01-15',
        author: 'Pitt Party Bus',
        tags: ['pricing', 'guide'],
      },
      {
        slug: 'top-events-pittsburgh',
        title: 'Top Events to Book a Party Bus in Pittsburgh',
        description: 'Discover the best events for party bus rentals.',
        image: '/blog-top-events-pittsburgh.jpg',
        date: '2024-01-10',
        author: 'Pitt Party Bus',
        tags: ['events', 'pittsburgh'],
      },
    ],
    totalPosts: 10,
  };
};

export const blogPostLoader: LoaderFunction<BlogPostData> = async (context) => {
  const slug = context.url.replace('/blog/', '');
  
  // This would typically fetch the full post content
  return {
    post: {
      slug,
      title: 'Blog Post Title',
      description: 'Blog post description',
      image: '/blog-placeholder.jpg',
      date: '2024-01-01',
      author: 'Pitt Party Bus',
      tags: [],
    },
    relatedPosts: [],
  };
};
