// Export all loaders from a single entry point
export { homepageLoader, type HomepageData } from './homepage';
export { fleetLoader, type FleetData } from './fleet';
export { blogListLoader, blogPostLoader, type BlogData, type BlogPostData, type BlogPostMeta, BLOG_POSTS } from './blog';
export { 
  eventsLoader, 
  locationsLoader, 
  pricingLoader, 
  contactLoader, 
  faqsLoader, 
  testimonialsLoader,
  privacyLoader,
  termsLoader,
  type PageData,
  type EventsData,
  type LocationsData,
  type PricingData,
  type ContactData,
  type FAQsData,
  type TestimonialsData,
} from './pages';
