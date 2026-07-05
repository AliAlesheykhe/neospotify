'use client';

import React, { useState, useEffect } from 'react';
import { artistService } from '../api/artist.api';
import { Track, Album, ArtistStats } from '../types/artist.types';
import { UploadTrackForm } from './UploadTrackForm';
import { CreateAlbumForm } from './CreateAlbumForm';

interface ArtistDashboardProps {
  userId: string;
}

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ userId }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [stats, setStats] = useState<ArtistStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums' | 'stats'>('tracks');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [tracksData, albumsData, statsData] = await Promise.all([
        artistService.getMyTracks(userId),
        artistService.getMyAlbums(userId),
        artistService.getArtistStats(userId),
      ]);
      setTracks(tracksData);
      setAlbums(albumsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load artist data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = (newTrack: Track) => {
    setTracks([newTrack, ...tracks]);
    setShowUploadForm(false);
  };

  const handleAlbumCreated = (newAlbum: Album) => {
    setAlbums([...albums, newAlbum]);
    setShowCreateAlbumForm(false);
  };

  const handleDeleteTrack = async (trackId: string) => {
    if (window.confirm('Are you sure you want to delete this track?')) {
      try {
        await artistService.deleteTrack(trackId);
        setTracks(tracks.filter(t => t.id !== trackId));
      } catch (error) {
        console.error('Failed to delete track:', error);
        alert('Failed to delete track. Please try again.');
      }
    }
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      try {
        // Assuming there's a deleteAlbum method
        await artistService.deleteAlbum(albumId);
        setAlbums(albums.filter(a => a.id !== albumId));
      } catch (error) {
        console.error('Failed to delete album:', error);
        alert('Failed to delete album. Please try again.');
      }
    }
  };

  const handleEditTrack = (track: Track) => {
    setEditingTrack(track);
    setShowUploadForm(true);
  };

  const handleUpdateTrack = (updatedTrack: Track) => {
    setTracks(tracks.map(t => t.id === updatedTrack.id ? updatedTrack : t));
    setEditingTrack(null);
    setShowUploadForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">🎤 Artist Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setShowUploadForm(!showUploadForm);
              if (showUploadForm) setEditingTrack(null);
            }}
            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition"
          >
            {showUploadForm ? '✕ Close' : '+ Upload New Track'}
          </button>
          <button
            onClick={() => setShowCreateAlbumForm(!showCreateAlbumForm)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition"
          >
            {showCreateAlbumForm ? '✕ Close' : '📀 New Album'}
          </button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-white font-semibold mb-4">
            {editingTrack ? '✎ Edit Track' : '📤 Upload New Track'}
          </h3>
          <UploadTrackForm 
            userId={userId}
            existingTrack={editingTrack}
            onSuccess={editingTrack ? handleUpdateTrack : handleUploadSuccess}
            onCancel={() => {
              setShowUploadForm(false);
              setEditingTrack(null);
            }}
          />
        </div>
      )}

      {/* Create Album Form */}
      {showCreateAlbumForm && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-white font-semibold mb-4">📀 Create New Album</h3>
          <CreateAlbumForm 
            userId={userId}
            onSuccess={handleAlbumCreated}
            onCancel={() => setShowCreateAlbumForm(false)}
          />
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <p className="text-gray-400 text-sm">Total Tracks</p>
            <p className="text-white text-2xl font-bold">{stats.totalTracks}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <p className="text-gray-400 text-sm">Total Albums</p>
            <p className="text-white text-2xl font-bold">{stats.totalAlbums}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <p className="text-gray-400 text-sm">Total Plays</p>
            <p className="text-white text-2xl font-bold">{stats.totalPlays.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <p className="text-gray-400 text-sm">Revenue</p>
            <p className="text-green-500 text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tracks')}
          className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'tracks'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🎵 Tracks ({tracks.length})
        </button>
        <button
          onClick={() => setActiveTab('albums')}
          className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'albums'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          📀 Albums ({albums.length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'stats'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          📊 Statistics
        </button>
      </div>

      {/* Tracks Tab */}
      {activeTab === 'tracks' && (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {tracks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">🎵</p>
              <p>No tracks uploaded yet.</p>
              <p className="text-sm mt-1">Click "Upload New Track" to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">#</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Title</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Genre</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Plays</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Listeners</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Revenue</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-gray-300 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track, index) => (
                    <tr key={track.id} className="border-t border-gray-700 hover:bg-gray-750 transition">
                      <td className="px-4 py-3 text-gray-400 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-white font-medium">{track.title}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        {track.genre.slice(0, 2).join(', ')}
                        {track.genre.length > 2 && '...'}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{track.playCount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{track.listenerCount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-green-400 text-sm font-medium">
                        ${(track.revenue || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          track.isPublished ? 'bg-green-500' : 'bg-yellow-500'
                        } text-white`}>
                          {track.isPublished ? '✅ Published' : '📝 Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditTrack(track)}
                            className="px-2 py-1 text-blue-400 hover:text-blue-300 transition text-sm"
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button 
                            onClick={() => handleDeleteTrack(track.id)}
                            className="px-2 py-1 text-red-400 hover:text-red-300 transition text-sm"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Albums Tab */}
      {activeTab === 'albums' && (
        <div>
          {albums.length === 0 ? (
            <div className="bg-gray-800 p-12 rounded-lg text-center text-gray-400">
              <p className="text-4xl mb-2">📀</p>
              <p>No albums created yet.</p>
              <p className="text-sm mt-1">Click "New Album" to create your first album!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {albums.map((album) => (
                <div key={album.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center text-3xl">
                        {album.coverImage ? (
                          <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          '📀'
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{album.title}</h4>
                        <p className="text-gray-400 text-sm">{album.tracks.length} tracks</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{album.totalPlays.toLocaleString()} plays</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        album.isPublished ? 'bg-green-500' : 'bg-yellow-500'
                      } text-white`}>
                        {album.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteAlbum(album.id)}
                      className="mt-3 w-full px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition"
                    >
                      Delete Album
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">📈 Monthly Statistics</h3>
            {stats.monthlyStats.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No data available</p>
            ) : (
              <div className="space-y-2">
                {stats.monthlyStats.map((stat) => (
                  <div key={stat.month} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300 font-medium">{stat.month}</span>
                    <div className="flex space-x-4">
                      <span className="text-gray-400 text-sm">{stat.plays.toLocaleString()} plays</span>
                      <span className="text-gray-400 text-sm">{stat.listeners.toLocaleString()} listeners</span>
                      <span className="text-green-400 text-sm font-medium">${stat.revenue.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">🏆 Top Tracks</h3>
            {stats.topTracks.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No tracks available</p>
            ) : (
              <div className="space-y-2">
                {stats.topTracks.map((track, index) => (
                  <div key={track.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500 text-sm font-bold">#{index + 1}</span>
                      <span className="text-white">{track.title}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm">{track.playCount.toLocaleString()} plays</span>
                      <span className="text-green-400 text-sm font-medium">${(track.revenue || 0).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};