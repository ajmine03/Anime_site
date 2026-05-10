import animeList from "@/data/anime-list.json";
import db from "@/data/anime-db.json";
import WatchExperience from "@/app/components/watch-experience";

type WatchPageProps = {
  searchParams: Promise<{
    video?: string;
    title?: string;
    season?: string;
    episode?: string;
  }>;
};

export default async function WatchPage({ searchParams }: WatchPageProps) {
  const params = await searchParams;
  const title = params.title ?? "11 Eyes-2009";
  const entry = (db as Record<string, Record<string, string[]>>)[title] ?? {};
  
  const seasonsData: Record<string, string[]> = {};
  Object.keys(entry).forEach(key => {
    if (key.startsWith('Season') && Array.isArray(entry[key])) {
      seasonsData[key] = entry[key];
    }
  });

  const seasons = Object.keys(seasonsData);
  const season = params.season ?? seasons[0] ?? "Season 1";
  const seasonEpisodes = seasonsData[season] ?? [];
  const episode = Number(params.episode ?? "1");
  const currentIndex = Math.max(episode - 1, 0);
  const videoUrl = params.video ?? seasonEpisodes[currentIndex] ?? "";

  const alternativeSources = {
    "browsehappy.com": entry["browsehappy.com"]?.[currentIndex] ?? "",
    "h5ai": entry["h5ai"]?.[currentIndex] ?? "",
    "Anime--Cartoon-TV-Series": entry["Anime--Cartoon-TV-Series"]?.[currentIndex] ?? "",
  };

  return (
    <WatchExperience
      title={title}
      videoUrl={videoUrl}
      season={season}
      episode={episode}
      seasonEpisodes={seasonEpisodes}
      allSeasons={seasonsData}
      animeTitles={animeList as string[]}
      alternativeSources={alternativeSources}
    />
  );
}
