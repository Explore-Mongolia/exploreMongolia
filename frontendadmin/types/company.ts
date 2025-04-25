export interface Contact {
    phoneNumber: string;
    email: string;
    website?: string;
  }
  
  export interface Company {
    _id?: string;
    name: string;
    destinations?: string[];
    description: string;
    contact: Contact;
    rating?: number;
    priceRange?: string;
    tags?: string[];
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type CompanyFormData = Omit<Company, "_id" | "createdAt" | "updatedAt">;