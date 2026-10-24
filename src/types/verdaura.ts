export interface ProductSizeOption {
  label: string;
  price: string;
  volume: string;
}

export interface BotanicalDetails {
  extractionMethod: string;
  origin: string;
  purity: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  additionalImages?: string[];
  price?: string;
  sizes?: ProductSizeOption[];
  ingredients?: string[];
  usage?: string;
  badge?: string;
  isFeatured?: boolean;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  keyBenefits?: string[];
  botanicalDetails?: BotanicalDetails;
  reviews?: ProductReview[];
}

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  duration?: string;
  description: string;
  highlights: string[];
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Products' | 'Consultations' | 'Shipping';
}
