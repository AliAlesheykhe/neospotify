import { useState, useEffect, useRef, useCallback } from 'react';
import { Track, PlayerState, PlayerControls } from '../types/player.types';

export const usePlayer = (initialTracks: Track[] = []) => {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.75,
    repeatMode: 'none',
    isShuffled: false,
    queue: initialTracks,
    queueIndex: 0,
    isMinimized: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize audio element only once
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = state.volume;
      
      // Load saved state from localStorage
      const saved = localStorage.getItem('playerState');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setState(prev => ({ 
            ...prev, 
            volume: parsed.volume || 0.75,
            repeatMode: parsed.repeatMode || 'none',
            isShuffled: parsed.isShuffled || false,
          }));
        } catch (error) {
          console.error('Failed to load player state:', error);
        }
      }
      
      setIsInitialized(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Load track function
  const loadTrack = useCallback((track: Track) => {
    if (!audioRef.current || !track) {
      console.warn('Audio element not ready or track is null');
      return;
    }

    console.log('Loading track:', track.title);
    
    // Pause current playback
    audioRef.current.pause();
    
    // Set new source
    audioRef.current.src = track.audioUrl;
    audioRef.current.load();
    
    setState(prev => ({
      ...prev,
      currentTrack: track,
      currentTime: 0,
      duration: 0,
      isPlaying: false, // Don't auto-play, let user click play
    }));

    // Auto-play if was playing
    if (state.isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setState(prev => ({ ...prev, isPlaying: true }));
            })
            .catch((err) => {
              console.error('Auto-play failed:', err);
              setState(prev => ({ ...prev, isPlaying: false }));
            });
        }
      }, 100);
    }
  }, [state.isPlaying]);

  const play = useCallback(() => {
    if (!audioRef.current) {
      console.warn('Audio element not ready');
      return;
    }
    
    if (!state.currentTrack) {
      console.warn('No track loaded');
      return;
    }

    console.log('Play clicked');
    audioRef.current.play()
      .then(() => {
        console.log('Playing started');
        setState(prev => ({ ...prev, isPlaying: true }));
      })
      .catch((error) => {
        console.error('Play failed:', error);
        // If error, try reloading
        if (audioRef.current) {
          audioRef.current.load();
          setTimeout(() => {
            audioRef.current?.play()
              .then(() => setState(prev => ({ ...prev, isPlaying: true })))
              .catch(console.error);
          }, 200);
        }
      });
  }, [state.currentTrack]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    console.log('Pause clicked');
    audioRef.current.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    console.log('Toggle play, current state:', state.isPlaying);
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    console.log('Next clicked');
    let nextIndex = state.queueIndex + 1;
    
    if (state.isShuffled) {
      nextIndex = Math.floor(Math.random() * state.queue.length);
    } else if (nextIndex >= state.queue.length) {
      if (state.repeatMode === 'all') {
        nextIndex = 0;
      } else {
        console.log('End of queue');
        return;
      }
    }

    const nextTrack = state.queue[nextIndex];
    if (nextTrack) {
      loadTrack(nextTrack);
      setState(prev => ({ ...prev, queueIndex: nextIndex }));
      // Auto-play after loading
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setState(prev => ({ ...prev, isPlaying: true })))
            .catch(console.error);
        }
      }, 200);
    }
  }, [state.queue, state.queueIndex, state.isShuffled, state.repeatMode, loadTrack]);

  const previous = useCallback(() => {
    console.log('Previous clicked');
    if (state.currentTime > 3) {
      // If more than 3 seconds elapsed, restart current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setState(prev => ({ ...prev, currentTime: 0 }));
      }
      return;
    }

    let prevIndex = state.queueIndex - 1;
    if (prevIndex < 0) {
      if (state.repeatMode === 'all') {
        prevIndex = state.queue.length - 1;
      } else {
        console.log('Beginning of queue');
        return;
      }
    }

    const prevTrack = state.queue[prevIndex];
    if (prevTrack) {
      loadTrack(prevTrack);
      setState(prev => ({ ...prev, queueIndex: prevIndex }));
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setState(prev => ({ ...prev, isPlaying: true })))
            .catch(console.error);
        }
      }, 200);
    }
  }, [state.queue, state.queueIndex, state.currentTime, state.repeatMode, loadTrack]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState(prev => {
      const modes: ('none' | 'all' | 'one')[] = ['none', 'all', 'one'];
      const currentIndex = modes.indexOf(prev.repeatMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      console.log('Repeat mode changed to:', nextMode);
      return { ...prev, repeatMode: nextMode };
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setState(prev => {
      console.log('Shuffle toggled to:', !prev.isShuffled);
      return { ...prev, isShuffled: !prev.isShuffled };
    });
  }, []);

  const toggleMinimize = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setState(prev => ({
      ...prev,
      queue: [...prev.queue, track],
    }));
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      queue: prev.queue.filter((_, i) => i !== index),
    }));
  }, []);

  const clearQueue = useCallback(() => {
    setState(prev => ({ ...prev, queue: [], queueIndex: 0 }));
  }, []);

  // Audio event listeners
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
      console.log('Track loaded, duration:', audio.duration);
    };

    const handleEnded = () => {
      console.log('Track ended');
      if (state.repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        next();
      }
    };

    const handlePlay = () => {
      console.log('Play event fired');
      setState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      console.log('Pause event fired');
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [next, state.repeatMode]);

  // Save state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('playerState', JSON.stringify({
        volume: state.volume,
        repeatMode: state.repeatMode,
        isShuffled: state.isShuffled,
      }));
    }
  }, [state.volume, state.repeatMode, state.isShuffled]);

  const controls: PlayerControls = {
    play,
    pause,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    toggleMinimize,
    addToQueue,
    removeFromQueue,
    clearQueue,
    loadTrack,
  };

  return { state, controls };
};