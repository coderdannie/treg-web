const TableSkeleton = ({ headers }) => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {headers.map((_, cellIndex) => (
            <td key={cellIndex} className="whitespace-nowrap px-6 py-4">
              <div className="skeleton h-8 w-full rounded-md bg-base-200"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
