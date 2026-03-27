'use client';

import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ResultsList } from '@/components/ResultsList';
import { TafsirPanel } from '@/components/TafsirPanel';
import type { SearchRequestBody } from '@/types/search';
import type { SearchResult } from '@/types/search';
import type { Ayah } from '@/types/ayah';

const API_URL = process.env.NEXT_PUBLIC_APP_URL || '';

async function callSearchApi(body: SearchRequestBody) {
  const res = await fetch(`${API_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Search error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<{ surah?: number; juz?: number; theme?: string; root?: string }>({});
  const [results, setResults] = useState<Ayah[]>([]);
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      const trimmed = searchQuery.trim();
      if (!trimmed) return;

      setIsLoading(true);
      setResults([]);
      setSelectedAyah(null);

      try {
        const body: SearchRequestBody = {
          query: {
            source_sentence: '',          // or use trimmed if your backend expects it
            sentences: [trimmed],
          },
          filters: {
            surah: filters.surah,
            juz: filters.juz,
            theme: filters.theme,
            root: filters.root,
          },
        };

        const data = await callSearchApi(body);

        // Adjust this mapping to match your API response shape
        setResults(
          data.results.map((r: SearchResult) => ({
            id: r.id,
            arabic: r.arabic_text,
            english: r.translation_en,
            surah: r.surah_number,
            ayah: r.ayah_number,
            juz: r.juz_number,
            similarity: r.similarity_en > r.similarity_ar ? r.similarity_en : r.similarity_ar,
            themeTags: r.theme_tags,
            rootWords: r.root_words || [],
            tafsir: r.tafsir_excerpt
          })),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [filters],
  );

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    // Optionally trigger search if query exists
    if (query.trim()) {
      handleSearch(query);
    }
  }, [query, handleSearch]);

  const handleAyahSelect = useCallback((ayah: Ayah): void => {
    setSelectedAyah(ayah);
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsArabic(/[\u0600-\u06FF\u0750-\u077F]/.test(value));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col xs:flex-row font-sans">
      <SearchBar
        value={query}
        onChange={handleQueryChange}
        onSubmit={handleSearch}
        isArabic={isArabic}
      />
      
      <div className="flex flex-1 overflow-hidden xs:flex-row">
        <FilterSidebar onFiltersChange={handleFiltersChange} />
        
        <div className="flex-1 flex flex-col lg:w-[55%] border-r border-gray-200">
          <ResultsList
            results={results}
            isLoading={isLoading}
            onSelect={handleAyahSelect}
          />
        </div>
        
        <TafsirPanel tafsir={selectedAyah?.tafsir} selectedAyah={selectedAyah || undefined} />
      </div>
    </div>
  );
}
