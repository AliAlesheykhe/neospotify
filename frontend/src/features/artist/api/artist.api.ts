import axios from 'axios';
import { Track, Album, ArtistStats } from '../types/artist.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Mock data برای تست
const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Mock Song 1',
    artistId: 'artist1',
    artistName: 'Test Artist',
    duration: 180,
    genre: ['Pop', 'Rock'],
    releaseDate: new Date(),
    audioFile: 'mock.mp3',
    lyrics: 'Mock lyrics',
    isPublished: true,
    playCount: 1500,
    listenerCount: 850,
    revenue: 45.50
  },
  {
    id: '2',
    title: 'Mock Song 2',
    artistId: 'artist1',
    artistName: 'Test Artist',
    duration: 210,
    genre: ['Jazz'],
    releaseDate: new Date(),
    audioFile: 'mock2.mp3',
    lyrics: 'More mock lyrics',
    isPublished: false,
    playCount: 300,
    listenerCount: 120,
    revenue: 12.00
  }
];

const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Mock Album 1',
    artistId: 'artist1',
    artistName: 'Test Artist',
    tracks: mockTracks,
    genre: ['Pop', 'Rock'],
    releaseDate: new Date(),
    isPublished: true,
    totalPlays: 1800,
    totalListeners: 970,
    revenue: 57.50
  }
];

export const artistService = {
  async uploadTrack(formData: FormData): Promise<Track> {
    console.log('Uploading track...', formData);
    return mockTracks[0];
  },

  async getMyTracks(artistId: string): Promise<Track[]> {
    console.log('Getting tracks for artist:', artistId);
    return mockTracks;
  },

  async deleteTrack(trackId: string): Promise<void> {
    console.log('Deleting track:', trackId);
  },

  async getMyAlbums(artistId: string): Promise<Album[]> {
    console.log('Getting albums for artist:', artistId);
    return mockAlbums;
  },

  async deleteAlbum(albumId: string): Promise<void> {
    console.log('Deleting album:', albumId);
  },

  async getArtistStats(artistId: string): Promise<ArtistStats> {
    return {
      totalTracks: 5,
      totalAlbums: 2,
      totalPlays: 15000,
      totalListeners: 8500,
      totalRevenue: 450.50,
      monthlyStats: [
        { month: 'Jan', plays: 1200, listeners: 800, revenue: 50 },
        { month: 'Feb', plays: 1500, listeners: 950, revenue: 65 },
        { month: 'Mar', plays: 1800, listeners: 1100, revenue: 80 }
      ],
      topTracks: mockTracks
    };
  }
};