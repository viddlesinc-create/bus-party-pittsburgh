import { LoaderFunction } from '@/lib/loader';

// Fleet page SSR data - metadata for SEO
export interface FleetData {
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
  categories: string[];
  totalVehicles: number;
}

export const fleetLoader: LoaderFunction<FleetData> = async () => {
  // SSR data for the fleet page - primarily for meta tags and SEO
  return {
    meta: {
      title: "Our Fleet - Party Buses & Limousines | Pittsburgh Party Bus",
      description: "Explore our premium fleet of party buses and limousines in Pittsburgh. Vehicles for 6-40 passengers with luxury amenities. View photos and features.",
      canonical: "/fleet"
    },
    categories: ['Party Buses', 'Mini Party Buses', 'Limousines', 'Shuttle Service', 'Private Car'],
    totalVehicles: 13,
  };
};
