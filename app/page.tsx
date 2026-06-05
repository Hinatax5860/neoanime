"use client";

import { useState } from "react";
import { Play, Film, Search } from "lucide-react";

const CATALOG = [
  { id: "cyberpunk", title: "Cyberpunk: Edgerunners", info: "Sci-Fi, Action", gradient: "from-blue-600 to-indigo-950" },
  { id: "naruto", title: "Naruto Shippuden", info: "Ninja, Shounen", gradient: "from-orange-600 to-red-950" },
  { id: "one-piece", title: "One Piece", info: "Pirates, Adventure", gradient: "from-cyan-600 to-blue-950" }
];


export default function AnimeSite() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState(CATALOG);
  const [selected, setSelected] = useState(CATALOG[0]);
  const [videoUrl, setVideoUrl] = useState(EPISODES[0].url);
  const [epTitle, setEpTitle] = useState("Episode 1");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;
    const filtered = CATALOG.filter(a => a.title.toLowerCase().includes(query));
    if (filtered.length > 0) {
      setAnimeList(filtered);
      setSelected(filtered[0]);
    } else {
      alert("No results found in sandbox mode.");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-4 lg:p-8">
      <nav className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div onClick={() => setAnimeList(CATALOG)} className="flex items-center gap-2 font-black text-xl tracking-wider text-purple-500 cursor-pointer">
          <Film className="w-6 h-6" />
          <span>NEO<span className="text-white">ANIME</span></span>
        </div>
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search anime shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-purple-500 text-white"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-neutral-400 hover:text-purple-400">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            {!isPlaying ? (
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className={`absolute inset-0 bg-gradient-to-br ${selected.gradient} opacity-40 -z-10`} />
                <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">{selected.title}</h1>
                <p className="text-neutral-400 text-sm mt-1 mb-4">{epTitle}</p>
                <button onClick={() => setIsPlaying(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition w-fit shadow-lg">
                  <Play className="w-5 h-5 fill-current" /> Watch Now
                </button>
              </div>
            ) : (
              <video src={videoUrl} className="w-full h-full object-contain" controls autoPlay />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selected.title}</h2>
            <p className="text-purple-400 text-sm mt-1 font-medium">{selected.info} • Player Active</p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 h-fit">
          <h3 className="font-bold text-lg mb-4 border-b border-neutral-800 pb-2">Select Episode</h3>
          <div className="space-y-2">
            {EPISODES.map((ep) => (
              <button
                key={ep.num}
                onClick={() => {
                  setVideoUrl(ep.url);
                  setEpTitle(`Episode ${ep.num}`);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition text-sm flex items-center justify-between ${
                  epTitle === `Episode ${ep.num}` ? "bg-purple-600/20 text-purple-400 border border-purple-500/40 font-medium" : "bg-neutral-800 hover:bg-neutral-700 text-neutral-400"
                }`}
              >
                <span>Play Episode {ep.num}</span>
                <Play className="w-3 h-3 opacity-40" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8">
        <h3 className="text-xl font-bold mb-4 text-neutral-300">Discover Content</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {animeList.map((item) => (
            <div key={item.id} onClick={() => { setSelected(item); setIsPlaying(false); }} className={`bg-neutral-900 border p-3 rounded-xl cursor-pointer hover:border-purple-500 transition ${selected.id === item.id ? "border-purple-500" : "border-neutral-800"}`}>
              <div className={`aspect-video w-full rounded-lg mb-2 bg-gradient-to-br ${item.gradient}`} />
              <h4 className="font-bold text-sm truncate">{item.title}</h4>
              <p className="text-neutral-500 text-xs mt-0.5">{item.info}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
