interface TafsirPanelProps {
  tafsir?: string;
  selectedAyah?: { surah: number; ayah: number };
}

export function TafsirPanel({ tafsir, selectedAyah }: TafsirPanelProps) {
  return (
    <div className="w-[45%] bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
      {selectedAyah ? (
        <>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Tafsir Ibn Kathir - Surah {selectedAyah.surah}: {selectedAyah.ayah}
          </h3>
          {tafsir ? (
            <div dangerouslySetInnerHTML={{ __html: tafsir }} />
          ) : (
            <p className="text-gray-500 italic">Loading tafsir...</p>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 animate-pulse" />
          <p>Select an ayah to view Ibn Kathir tafsir</p>
        </div>
      )}
    </div>
  );
}
