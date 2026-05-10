"use client";

import { motion } from "./motion-lite";
import { Clock3, Heart, Play, Share2, Star    } from "./icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import AnimePoster from "./anime-poster";
import SiteHeader from "./site-header";
import { buildMeta, placeholder_poster, toSlug } from "./anime-utils";

type AnimeDetailExperienceProps = {
  title: string;
  animeTitles: string[];
  seasons: Record<string, string[]>;
};

export default function AnimeDetailExperience({
  title,
  animeTitles,
  seasons,
}: AnimeDetailExperienceProps) {
  const seasonNames = useMemo(() => Object.keys(seasons), [seasons]);
  const [activeSeason, setActiveSeason] = useState(seasonNames[0] ?? "");
  const meta = buildMeta(title, Object.values(seasons).flat().length);
  const currentEpisodes = seasons[activeSeason] ?? [];

  const recommended = useMemo(
    () => animeTitles.filter((item) => item !== title).slice(0, 8),
    [animeTitles, title],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] pb-28 text-slate-100">
      <SiteHeader animeTitles={animeTitles} />
      
      <div className="mx-auto mt-6 flex max-w-[1600px] flex-col gap-8 px-4 lg:flex-row lg:px-8">
        
        {/* Left Sidebar (Fixed width on desktop) */}
        <aside className="w-full shrink-0 space-y-6 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:w-[220px] lg:overflow-y-auto hide-scrollbar">
          {/* Poster & Basic Info */}
          <div className="glass-card overflow-hidden rounded-2xl p-4 glow-border">
            <AnimePoster title={title} alt={title} className="aspect-[2/3] w-full max-w-[200px] mx-auto rounded-xl shadow-lg" />
            <h1 className="mt-4 text-xl font-bold font-heading text-white">{title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <span className="flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-1 text-yellow-400">
                <Star className="size-3" /> {meta.rating}
              </span>
              <span className="rounded bg-white/10 px-2 py-1">{meta.year}</span>
              <span className="rounded bg-white/10 px-2 py-1">{seasonNames.length} SSN</span>
            </div>
            
            <p className="mt-4 text-sm text-slate-400 line-clamp-4">
              A high-energy story with dynamic fight choreography, emotional turns,
              and richly stylized world-building. Dive into each arc with seamless
              season navigation and cinematic episode playback.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {meta.genres.map((genre) => (
                <span key={genre} className="rounded border border-[#e63946]/30 bg-[#e63946]/10 px-2 py-1 text-[10px] uppercase font-bold text-[#ff6b6b]">
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2">
              <Link
                href={`/watch?title=${encodeURIComponent(title)}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e63946] py-3 text-sm font-bold shadow-[0_0_15px_rgba(230,57,70,0.4)] transition hover:bg-[#ff6b6b] hover:shadow-[0_0_25px_rgba(255,107,107,0.6)]"
              >
                <Play className="size-4 fill-white" /> WATCH NOW
              </Link>
              <button className="flex items-center justify-center rounded-xl bg-white/10 p-3 transition hover:bg-white/20">
                <Heart className="size-4" />
              </button>
            </div>
          </div>

          {/* Episode List */}
          <div className="glass-card rounded-2xl p-4">
            <h3 className="text-sm font-bold font-heading uppercase tracking-widest text-[#ff6b6b] mb-4">Episodes</h3>
            
            {/* Season Tabs */}
            <div className="mb-4 flex flex-wrap gap-2 pb-2">
              {seasonNames.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSeason(s)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition ${
                    activeSeason === s
                      ? "bg-[#e63946]/20 text-[#ff6b6b] shadow-[inset_0_-2px_0_#e63946]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {currentEpisodes.map((ep, idx) => (
                <Link
                  key={ep}
                  href={`/watch?video=${encodeURIComponent(ep)}&title=${encodeURIComponent(
                    title,
                  )}&season=${encodeURIComponent(activeSeason)}&episode=${idx + 1}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#12121a]/50 p-2 transition hover:border-[#e63946]/40 hover:bg-[#12121a]"
                >
                  <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md">
                    <img
                      src={placeholder_poster(`EP ${idx + 1}`)}
                      alt="Thumbnail"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                      <Play className="size-4 fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white group-hover:text-[#ff6b6b] transition">
                      EP {idx + 1}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content (Right Side) */}
        <div className="flex-1 space-y-6 min-w-0">
          <div className="glass-card relative overflow-hidden rounded-3xl glow-border">
            <div className="relative w-full h-[280px] md:h-[300px]">
              <AnimePoster title={title} alt={title} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl md:text-3xl font-bold font-heading drop-shadow-lg text-white">
                  Welcome to {title}
                </h2>
                <p className="mt-2 text-sm text-slate-300 md:text-base drop-shadow-md">
                  Experience the epic journey of a lifetime. Stream all seasons in high quality.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold font-heading uppercase text-white">Related Anime</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4">
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
