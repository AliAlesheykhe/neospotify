'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getFromLocalStorage } from '@/utils/localStorage';
import { Track, Playlist, Album } from '@/features/dashboard/types';
import '@/features/dashboard/styles/Dashboard.css';

const mockRecentPlaylists: Playlist[] = [
  { id: 'p1', name: 'Chill Vibes', coverUrl: '/lofi-girl.jpg', trackCount: 24 },
  { id: 'p2', name: 'Workout Power', coverUrl: '/lofi-girl.jpg', trackCount: 18 },
  { id: 'p3', name: 'Late Night Coding', coverUrl: '/lofi-girl.jpg', trackCount: 45 },
];

const mockLatestAlbums: Album[] = [
  { id: 'a1', title: 'Eclipse', artist: 'Alok', coverUrl: '/lofi-girl.jpg', releaseYear: 2026 },
  { id: 'a2', title: 'Signals', artist: 'Hale', coverUrl: '/lofi-girl.jpg', releaseYear: 2026 },
];

const mockPopularTracks: Track[] = [
  { id: 't1', title: 'Neon Night', artist: 'Starlight', coverUrl: '/lofi-girl.jpg' },
  { id: 't2', title: 'Retro Groove', artist: 'Vapor Wave', coverUrl: '/lofi-girl.jpg' },
  { id: 't3', title: 'Lost in Translation', artist: 'Sola', coverUrl: '/lofi-girl.jpg' },
];

const mockEarlyAccessTracks: Track[] = [
  { id: 'ea1', title: 'Future Funk (Unreleased)', artist: 'Chronos', coverUrl: '/lofi-girl.jpg', earlyAccess: true },
  { id: 'ea2', title: 'Velvet Sky (Demo)', artist: 'Lara', coverUrl: '/lofi-girl.jpg', earlyAccess: true },
];

export default function DashboardPage() {
  const [isGoldUser, setIsGoldUser] = useState(false);

  useEffect(() => {
    const user = getFromLocalStorage('currentUser');
    if (user && (user.isGold || user.roleType === 'gold')) {
      setIsGoldUser(true);
    }
  }, []);

  return (
    <div className="dashboard-grid-stack">
      {/* 1. Gold User Early Access Section */}
      {isGoldUser && (
        <section className="early-access-banner">
          <div className="early-access-title-wrapper">
            <span className="early-access-icon">✨</span>
            <h3 className="early-access-title">Early Access (دسترسی زودهنگام)</h3>
          </div>
          <div className="music-items-grid">
            {mockEarlyAccessTracks.map((track) => (
              <div key={track.id} className="music-vertical-card">
                <div className="music-card-img-container">
                  <Image src={track.coverUrl} alt={track.title} fill className="object-cover" />
                </div>
                <h4 className="music-card-title">{track.title}</h4>
                <p className="music-card-subtitle">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Recently Played Playlists */}
      <section>
        <h3 className="section-title">Recently Played</h3>
        <div className="recent-playlists-grid">
          {mockRecentPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-horizontal-card">
              <div className="playlist-card-img-wrapper">
                <Image src={playlist.coverUrl} alt={playlist.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="playlist-card-name">{playlist.name}</h4>
                <p className="playlist-card-tracks">{playlist.trackCount} Tracks</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Latest Albums */}
      <section>
        <h3 className="section-title">Latest Albums</h3>
        <div className="music-items-grid">
          {mockLatestAlbums.map((album) => (
            <div key={album.id} className="music-vertical-card">
              <div className="music-card-img-container">
                <Image src={album.coverUrl} alt={album.title} fill className="object-cover" />
              </div>
              <h4 className="music-card-title">{album.title}</h4>
              <p className="music-card-subtitle">{album.artist} • {album.releaseYear}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Popular Tracks */}
      <section>
        <h3 className="section-title">Popular Tracks</h3>
        <div className="music-items-grid">
          {mockPopularTracks.map((track) => (
            <div key={track.id} className="music-vertical-card">
              <div className="music-card-img-container">
                <Image src={track.coverUrl} alt={track.title} fill className="object-cover" />
              </div>
              <h4 className="music-card-title">{track.title}</h4>
              <p className="music-card-subtitle">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
