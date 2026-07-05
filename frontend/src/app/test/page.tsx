'use client';

import { useState } from 'react';
import { ArtistDashboard } from '@/features/artist/components/ArtistDashboard';
import { AdminDashboard } from '@/features/admin/components/AdminDashboard';

export default function TestPage() {
  const [activeSection, setActiveSection] = useState<'player' | 'artist' | 'admin'>('player');

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">🧪 Test Your Sections</h1>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveSection('player')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeSection === 'player'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎵 Player
          </button>
          <button
            onClick={() => setActiveSection('artist')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeSection === 'artist'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎤 Artist Dashboard
          </button>
          <button
            onClick={() => setActiveSection('admin')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeSection === 'admin'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            👑 Admin Dashboard
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-6">
          {activeSection === 'player' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">🎵 Player Test</h2>
              <p className="text-gray-400 mb-4">The player is already at the bottom of the page. Try playing a sample track from the home page.</p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300">🎯 Tips:</p>
                <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                  <li>Go to <span className="text-green-400">Home</span> page and click "Play Sample Track"</li>
                  <li>Use the player controls at the bottom of the page</li>
                  <li>Try shuffle, repeat, volume, and queue features</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'artist' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">🎤 Artist Dashboard</h2>
              <ArtistDashboard userId="test-artist" />
            </div>
          )}

          {activeSection === 'admin' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">👑 Admin Dashboard</h2>
              <AdminDashboard isAdmin={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}