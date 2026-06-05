"use client";

import { useState, useEffect } from "react";
import { Play, Film, Search, Loader2 } from "lucide-react";

// Make sure this matches your exact live Render web app service link
const RENDER_API_BASE = "https://onrender.com";

export default function FullyLiveAnimeSite() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${RENDER_API_BASE}/top-airing`);
      const data = await res.json();
      if (data && data.results && data.results.length > 0) {
        setAnimeList(data.results);
        handleSelectAnime(data.results[0]);
      }
    } catch (err) {
      console.error("API waking up, retrying shortly...", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${RENDER_API_BASE}/${searchQuery}`);
      const data = await res.json();
      if (data && data.results && data.results.length > 0) {
        setAnimeList(data.results);
        handleSelectAnime(data.results[0]);
      }
    } catch (err) {
      alert("The server is still booting up. Try again in 10 seconds.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnime = async (anime: any) => {
    if (!anime) return;
    setSelectedAnime(anime);
    setIsPlaying(false);
    setCurrentVideoUrl("");
    setEpisodes([]);

    try {
      const res = await fetch(`${RENDER_API_BASE}/info/${anime.id}`);
      const data = await res.json();
      if (data && data.episodes && data.episodes.length > 0) {
        setEpisodes(data.episodes);
        handleSelectEpisode(data.episodes[0]);
      }
    } catch (err) {
      console.error("Failed loading episodes.");
    }
  };

  const handleSelectEpisode = async (ep: any) => {
    if (!ep) return;
    setCurrentEpisodeTitle(`Episode ${ep.number}`);
    setIsPlaying(false);
    try {
      const res = await fetch(`${RENDER_API_BASE}/watch/${ep.id}`);
      const data = await res.json();
      if (data && data.sources && data.sources.length > 0) {
        const defaultSource = data.sources.find((s: any) => s.quality === "default") || data.sources[0];
        setCurrentVideoUrl(defaultSource.url);
      }
    } catch (err) {
      console.error("Video stream extraction error.");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div onClick={fetchTrending} className="flex items-center gap-2 font-black text-xl tracking-wider text-purple-500 cursor-pointer">
          <Film className="w-6 h-6" />
          <span>NEO<span className="text-white">ANIME</span></span>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search thousands of anime shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-purple-500 transition text-white"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-neutral-400 hover:text-purple-400">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </nav>

      {isLoading && (
        <div className="flex items-center justify-center py-20 gap-2 text-purple-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Syncing Live Server Database... (Waking up, please hold)</span>
        </div>
      )}

      {!isLoading && !selectedAnime && (
        <div className="flex flex-col items-center justify-center py-32 text-neutral-500 text-sm">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-2" />
          <p>Initial server configurations loading. Please wait 10 seconds...</p>
        </div>
      )}

      {!isLoading && selectedAnime && (
        <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              {!isPlaying ? (
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                  {selectedAnime.image && <img src={selectedAnime.image} className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.25]" />}
                  <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight line-clamp-2">{selectedAnime.title}</h1>
                  <p className="text-neutral-400 text-sm mt-1 mb-4">{currentEpisodeTitle || "Selecting Stream..."}</p>
                  <button 
                    onClick={() => setIsPlaying(true)} 
                    disabled={!currentVideoUrl}
                    className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold py-3 px-6 rounded-xl transition w-fit shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" /> {currentVideoUrl ? "Watch Now" : "Parsing Video Streams..."}
                  </button>
                </div>
              ) : (
                <video src={currentVideoUrl} className="w-full h-full object-contain" controls autoPlay />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{selectedAnime.title}</h2>
              <p className="text-purple-400 text-sm mt-1 font-medium">Status: Private Server Connected</p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 h-fit max-h-[500px] flex flex-col">
            <h3 className="font-bold text-lg mb-4 border-b border-neutral-800 pb-2">Available Episodes</h3>
            <div className="space-y-2 overflow-y-auto pr-1 flex-1">
              {episodes.length === 0 ? (
                <p className="text-sm text-neutral-500 p-4 text-center animate-pulse">Scanning server files...</p>
              ) : (
                episodes.map((ep, i) => {
                  const isCurrent = currentEpisodeTitle === `Episode ${ep.number}`;
                  return (
                    <button
                      key={ep.id || i}
                      onClick={() => handleSelectEpisode(ep)}
                      className={`w-full text-left p-3 rounded-xl transition text-sm flex items-center justify-between ${
                        isCurrent ? "bg-purple-600/20 text-purple-400 border border-purple-500/40 font-medium" : "bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      <span>Episode {ep.number}</span>
                      {isCurrent && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">Active</span>}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {!isLoading && animeList && animeList.length > 0 && (
        <div className="max-w-7xl mx-auto p-4 lg:p-8 pt-0">
          <h3 className="text-xl font-bold mb-4 text-neutral-300">Trending Right Now</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {animeList.slice(0, 12).map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => handleSelectAnime(item)}
                className={`bg-neutral-900 border rounded-xl overflow-hidden cursor-pointer hover:border-purple-500 transition group p-2 ${
                  selectedAnime?.id === item.id ? "border-purple-500" : "border-neutral-800"
                }`}
              >
                <div className="aspect-[2/3] w-full rounded-lg bg-neutral-800 relative overflow-hidden mb-2">
                  {item.image && <img src={item.image} alt="poster" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />}
                </div>
                <h4 className="font-bold text-xs group-hover:text-purple-400 transition truncate">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
