import Button from "@/pages/Admin/Components/Button";

/**
 * Komponen Pagination terintegrasi dengan SearchBar.
 *
 * Props pagination (wajib):
 *   currentPage, totalPages, startIndex, endIndex, totalItems,
 *   goToPage, goToNext, goToPrev, itemsPerPage, setItemsPerPage
 *
 * Props search (opsional):
 *   searchQuery    - nilai state pencarian
 *   onSearch       - setter pencarian
 *   searchPlaceholder - teks placeholder input
 */
const Pagination = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  goToPage,
  goToNext,
  goToPrev,
  itemsPerPage,
  setItemsPerPage,
  // --- search props ---
  searchQuery,
  onSearch,
  searchPlaceholder = "Cari data...",
}) => {
  if (totalItems === 0 && !searchQuery) return null;

  const hasSearch = typeof onSearch === "function";

  return (
    <div className="border-t border-gray-200 bg-white mt-4 rounded-b-lg">

      {/* ── Baris Search + Limit (selalu tampil jika ada onSearch) ── */}
      {hasSearch && (
        <div className="flex items-center gap-3 px-4 pt-3 pb-2 flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white shadow-sm"
            />
          </div>

          {/* Reset Button */}
          {searchQuery && (
            <button
              onClick={() => onSearch("")}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors
                         px-2 py-1.5 rounded border border-gray-300 hover:border-red-400 whitespace-nowrap"
            >
              ✕ Reset
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Limit Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 whitespace-nowrap">Tampilkan:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="text-sm border-gray-300 rounded-md focus:ring-blue-500
                         focus:border-blue-500 py-1 pl-2 pr-6 border"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      )}

      {/* ── Baris Navigasi Halaman ── */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3">

          {/* Mobile: Prev / Next saja */}
          <div className="flex flex-1 justify-between sm:hidden mb-4">
            <Button variant="secondary" size="sm" onClick={goToPrev}
              disabled={currentPage === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <Button variant="secondary" size="sm" onClick={goToNext}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex flex-1 items-center justify-between">
            {/* Info data */}
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-700">
                Menampilkan{" "}
                <span className="font-medium">{startIndex + 1}</span> hingga{" "}
                <span className="font-medium">{endIndex}</span> dari{" "}
                <span className="font-medium">{totalItems}</span> data
              </p>

              {/* Limit dropdown (jika tidak ada search bar di atas) */}
              {!hasSearch && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Tampilkan:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500
                               focus:border-blue-500 py-1 pl-2 pr-6 border"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              )}
            </div>

            {/* Tombol Halaman */}
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={goToPrev}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400
                           ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20
                           focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                    currentPage === page
                      ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400
                           ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20
                           focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
