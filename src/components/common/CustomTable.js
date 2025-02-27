import React from 'react';

const CustomTable = ({
  headers,
  isLoading = false,
  skeletonRows = 3,
  children,
  paginate,
  useDefaultPagination = false,
  paginationValues,
}) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <div className="w-full overflow-scroll max-h-[400px] rounded-lg border">
        <table className="w-full min-w-[600px] text-center capitalize font-semibold text-[#344054] text-sm border-collapse">
          {/* Table Header */}
          <thead className="bg-[#F9FAFB]">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b border-[#EAECF0]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white">
            {isLoading
              ? // Show Skeleton Rows if Loading
                Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((_, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 border-b border-[#EAECF0]"
                      >
                        <div className="h-4 bg-white rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : // Render Children as Table Body
                children}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5">
        {useDefaultPagination ? (
          <DefaultPagination
            total={paginationValues.total}
            startRow={paginationValues.startRow}
            endRow={paginationValues.endRow}
            page={paginationValues.page}
            pageCount={paginationValues.pageCount}
            setLimit={paginationValues.setLimit}
            limit={paginationValues.limit}
            onNext={paginationValues.onNext}
            onPrevious={paginationValues.onPrevious}
          />
        ) : (
          paginate
        )}
      </div>
    </div>
  );
};

export default CustomTable;

const DefaultPagination = ({
  total,
  startRow,
  endRow,
  page,
  pageCount,
  limit,
  setLimit,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div className="flex justify-center flex-col md:flex-row gap-8 items-center pb-5">
        <p className="text-sm text-[#242628]">
          Showing rows {startRow} to {endRow} of {total}
        </p>

        <div className="flex gap-4 items-center">
          <div
            className={`flex items-center gap-1 text-sm text-[#A4A6A8] ${
              page === 1 ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={page === 1 ? undefined : onPrevious}
          >
            <span>Previous</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#A4A6A8]">
            <div className="bg-transparent py-1.5 px-2 text-sm text-[#242628]">
              {page}
            </div>
          </div>

          <div
            className={`flex items-center gap-1 text-sm text-[#A4A6A8] ${
              page === pageCount ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={page === pageCount ? undefined : onNext}
          >
            <span>Next</span>
          </div>
        </div>

        <select
          defaultValue={limit}
          className="w-fit bg-transparent text-sm rounded-lg border p-1"
          onChange={(e) => setLimit(e.target.value)}
        >
          {['25', '50', '100', '200'].map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
