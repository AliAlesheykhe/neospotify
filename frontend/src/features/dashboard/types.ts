export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  earlyAccess?: boolean; // to filter for Gold users
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
  trackCount: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear: number;
}
