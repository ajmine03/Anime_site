import db from "@/data/anime-db.json";
import animeList from "@/data/anime-list.json";
import AnimeDetailExperience from "@/app/components/anime-detail-experience";

export default async function AnimePage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  const entry = (db as Record<string, Record<string, string[]>>)[decodedTitle];

  if (!entry) {
    return (
      <main className="min-h-screen bg-[#070b14] p-10 text-white">
        Anime not found
      </main>
    );
  }

  const seasons: Record<string, string[]> = {};
  Object.keys(entry).forEach(key => {
    if (key.startsWith('Season') && Array.isArray(entry[key])) {
      seasons[key] = entry[key];
    }
  });

  return (
    <AnimeDetailExperience
      title={decodedTitle}
      seasons={seasons}
      animeTitles={animeList as string[]}
    />
  );
}