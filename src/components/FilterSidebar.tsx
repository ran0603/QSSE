import { useState } from 'react';

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterSidebarProps {
  onFiltersChange: (filters: { surah?: number; juz?: number; theme?: string; root?: string }) => void;
}

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({ surah: '', juz: '', theme: '', root: '' });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange({
      surah: newFilters.surah ? Number(newFilters.surah) : undefined,
      juz: newFilters.juz ? Number(newFilters.juz) : undefined,
      theme: newFilters.theme || undefined,
      root: newFilters.root || undefined,
    });
  };

  // Sample options - replace with your actual data
  const surahs: FilterOption[] = Array.from({ length: 114 }, (_, i) => ({ value: i + 1, label: `Surah ${i + 1}` }));
  const juzs: FilterOption[] = Array.from({ length: 30 }, (_, i) => ({ value: i + 1, label: `Juz ${i + 1}` }));
  const themes: FilterOption[] = [{ value: '', label: 'All Themes' }, { value: 'prayer', label: 'Prayer' }, { value: 'charity', label: 'Charity' }];
  const roots: FilterOption[] = [{ value: '', label: 'All Roots' }, { value: 'قول', label: 'ق و ل' }, { value: 'صلى', label: 'ص ل ى' }];

  return (
    <div className="w-[25%] min-w-[280px] bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-6 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Surah</label>
          <select
            value={filters.surah}
            onChange={(e) => handleChange('surah', e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Surahs</option>
            {surahs.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Juz</label>
          <select
            value={filters.juz}
            onChange={(e) => handleChange('juz', e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Juz</option>
            {juzs.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <select
            value={filters.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {themes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Root (جذر)</label>
          <select
            value={filters.root}
            onChange={(e) => handleChange('root', e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {roots.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
