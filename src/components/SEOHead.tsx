import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export function SEOHead({ 
  title, 
  description, 
  canonical,
  ogImage = '/hero-party-bus.jpg',
  type = 'website',
  article 
}: SEOHeadProps) {
  const fullTitle = `${title} | Pitt Party Bus`;
  const baseUrl = 'https://pittpartybus.com';
  const fullCanonical = canonical || window.location.pathname;
  const canonicalUrl = `${baseUrl}${fullCanonical}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('robots', 'index, follow');

    // Open Graph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', type, true);
    updateMeta('og:image', fullOgImage, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:site_name', 'Pitt Party Bus', true);
    updateMeta('og:locale', 'en_US', true);

    // Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', fullOgImage);

    // Article specific
    if (type === 'article' && article) {
      if (article.publishedTime) {
        updateMeta('article:published_time', article.publishedTime, true);
      }
      if (article.author) {
        updateMeta('article:author', article.author, true);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          updateMeta('article:tag', tag, true);
        });
      }
    }

    // Canonical
    updateLink('canonical', canonicalUrl);
  }, [title, description, canonicalUrl, fullOgImage, type, article]);

  return null;
}
