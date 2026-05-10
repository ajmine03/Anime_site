"use client";

import { useState } from "react";

const genres = [
  "All",
  "Action",
  "Romance",
  "Isekai",
  "Shounen",
  "Horror",
  "Comedy",
  "Sci-Fi",
  "Fantasy",
  "Drama",
];

const years = ["All Years", "2024", "2023", "2022", "2021", "2020", "Older"];
const sorts = ["Latest", "Popular", "A-Z"];

export default function FilterBar() {
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <div className="w-full border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-[73px] z-30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 lg:px-8 md:flex-row md:items-center md:justify-between">
        
        {/* Genre Chips (Scrollable) */}
        <div className="flex w-full overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeGenre === genre
                  ? "bg-[#e63946] text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-shrink-0 gap-3">
          <select className="rounded-xl border border-white/10 bg-[#12121a] px-3 py-1.5 text-sm text-slate-200 outline-none hover:border-[#e63946]/50 focus:border-[#e63946]">
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select className="rounded-xl border border-white/10 bg-[#12121a] px-3 py-1.5 text-sm text-slate-200 outline-none hover:border-[#e63946]/50 focus:border-[#e63946]">
            {sorts.map((s) => (
              <option key={s} value={s}>Sort: {s}</option>
            ))}
          </select>
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
    </div>
  );
}
