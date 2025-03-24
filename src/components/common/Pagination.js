import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ meta, onPageChange }) => {
  const { totalPages, page, hasNextPage, hasPreviousPage } = meta;

  // Don't render if only one page
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== page) {
      onPageChange(pageNumber);
    }
  };

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at a time

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Determine if we need left ellipsis
      if (page > 3) {
        pages.push('...');
      }

      // Calculate range around current page
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      // Adjust if we're near the start or end
      if (page <= 3) {
        end = 4;
      } else if (page >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add the range
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      // Determine if we need right ellipsis
      if (page < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Showing page {page} of {totalPages}
      </div>

      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage}
          className={`p-2 rounded-md border ${
            hasPreviousPage
              ? 'hover:bg-gray-100 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => handlePageClick(item)}
              className={`w-10 h-10 rounded-md flex items-center justify-center ${
                page === item
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 border'
              }`}
            >
              {item}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`p-2 rounded-md border ${
            hasNextPage
              ? 'hover:bg-gray-100 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
