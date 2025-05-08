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


  export interface Experience {
    _id: string;
    name: string;
    description: string;
    images: string[];
    visitedPlaces: string[];
    reactionsCount: number;
    createdAt: string;
    user: {
      profileImage: string;
      name: string;
    };
  }

  export interface Destination {
    _id: string;
    name: string;
    description: string;
    cost: number;
    vibesAvailable: string[];
    image: string;
    averageRating?: number;
  }
  

  
  export interface Company {
    id: string;
    name: string;
    description: string;
    profileImage?: string;
  
    contact?: {
      phoneNumber: string;
      email: string;
      website?: string;
    };
  }

