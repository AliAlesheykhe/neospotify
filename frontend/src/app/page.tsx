'use client';

import { useState } from 'react';
import { usePlayerContext } from '@/providers/PlayerProvider';

export default function Home() {
  const { state, controls } = usePlayerContext();
  const [isLoading, setIsLoading] = useState(false);

  // Sample track for testing (با لینک معتبر)
  const sampleTrack = {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    artistId: 'queen',
    album: 'A Night at the Opera',
    albumId: 'opera',
    coverImage: 'https://picsum.photos/300/300?random=1', // تصویر تصادفی
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 354,
  };

  const handlePlaySample = () => {
    setIsLoading(true);
    console.log('Loading sample track...');
    controls.loadTrack(sampleTrack);
    
    // تلاش برای پخش بعد از 500ms
    setTimeout(() => {
      console.log('Attempting to play...');
      controls.play();
      setIsLoading(false);
    }, 500);
  };

  const handleStop = () => {
    controls.pause();
    // Reset to beginning
    controls.seek(0);
  };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎵 NeoSpotify</h1>
        
        {/* Player Status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🎧 Player Status</h2>
          {state.currentTrack ? (
            <div>
              <div className="flex items-center space-x-4">
                <img 
                  src={state.currentTrack.coverImage} 
                  alt={state.currentTrack.title}
                  className="w-20 h-20 rounded object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/200/200?random=2';
                  }}
                />
                <div>
                  <p className="text-xl font-medium">{state.currentTrack.title}</p>
                  <p className="text-gray-400">{state.currentTrack.artist}</p>
                  <p className="text-sm text-gray-500">
                    Status: {state.isPlaying ? '▶️ Playing' : '⏸ Paused'}
                  </p>
                  <p className="text-xs text-gray-600">
                    Time: {Math.floor(state.currentTime)}s / {Math.floor(state.duration)}s
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No track loaded. Click the button below to play.</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handlePlaySample}
            disabled={isLoading}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition flex items-center space-x-2"
          >
            <span>{isLoading ? '⏳' : '▶️'}</span>
            <span>{isLoading ? 'Loading...' : 'Play Sample Track'}</span>
          </button>
          
          <button
            onClick={handleStop}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 rounded-lg transition"
          >
            ⏹ Stop
          </button>
          
          <button
            onClick={controls.togglePlay}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition"
          >
            {state.isPlaying ? '⏸ Pause' : '▶️ Play'}
          </button>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-sm font-mono">
            Debug: {state.isPlaying ? 'Playing' : 'Stopped'} | 
            Volume: {Math.round(state.volume * 100)}% |
            Repeat: {state.repeatMode} |
            Queue: {state.queue.length} tracks
          </p>
        </div>
      </div>
    </div>
  );
}