export default function Pagination({ page, count, previous, next, onChange }) {
  const totalPages = Math.ceil(count / 10) || 1;

  // Generate page numbers to display
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Previous Button */}
      <button
        disabled={!previous}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 rounded border disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 rounded border ${
              p === page
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-black border-gray-300 hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={!next}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 rounded border disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
