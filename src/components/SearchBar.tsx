import { FormEvent, ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  isArabic?: boolean;
}

export function SearchBar({ value, onChange, onSubmit, isArabic }: SearchBarProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 p-4 bg-white shadow-sm border-b border-gray-200">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search Quran (English or Arabic)..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        dir={isArabic ? 'rtl' : 'ltr'}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Search
      </button>
    </form>
  );
}
