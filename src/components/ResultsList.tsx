import { ResultCard } from './ResultCard';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

interface Ayah {
  id: number;
  arabic: string;
  english: string;
  surah: number;
  ayah: number;
  juz: number;
}

interface ResultsListProps {
  results: Ayah[];
  isLoading: boolean;
  onSelect: (ayah: Ayah) => void;
}

export function ResultsList({ results, isLoading, onSelect }: ResultsListProps) {
  if (isLoading) return <LoadingState />;
  if (results.length === 0) return <EmptyState />;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {results.map((ayah) => (
        <ResultCard key={ayah.id} ayah={ayah} onClick={() => onSelect(ayah)} />
      ))}
    </div>
  );
}
