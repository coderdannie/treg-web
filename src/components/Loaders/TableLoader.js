const TableSkeleton = ({ headers }) => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {headers.map((_, cellIndex) => (
            <td key={cellIndex} className="whitespace-nowrap px-6 py-4">
              <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
