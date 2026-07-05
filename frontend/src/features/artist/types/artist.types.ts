export interface Track {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId?: string;
  albumName?: string;
  duration: number;
  genre: string[];
  releaseDate: Date;
  coverImage?: string;
  audioFile: string;
  lyrics?: string;
  isPublished: boolean;
  playCount: number;
  listenerCount: number;
  revenue?: number;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  tracks: Track[];
  coverImage?: string;
  genre: string[];
  releaseDate: Date;
  isPublished: boolean;
  totalPlays: number;
  totalListeners: number;
  revenue?: number;
}

export interface ArtistStats {
  totalTracks: number;
  totalAlbums: number;
  totalPlays: number;
  totalListeners: number;
  totalRevenue: number;
  monthlyStats: {
    month: string;
    plays: number;
    listeners: number;
    revenue: number;
  }[];
  topTracks: Track[];
}