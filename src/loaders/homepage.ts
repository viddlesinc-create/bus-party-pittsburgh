import { LoaderFunction } from '@/lib/loader';

// Example: Homepage data loader
export interface HomepageData {
  featuredVehicles: number;
  totalReviews: number;
  avgRating: number;
  yearsInBusiness: number;
}

export const homepageLoader: LoaderFunction<HomepageData> = async () => {
  // This would typically fetch from an API or database
  // For now, return static data that could be dynamic later
  return {
    featuredVehicles: 12,
    totalReviews: 500,
    avgRating: 5.0,
    yearsInBusiness: 10,
  };
};
