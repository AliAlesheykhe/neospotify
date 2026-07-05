'use client';

import { usePlayerContext } from '@/providers/PlayerProvider';

export const MiniPlayer = () => {
  const { state, controls } = usePlayerContext();

  if (!state.currentTrack) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={state.currentTrack.coverImage}
            alt={state.currentTrack.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="text-white text-sm font-medium truncate max-w-32">
              {state.currentTrack.title}
            </p>
            <p className="text-gray-400 text-xs truncate max-w-32">
              {state.currentTrack.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={controls.togglePlay}
            className="p-2 rounded-full bg-green-500 hover:bg-green-400 transition"
          >
            {state.isPlaying ? '⏸' : '▶️'}
          </button>
        </div>
      </div>
    </div>
  );
};