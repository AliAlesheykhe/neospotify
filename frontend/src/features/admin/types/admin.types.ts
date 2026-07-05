export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  status: 'open' | 'answered' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ArtistVerification {
  id: string;
  artistId: string;
  artistName: string;
  email: string;
  sampleWork: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewNotes?: string;
}

export interface FinancialReport {
  artistId: string;
  artistName: string;
  uniqueListeners: number;
  totalStreams: number;
  totalRevenue: number;
  status: 'pending' | 'paid';
  month: string;
  year: number;
}

export interface SystemStats {
  totalUsers: number;
  totalArtists: number;
  totalTracks: number;
  totalAlbums: number;
  premiumUsers: number;
  monthlyRevenue: number;
  userDistribution: {
    free: number;
    silver: number;
    gold: number;
  };
}

export interface SubscriptionPrice {
  silver: number;
  gold: number;
  updatedAt: Date;
}