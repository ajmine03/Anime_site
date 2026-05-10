"use client";

import { motion } from "./motion-lite";
import { Play } from "./icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import AnimePoster from "./anime-poster";
import SiteHeader from "./site-header";
import FilterBar from "./filter-bar";
import { buildMeta } from "./anime-utils";

type HomeExperienceProps = {
  animeTitles: string[];
};

export default function HomeExperience({ animeTitles }: HomeExperienceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  const all = useMemo(() => {
    let filtered = animeTitles;
    if (searchQuery) {
      filtered = filtered.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered.map((title) => buildMeta(title));
  }, [animeTitles, searchQuery]);

  const totalPages = Math.ceil(all.length / itemsPerPage);
  const currentItems = all.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] pb-28 text-slate-100">
      <SiteHeader animeTitles={animeTitles} onSearchChange={handleSearch} />
      <FilterBar />

      <section className="mx-auto mt-8 max-w-[1600px] px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 md:gap-5 xl:gap-6">
          {currentItems.map((anime, index) => (
            <motion.div
              key={anime.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % itemsPerPage) * 0.05, duration: 0.4 }}
              className="group h-full"
            >
              <Link
                href={`/anime/${anime.slug}`}
                className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl glow-border"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <AnimePoster title={anime.title} alt={anime.title} className="absolute inset-0" />
                  
                  {/* Year Badge */}
                  <div className="absolute right-2 top-2 z-10 rounded-md bg-[#0a0a0f]/80 px-2 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                    {anime.year}
                  </div>

                  {/* Gradient Fade Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Watch Now Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-[#e63946] px-4 py-2 font-bold text-white shadow-[0_0_15px_rgba(230,57,70,0.6)] transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="size-4 fill-white" /> Watch Now
                    </span>
                  </div>
                </div>

                {/* Title Area */}
                <div className="absolute bottom-0 left-0 right-0 p-3 pt-6 z-10 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent">
                  <h3 className="line-clamp-2 text-sm font-bold text-white font-heading tracking-wide drop-shadow-md">
                    {anime.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full bg-[#12121a] border border-white/10 px-6 py-2.5 text-sm font-semibold transition-all hover:bg-white/5 hover:border-[#e63946]/50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-400 font-heading tracking-wider">
              PAGE {page} OF {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-full bg-[#12121a] border border-white/10 px-6 py-2.5 text-sm font-semibold transition-all hover:bg-white/5 hover:border-[#e63946]/50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
