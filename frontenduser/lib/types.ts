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
    visitedPlaces: string[];
    images: string[];
  }

  export interface Destination {
    _id: string;
    name: string;
    description: string;
    cost: number;
    vibesAvailable: string[];
    image: string;
  }
  

  
export interface Company {
  id: number;
  name: string;
  description: string;
  profileImage: string;
}

