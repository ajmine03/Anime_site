"use client";

import { motion } from "./motion-lite";
import {
  FastForward,
  Play,
  SkipBack,
  SkipForward,
  Star,
  Tv2,
  Compass,
  Home,
  Heart
} from "./icons";
import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import SiteHeader from "./site-header";
import { placeholder_poster, toSlug, buildMeta } from "./anime-utils";
import AnimePoster from "./anime-poster";

type WatchExperienceProps = {
  title: string;
  videoUrl: string;
  season: string;
  episode: number;
  animeTitles: string[];
  seasonEpisodes: string[];
  allSeasons: Record<string, string[]>;
  alternativeSources: Record<string, string>;
};

export default function WatchExperience({
  title,
  videoUrl,
  season,
  episode,
  animeTitles,
  seasonEpisodes,
  allSeasons,
  alternativeSources,
}: WatchExperienceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSidebarSeason, setActiveSidebarSeason] = useState(season);
  const [activeSource, setActiveSource] = useState("browsehappy.com");
  
  const currentIndex = Math.max(0, episode - 1);
  const prevEpisode = currentIndex > 0 ? seasonEpisodes[currentIndex - 1] : null;
  const nextEpisode = seasonEpisodes[currentIndex + 1];
  const streamUrl = `/api/stream?url=${encodeURIComponent(videoUrl)}`;
  const meta = buildMeta(title, seasonEpisodes.length);

  const recommended = useMemo(
    () => animeTitles.filter((item) => item !== title).slice(0, 8),
    [animeTitles, title],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setSidebarCollapsed(true);
    const onPause = () => setSidebarCollapsed(false);
    
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const playVideo = (url: string) => {
    const player = document.getElementById("main-video-player") as HTMLVideoElement;
    if (player) {
      player.src = `/api/stream?url=${encodeURIComponent(url)}`;
      player.load();
      player.play().catch(console.error);
    }
  };

  const skipBy = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const sources = [
    { id: "browsehappy.com", label: "BrowseHappy", icon: Tv2 },
    { id: "h5ai", label: "H5AI Server", icon: Compass },
    { id: "Anime--Cartoon-TV-Series", label: "CartoonTV", icon: Home },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] pb-24 text-slate-100">
      <SiteHeader animeTitles={animeTitles} />
      
      <div className="mx-auto mt-6 flex max-w-[1600px] flex-col gap-6 px-4 lg:flex-row lg:px-8 relative">
        
        {/* Left Sidebar (Collapsible) */}
        <aside 
          className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 shrink-0 w-full lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:overflow-y-auto hide-scrollbar group ${
            isSidebarCollapsed ? "lg:w-[60px] hover:lg:w-[220px]" : "lg:w-[220px]"
          }`}
        >
          <div className="space-y-6">
            <div className={`glass-card overflow-hidden rounded-2xl p-4 glow-border transition-opacity duration-300 ${isSidebarCollapsed ? "lg:opacity-0 lg:group-hover:opacity-100" : "opacity-100"}`}>
              <AnimePoster title={title} alt={title} className="aspect-[2/3] w-full max-w-[200px] mx-auto rounded-xl shadow-lg" />
              <h1 className="mt-4 text-xl font-bold font-heading text-white line-clamp-2">{title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <span className="flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-1 text-yellow-400">
                  <Star className="size-3" /> {meta.rating}
                </span>
                <span className="rounded bg-white/10 px-2 py-1">{meta.year}</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-2 lg:p-4 flex flex-col lg:max-h-[60vh]">
              {/* Season Tabs */}
              <div className="mb-4 flex flex-wrap gap-2 pb-2 transition-opacity duration-300 ${isSidebarCollapsed ? 'lg:opacity-0 lg:group-hover:opacity-100 hidden lg:flex' : ''}">
                {Object.keys(allSeasons).map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setActiveSidebarSeason(s)}
                    className={`shrink-0 whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-bold transition ${
                      activeSidebarSeason === s
                        ? "border-[#e63946] bg-[#e63946] text-white shadow-[0_0_10px_rgba(230,57,70,0.4)]"
                        : "border-[#2a2a3a] bg-[#1a1a2a] text-slate-400 hover:border-[#e63946]/50 hover:bg-[#e63946]/10 hover:text-white"
                    }`}
                  >
                    S{i + 1}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2 overflow-y-auto pr-1 hide-scrollbar">
                {(allSeasons[activeSidebarSeason] ?? []).map((ep, index) => {
                  const active = activeSidebarSeason === season && index === currentIndex;
                  return (
                    <Link
                      key={ep}
                      data-video-url={ep}
                      onClick={() => playVideo(ep)}
                      href={`/watch?video=${encodeURIComponent(ep)}&title=${encodeURIComponent(title)}&season=${encodeURIComponent(activeSidebarSeason)}&episode=${index + 1}`}
                      className={`episode-btn flex items-center gap-3 rounded-xl border p-2 transition-all ${
                        active
                          ? "border-[#e63946]/50 bg-[#e63946]/10 shadow-[0_0_15px_rgba(230,57,70,0.2)]"
                          : "border-white/5 bg-[#12121a]/50 hover:border-[#e63946]/30 hover:bg-[#12121a]"
                      }`}
                    >
                      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={placeholder_poster(`EP ${index + 1}`)} 
                          alt={`EP ${index + 1}`} 
                          className="h-full w-full object-cover" 
                        />
                        {active && (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#e63946]/40 backdrop-blur-[2px]">
                            <Play className="size-4 fill-white" />
                          </div>
                        )}
                      </div>
                      <div className={`min-w-0 flex-1 transition-opacity duration-300 ${isSidebarCollapsed ? "lg:opacity-0 lg:group-hover:opacity-100 hidden lg:block" : ""}`}>
                        <p className={`text-xs font-bold ${active ? "text-[#ff6b6b]" : "text-white"}`}>
                          Episode {index + 1}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Video Area */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Video Player Container */}
          <div className="glass-card overflow-hidden rounded-3xl p-1 md:p-2 glow-border bg-[#000]">
            <video 
              id="main-video-player"
              ref={videoRef} 
              controls 
              autoPlay 
              key={streamUrl}
              className="w-full aspect-video rounded-2xl bg-black shadow-2xl" 
              src={streamUrl} 
            />
          </div>

          {/* Episode Info & Controls */}
          <div className="glass-card rounded-3xl p-5 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-[#e63946] px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">{season}</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Episode {episode}</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold font-heading text-white">
                  Episode {episode}
                </h1>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center justify-center rounded-xl border border-white/10 bg-[#12121a] p-3 transition hover:bg-white/10 hover:text-[#ff6b6b]">
                  <Heart className="size-4" />
                </button>
                <div className="flex items-center rounded-xl border border-white/10 bg-[#12121a] overflow-hidden">
                  <Link 
                    href={prevEpisode ? `/watch?video=${encodeURIComponent(prevEpisode)}&title=${encodeURIComponent(title)}&season=${encodeURIComponent(season)}&episode=${episode - 1}` : "#"}
                    className={`p-3 transition ${prevEpisode ? "hover:bg-white/10 hover:text-[#ff6b6b]" : "opacity-30 pointer-events-none"}`}
                  >
                    <SkipBack className="size-4" />
                  </Link>
                  <div className="w-[1px] h-6 bg-white/10" />
                  <Link 
                    href={nextEpisode ? `/watch?video=${encodeURIComponent(nextEpisode)}&title=${encodeURIComponent(title)}&season=${encodeURIComponent(season)}&episode=${episode + 1}` : "#"}
                    className={`p-3 transition ${nextEpisode ? "hover:bg-white/10 hover:text-[#ff6b6b]" : "opacity-30 pointer-events-none"}`}
                  >
                    <SkipForward className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button onClick={() => skipBy(-10)} className="rounded-lg border border-white/10 bg-[#12121a] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition hover:bg-white/10">
                <SkipBack className="mr-1 inline size-3" /> -10s
              </button>
              <button onClick={() => skipBy(10)} className="rounded-lg border border-white/10 bg-[#12121a] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition hover:bg-white/10">
                <SkipForward className="mr-1 inline size-3" /> +10s
              </button>
              <button onClick={() => skipBy(85)} className="rounded-lg border border-white/10 bg-[#12121a] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition hover:bg-white/10 text-[#ff6b6b]">
                <FastForward className="mr-1 inline size-3" /> Skip Intro
              </button>
            </div>

            <hr className="border-white/5" />

            {/* Servers */}
            <div>
              <h3 className="mb-3 text-xs font-bold font-heading uppercase tracking-widest text-slate-400">Streaming Servers</h3>
              <div className="flex flex-wrap gap-3">
                {sources.map((s) => {
                  const Icon = s.icon;
                  const sourceUrl = alternativeSources[s.id] || videoUrl;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setActiveSource(s.id);
                        playVideo(sourceUrl);
                      }}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                        activeSource === s.id
                          ? "bg-[#e63946] text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]"
                          : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="size-4" /> {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Related */}
          <div>
            <h3 className="mb-4 text-xl font-bold font-heading uppercase text-white">More Like This</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
              {recommended.map((item) => (
                <Link
                  href={`/anime/${toSlug(item)}`}
                  key={item}
                  className="glass-card group relative overflow-hidden rounded-2xl glow-border"
                >
                  <div className="aspect-[3/4] w-full">
                    <AnimePoster title={item} alt={item} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <p className="truncate text-sm font-bold text-white font-heading">{item}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
