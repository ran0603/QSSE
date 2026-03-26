export function LoadingState() {
  return (
    <div className="flex-1 p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-4/5 mb-4 dir-rtl" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-32" />
            <div className="h-6 w-12 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
