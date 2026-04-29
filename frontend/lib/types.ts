export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt?: string;
}

export interface PricingEstimate {
  category: string;
  problemType: string;
  severity: string;
  price: number;
  priceRange: [number, number];
  confidence: string;
  estimatedTimeMinutes: number;
}

export interface Contractor {
  id: string;
  name: string;
  trade: string;
  trades?: string[];
  businessType: string;
  status: string;
  rating?: number;
  zipCodes: string[];
  insuranceUploaded: boolean;
  isLicensed: boolean;
  isVerified: boolean; // General check
  isContactVerified: boolean; // Specific contact verification

  emails: {
    id: string;
    email: string;
    type: string;
    isVerified: boolean;
  }[];
  phones: {
    id: string;
    number: string;
    type: string;
    isVerified: boolean;
  }[];

  // Extended profile
  headline?: string;
  location?: string;
  website?: string;
  owner?: string;
  abn?: string;
  licenses: string[];
  postcode?: string;
  about?: string;
  logo_url?: string;
  address?: string;
  createdAt: string;
}


export interface Job {
  id: string;
  description: string;
  location: string;
  address?: string;
  postcode?: string;
  urgency: string;
  category: string;
  problemType: string;
  severity: string;
  estimatedTimeMinutes: number;
  partsRequired: boolean;
  quotedPrice: number;
  quotedPriceMin: number;
  quotedPriceMax: number;
  confidence: string;
  status: string;
  userId?: string;
  user?: { id: string; name: string; email: string; phone?: string };
  contractorId?: string;
  contractor?: Contractor;
  reviews?: Review[];
  customerLocation?: any;
  createdAt: string;

  serviceCharge?: number;
  parts?: Part[];
  paymentStatus?: string;
  stripeSessionId?: string;
  updatedAt: string;
}


export interface Part {
  id: string;
  name: string;
  price: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  jobId: string;
  createdAt: string;
}


export interface Review {
  id: string;
  jobId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export const ALL_TRADES = [
  "plumbing","electrical","handyman","general","hvac","carpentry","painting","roofing","landscaping","cleaning"
];

export const STATUS_LABELS: Record<string, string> = {
  priced: "Awaiting contractor",
  assigned: "Contractor assigned",
  awaiting_customer_confirmation: "Work in progress",
  completed: "Pending your confirmation",
  reviewed: "Complete",
  cancelled: "Cancelled",
  manual_dispatch_required: "Finding contractor",
};

export const STATUS_COLORS: Record<string, string> = {
  priced: "bg-yellow-50 text-yellow-700 border-yellow-200",
  assigned: "bg-blue-50 text-blue-700 border-blue-200",
  awaiting_customer_confirmation: "bg-purple-50 text-purple-700 border-purple-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  reviewed: "bg-slate-50 text-slate-600 border-slate-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  manual_dispatch_required: "bg-orange-50 text-orange-700 border-orange-200",
};

export function getContractorTrades(c: Contractor): string[] {
  return c.trade.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
}

export function jobRelevanceScore(job: Job, trades: string[]): number {
  const lowerTrades = trades.map(t => t.toLowerCase());
  if (lowerTrades.includes(job.category.toLowerCase())) return 2;
  if (lowerTrades.includes("general") || lowerTrades.includes("handyman")) return 1;
  return 0;
}
