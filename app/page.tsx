"use client";

import { useState } from "react";
import { Play, Film, Search } from "lucide-react";

// Reliable backup catalog with styled fallback gradients so cards are never blank
const BACKUP_ANIME = [
  { id: "cyberpunk", title: "Cyberpunk: Edgerunners", info: "Sci-Fi, Action", gradient: "from-blue-600 to-indigo-900" },
  { id: "naruto", title: "Naruto Shippuden", info: "Ninja, Shounen", gradient: "from-orange-600 to-red-900" },
  { id: "one-piece", title: "One Piece", info: "Pirates, Adventure", gradient: "from-cyan-600 to-blue-950" }
];

const EPISODES_LIST = [
  { id: "1", num: 1, url: "https://googleapis.com" },
  { id: "2", num: 2, url: "https://googleapis.com" },
  { id: "3", num: 3, url: "https://googleapis.com" }
];

export default function UnbreakableAnimeSite() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAnime, setActiveAnime] = useState(BACKUP_ANIME[0]);
  const [activeVideo, setActiveVideo] = useState(EPISODES_LIST[0].url);
  const [epTitle, setEpTitle] = useState("Episode 1");
  const [playing, setPlaying] = useState(false);

  // Search function placeholder layout
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    alert(`Searching for "${searchQuery}"... Sandbox server mode active.`);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      
      {/* Navigation Header with Search Bar */}
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-black text-xl tracking-wider text-purple-500 cursor-pointer">
          <Film className="w-6 h-6" />
          <span>NEO<span className="text-white">ANIME</span></span>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search anime shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-purple-500 transition text-white"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-neutral-400 hover:text-purple-400">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Player and Poster Banner */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            {!playing ? (
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeAnime.gradient} opacity-40 -z-10`} />
                <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">{activeAnime.title}</h1>
                <p className="text-neutral-400 text-sm mt-1 mb-4">{epTitle}</p>
                <button 
                  onClick={() => setPlaying(true)} 
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition w-fit shadow-lg shadow-purple-600/30"
                >
                  <Play className="w-5 h-5 fill-current" /> Watch Now
                </button>
              </div>
            ) : (
              <video src={activeVideo} className="w-full h-full object-contain" controls autoPlay />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{activeAnime.title}</h2>
            <p className="text-purple-400 text-sm mt-1 font-medium">{activeAnime.info}</p>
          </div>
        </div>

        {/* Right Column: Episode Selection Sidebar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 h-fit">
          <h3 className="font-bold text-lg mb-4 border-b border-neutral-800 pb-2">Select Episode</h3>
          <div className="space-y-2">
            {EPISODES_LIST.map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setActiveVideo(ep.url);
                  setEpTitle(`Episode ${ep.num}`);
                  setPlaying(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 hover:text-purple-400 transition text-sm flex items-center justify-between"
              >
                <span>Play Episode {ep.num}</span>
                <Play className="w-3 h-3 opacity-50" />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Grid: Discover / Trending Component */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 pt-0">
        <h3 className="text-xl font-bold mb-4 text-neutral-300">Discover Trending Content</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BACKUP_ANIME.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveAnime(item);
                setPlaying(false);
              }}
              className={`bg-neutral-900 border p-3 rounded-xl cursor-pointer hover:border-purple-500 transition group ${
                activeAnime.id === item.id ? "border-purple-500" : "border-neutral-800"
              }`}
            >
              <div className={`aspect-video w-full rounded-lg bg-gradient-to-br ${item.gradient} mb-3 flex items-center justify-center relative overflow-hidden`}>
                <Film className="w-8 h-8 text-white/20 group-hover:scale-110 transition duration-300" />
              </div>
              <h4 className="font-bold text-sm group-hover:text-purple-400 transition">{item.title}</h4>
              <p className="text-neutral-500 text-xs mt-0.5">{item.info}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
