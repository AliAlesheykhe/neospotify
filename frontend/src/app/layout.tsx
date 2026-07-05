import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/providers/PlayerProvider";
import Player from "@/features/player/components/Player";
import { MiniPlayer } from '@/features/player/components/MiniPlayer';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoSpotify",
  description: "Music streaming service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 min-h-screen`}
      >
        <PlayerProvider>
          {children}
          <Player />
          <MiniPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}