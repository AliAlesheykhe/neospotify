'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  QueueListIcon, 
  UserIcon, 
  Cog6ToothIcon, 
  MusicalNoteIcon 
} from '@heroicons/react/24/outline';
import '../styles/Dashboard.css'; // Make sure the path pointing to Dashboard.css is correct

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Playlists', href: '/dashboard/playlists', icon: QueueListIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
    { name: 'Albums & Singles', href: '/dashboard/library', icon: MusicalNoteIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  return (
    <aside className="sidebar-container">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          NeoSpotify
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              >
                <Icon className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        © {new Date().getFullYear()} NeoSpotify
      </div>
    </aside>
  );
};
