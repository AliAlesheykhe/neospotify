import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-4">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1ed760] tracking-tighter">
          NeoSpotify
        </h1>
        <p className="max-w-md text-lg text-zinc-400">
          Welcome to NeoSpotify. Please log in or register to continue listening, managing your artist profile, or handling support tickets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link
            href="/login"
            className="flex items-center justify-center px-8 py-3 rounded-full bg-[#1ed760] text-black font-bold hover:bg-[#1fdf64] transition-colors w-full sm:w-auto"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="flex items-center justify-center px-8 py-3 rounded-full border border-zinc-500 font-bold hover:border-white transition-colors w-full sm:w-auto"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
