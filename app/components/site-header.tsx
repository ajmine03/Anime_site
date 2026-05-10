"use client";

import { AnimatePresence, motion } from "./motion-lite";
import { Search } from "./icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getYearFromTitle, pickGenres, toSlug } from "./anime-utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/?tab=genres", label: "Genres" },
  { href: "/?tab=new", label: "New" },
  { href: "/?tab=popular", label: "Popular" },
];

type SiteHeaderProps = {
  animeTitles: string[];
  onSearchChange?: (query: string) => void;
};

export default function SiteHeader({ animeTitles, onSearchChange }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [focused, setFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const q = query.trim();
      setDebounced(q);
      onSearchChange?.(q);
    }, 220);
    return () => window.clearTimeout(t);
  }, [query, onSearchChange]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && !event.metaKey && !event.ctrlKey) {
        const target = event.target as HTMLElement | null;
        if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") {
          return;
        }
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const suggestions = useMemo(() => {
    if (!debounced) return [];
    const lower = debounced.toLowerCase();
    return animeTitles
      .filter((item) => {
        const byTitle = item.toLowerCase().includes(lower);
        const byYear = getYearFromTitle(item).includes(lower);
        const byGenre = pickGenres(item).some((genre) =>
          genre.toLowerCase().includes(lower),
        );
        return byTitle || byYear || byGenre;
      })
      .slice(0, 8);
  }, [animeTitles, debounced]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b border-white/5 backdrop-blur-xl ${
          scrolled ? "bg-[#0a0a0f]/85 py-2 shadow-lg" : "bg-[#0a0a0f]/60 py-4"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold font-heading tracking-wider text-white transition hover:text-[#ff6b6b]"
          >
            <span className="text-3xl drop-shadow-[0_0_10px_rgba(230,57,70,0.8)]">⚔️</span>
            AniStream
          </Link>

          {/* Center Search */}
          <div className="relative w-full max-w-xl hidden md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              ref={inputRef}
              value={query}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 130)}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search anime... (Press /)"
              className="h-11 w-full rounded-full border border-white/10 bg-[#12121a]/80 pl-11 pr-4 text-sm text-slate-100 outline-none transition-all duration-300 focus:w-full focus:border-[#e63946]/80 focus:bg-[#12121a] focus:shadow-[0_0_20px_rgba(230,57,70,0.25)]"
            />
            <AnimatePresence>
              {focused && suggestions.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="glass-card absolute top-14 z-30 w-full rounded-2xl p-2 border border-[#e63946]/20"
                >
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => router.push(`/anime/${toSlug(item)}`)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm text-slate-200 transition hover:bg-[#e63946]/15 hover:text-white"
                    >
                      <span className="line-clamp-1">{item}</span>
                      <span className="text-xs text-slate-400">
                        {getYearFromTitle(item)}
                      </span>
                    </button>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Right Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-medium tracking-wide text-sm font-heading uppercase transition ${
                    active
                      ? "text-[#ff6b6b] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      {/* Mobile Nav Bottom */}
      <nav className="fixed inset-x-3 bottom-4 z-40 grid grid-cols-4 rounded-3xl border border-white/10 bg-[#12121a]/95 p-2 backdrop-blur-xl md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="anime-button rounded-2xl px-3 py-2 text-center text-xs font-heading uppercase tracking-wide text-slate-200 hover:bg-white/10 hover:text-[#ff6b6b]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
