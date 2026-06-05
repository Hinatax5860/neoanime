"use client";

import { useState, useEffect } from "react";
import { Play, Film, Search, Loader2, AlertCircle } from "lucide-react";

const BACKUP_ANIME = [
  { id: "cyberpunk", title: "Cyberpunk: Edgerunners", info: "Sci-Fi, Action", gradient: "from-blue-600 to-indigo-900" },
  { id: "naruto", title: "Naruto Shippuden", info: "Ninja, Shounen", gradient: "from-orange-600 to-red-900" },
  { id: "one-piece", title: "One Piece", info: "Pirates, Adventure", gradient: "from-cyan-600 to-blue-950" }
];

const BACKUP_EPISODES = [
  { id: "1", number: 1, url: "https://googleapis.com" },
  { id: "2", number: 2, url: "https://googleapis.com" },
  { id: "3", number: 3, url: "https://googleapis.com" }
];

export default function UnbreakableDynamicSite() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState<any[]>(BACKUP_ANIME);
  const [selectedAnime, setSelectedAnime] = useState<any>(BACKUP_ANIME[0]);
  const [episodes, setEpisodes] = useState<any[]>(BACKUP_EPISODES);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(BACKUP_EPISODES[0].url);
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState<string>("Episode 1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-black text-xl tracking-wider text-purple-500 cursor-pointer">
          <Film className="w-6 h-6" />
          <span>NEO<span className="text-white">ANIME</span></span>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-md">
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

      <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 text-purple-400 text-xs flex items-center gap-2 max-w-7xl mx-auto mt-4 rounded-xl">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>Sandbox Player Mode Active. Core media streaming features operational.</span>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
            {!isPlaying ? (
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end bg-gradient-to-t from-neutral-950 via-neutral-900/30 to-transparent">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedAnime.gradient} opacity-30 -z-10`} />
                <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight line-clamp-2">{selectedAnime.title}</h1>
                <p className="text-neutral-400 text-sm mt-1 mb-4">{currentEpisodeTitle}</p>
                <button 
                  onClick={() => setIsPlaying(true)} 
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition w-fit shadow-lg shadow-purple-600/30"
                >
                  <Play className="w-5 h-5 fill-current" /> Watch Now
                </button>
              </div>
            ) : (
              <video src={currentVideoUrl} className="w-full h-full object-contain" controls autoPlay />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selectedAnime.title}</h2>
            <p className="text-purple-400 text-sm mt-1 font-medium">{selectedAnime.info}</p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 h-fit max-h-[450px] flex flex-col">
          <h3 className="font-bold text-lg mb-4 border-b border-neutral-800 pb-2">Select Episode</h3>
          <div className="space-y-2 overflow-y-auto pr-1 flex-1">
            {episodes.map((ep) => {
              const isCurrent = currentEpisodeTitle === `Episode ${ep.number}`;
              return (
                <button
                  key={ep.id}
                  onClick={() => {
                    setCurrentVideoUrl(ep.url);
                    setCurrentEpisodeTitle(`Episode ${ep.number}`);
                    setIsPlaying(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition text-sm flex items-center justify-between ${
                    isCurrent ? "bg-purple-600/20 text-purple-400 border border-purple-500/40 font-medium" : "bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400"
                  }`}
                >
                  <span>Play Episode {ep.number}</span>
                  <Play className="w-3 h-3 opacity-40" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-8 pt-0">
        <h3 className="text-xl font-bold mb-4 text-neutral-300">Discover Content</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {animeList.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedAnime(item);
                setIsPlaying(false);
              }}
              className={`bg-neutral-900 border p-3 rounded-xl cursor-pointer hover:border-purple-500 transition group ${
                selectedAnime.id === item.id ? "border-purple-500" : "border-neutral-800"
              }`}
            >
              <div className={`aspect-[4/3] sm:aspect-video w-full rounded-lg mb-2 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                <Film className="w-6 h-6 text-white/10" />
              </div>
              <h4 className="font-bold text-sm group-hover:text-purple-400 transition truncate">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
