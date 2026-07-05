'use client';

import React, { createContext, useContext } from 'react';
import { usePlayer } from '@/features/player/hooks/usePlayer';
import { PlayerState, PlayerControls } from '@/features/player/types/player.types';

const PlayerContext = createContext<{
  state: PlayerState;
  controls: PlayerControls;
} | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, controls } = usePlayer();
  return (
    <PlayerContext.Provider value={{ state, controls }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within PlayerProvider');
  }
  return context;
};