import { LoaderFunction } from '@/lib/loader';

// Fleet vehicle type
export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  pricePerHour: number;
  image: string;
  features: string[];
}

// Fleet page data
export interface FleetData {
  vehicles: Vehicle[];
  categories: string[];
}

export const fleetLoader: LoaderFunction<FleetData> = async () => {
  // This would typically fetch from an API or database
  // For now, return structured data that matches the page
  return {
    vehicles: [
      {
        id: 'party-bus-22',
        name: '22 Passenger Party Bus',
        capacity: 22,
        pricePerHour: 175,
        image: '/party-bus-22-passenger-exterior.jpg',
        features: ['LED Lighting', 'Premium Sound', 'Dance Pole', 'Bar Area'],
      },
      {
        id: 'party-bus-30',
        name: '30 Passenger Party Bus',
        capacity: 30,
        pricePerHour: 200,
        image: '/party-bus-30-passenger-exterior.jpg',
        features: ['LED Lighting', 'Premium Sound', 'Dance Pole', 'Bar Area', 'Restroom'],
      },
    ],
    categories: ['Party Buses', 'Limousines', 'Shuttle Buses', 'Private Cars'],
  };
};
