'use client';

import React, { useState, useRef } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { Track } from '../types/player.types';

interface PlayerProps {
  initialTracks?: Track[];
}

const Player: React.FC<PlayerProps> = ({ initialTracks = [] }) => {
  const { state, controls } = usePlayer(initialTracks);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    controls.seek(time);
  };

  if (!state.currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 text-center text-gray-500 z-50">
        No track selected
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-3 w-1/4">
            <img
              src={state.currentTrack.coverImage}
              alt={state.currentTrack.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div>
              <h4 className="text-white text-sm font-medium truncate">
                {state.currentTrack.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {state.currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center space-x-4">
              <button
                onClick={controls.toggleShuffle}
                className={`p-2 rounded-full hover:bg-gray-800 transition ${
                  state.isShuffled ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                🔀
              </button>

              <button
                onClick={controls.previous}
                className="p-2 rounded-full hover:bg-gray-800 transition text-white"
              >
                ⏮
              </button>

              <button
                onClick={controls.togglePlay}
                className="p-3 rounded-full bg-green-500 hover:bg-green-400 transition"
              >
                {state.isPlaying ? '⏸' : '▶️'}
              </button>

              <button
                onClick={controls.next}
                className="p-2 rounded-full hover:bg-gray-800 transition text-white"
              >
                ⏭
              </button>

              <button
                onClick={controls.toggleRepeat}
                className="p-2 rounded-full hover:bg-gray-800 transition"
              >
                {state.repeatMode === 'none' && '🔁'}
                {state.repeatMode === 'all' && '🔁'}
                {state.repeatMode === 'one' && '🔂'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 w-full max-w-2xl mt-2">
              <span className="text-gray-400 text-xs">
                {formatTime(state.currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={state.duration || 1}
                value={state.currentTime}
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${
                    (state.currentTime / state.duration) * 100
                  }%, #374151 ${(state.currentTime / state.duration) * 100}%, #374151 100%)`,
                }}
              />
              <span className="text-gray-400 text-xs">
                {formatTime(state.duration)}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3 w-1/4 justify-end">
            <button
              onClick={() => setIsQueueOpen(!isQueueOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition text-gray-400"
            >
              📋
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={state.volume}
                onChange={(e) => controls.setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Queue */}
        {isQueueOpen && (
          <div className="bg-gray-800 border-t border-gray-700 max-h-64 overflow-y-auto mt-3">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">Queue</h3>
                <button
                  onClick={controls.clearQueue}
                  className="text-gray-400 text-sm hover:text-white transition"
                >
                  Clear Queue
                </button>
              </div>
              {state.queue.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center justify-between p-2 rounded hover:bg-gray-700 cursor-pointer ${
                    index === state.queueIndex ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-sm">{index + 1}</span>
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <h4 className="text-white text-sm">{track.title}</h4>
                      <p className="text-gray-400 text-xs">{track.artist}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => controls.removeFromQueue(index)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;