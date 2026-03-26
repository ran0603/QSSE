import { Ayah } from "@/types/ayah"

interface ResultCardProps {
  ayah: Ayah;
  onClick: () => void;
  isSelected?: boolean;
}

export function ResultCard({ ayah, onClick, isSelected }: ResultCardProps) {
  const similarityPercent = ayah.similarity != null ? Math.round(ayah.similarity * 100) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left',
        'p-5 md:p-6 rounded-xl border transition-all duration-200',
        'bg-white hover:shadow-md focus:outline-none',
        'hover:border-blue-400 hover:-translate-y-0.5',
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200',
      ].join(' ')}
    >
      {/* Similarity badge row */}
      <div className="flex items-center justify-between mb-3">
        {similarityPercent !== null && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            {similarityPercent}% match
          </span>
        )}
      </div>

      {/* Arabic text */}
      <div
        className="mb-3 text-[22px] md:text-[24px] leading-relaxed text-right text-gray-900"
        dir="rtl"
        style={{ fontFamily: '"Amiri Quran", "Amiri", system-ui, sans-serif' }}
      >
        {ayah.arabic}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-200 mb-3" />

      {/* English translation */}
      <p className="mb-4 text-[14px] md:text-[15px] leading-relaxed text-gray-600">
        {ayah.english}
      </p>

      {/* Metadata badges row */}
      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
          Al-Fatihah {ayah.surah}:{ayah.ayah}
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
          Juz {ayah.juz}
        </span>
        {ayah.themeTags && (
          ayah.themeTags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              {tag}
            </span>
          ))
        )}
        {ayah.rootWords && (
          ayah.rootWords.map((rw) => (
            <span
              key={rw.word}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700"
              dir="rtl"
            >
              {rw.word}
            </span>
          ))
        )}
      </div>
    </button>
  );
}
