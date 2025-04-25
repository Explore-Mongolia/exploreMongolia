export interface TripPlan {
    title: string;
    destinations: string[];
    transportation: string;
    accommodations: {
      name: string;
      address: string;
    }[];
    notes: string;
    plan: {
      day: number;
      activities: string[];
    }[];
  }
  