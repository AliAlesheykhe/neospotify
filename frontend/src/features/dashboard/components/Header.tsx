'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getFromLocalStorage } from '@/utils/localStorage';

export const Header = () => {
  const [user, setUser] = useState<{ displayName?: string; avatarUrl?: string; isGold?: boolean } | null>(null);

  useEffect(() => {
    // Look up current authenticated user session
    const currentUser = getFromLocalStorage('currentUser');
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Default avatar image fallback
  const defaultAvatar = '/default-avatar.png'; // or a standard icon/initials UI placeholder

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-900">
      <div className="text-white font-medium text-lg">
        {user?.isGold && (
          <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full mr-2">
            GOLD
          </span>
        )}
        Welcome Back
      </div>

      {/* User Info Wrapper */}
      <div className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 transition-colors py-1.5 pl-2 pr-4 rounded-full cursor-pointer">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-neutral-700">
          <Image
            src={user?.avatarUrl || defaultAvatar}
            alt={user?.displayName || 'User profile'}
            fill
            className="object-cover"
            sizes="32px"
            onError={(e) => {
              // fallback inline image logic if custom image fails to load
              (e.target as HTMLImageElement).src = defaultAvatar;
            }}
          />
        </div>
        <span className="text-white text-sm font-semibold selection:bg-transparent">
          {user?.displayName || 'Guest User'}
        </span>
      </div>
    </header>
  );
};
