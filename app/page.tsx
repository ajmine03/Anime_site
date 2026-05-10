import animeList from "@/data/anime-list.json";
import db from "@/data/anime-db.json";
import HomeExperience from "./components/home-experience";

export default function Home() {
  const validAnimes = (animeList as string[]).filter((name) => {
    const entry = (db as Record<string, Record<string, string[]>>)[name];
    if (!entry) return false;
    return Object.keys(entry).some(
      (k) => k.startsWith("Season") && Array.isArray(entry[k]) && entry[k].length > 0
    );
  });

  return <HomeExperience animeTitles={validAnimes} />;
}