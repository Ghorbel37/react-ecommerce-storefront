import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, totalPages, onPageChange }: any) {
  if (totalPages <= 1) return null;

  function getVisiblePages() {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    if (totalPages <= 7) 
      return pages;

    const left = Math.max(currentPage - 2, 1);
    const right = Math.min(currentPage + 2, totalPages);
    const visible: (number | "...")[] = [];

    if (left > 1) {
      visible.push(1);
      if (left > 2) 
        visible.push("...");
    }
    for (let p = left; p <= right; p++) 
      visible.push(p);
    if (right < totalPages) {
      if (right < totalPages - 1) 
        visible.push("...");
      
      visible.push(totalPages);
    }

    return visible;
  }

  const btnBase =
    "h-9 min-w-9 px-2 flex items-center justify-center rounded-lg text-sm font-medium transition-colors";

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {getVisiblePages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className={`${btnBase} text-stone-400 cursor-default`}>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`${btnBase} ${
              p === currentPage
                ? "bg-amber-500 text-white"
                : "text-stone-700 hover:bg-stone-200"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
