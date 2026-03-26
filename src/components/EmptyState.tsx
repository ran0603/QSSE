export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-center text-gray-500 bg-gray-50 rounded-xl">
      <div className="w-20 h-20 bg-gray-200 rounded-full mb-6 animate-pulse" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="mb-6">Try adjusting your search query or filters for more matches.</p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Clear Filters
      </button>
    </div>
  );
}
