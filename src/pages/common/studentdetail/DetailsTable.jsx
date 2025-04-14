import React from "react";

export const DetailsTable = ({ detailData }) => {
  const chunkArray = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (
        i % size ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc
      ),
      []
    );
  };
  const rows = chunkArray(detailData, 2);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {row.map((item, index) => (
                <React.Fragment key={index}>
                  <td className="border border-gray-300 p-2 font-semibold text-gray-700">
                    {item.label}
                  </td>
                  <td className="border border-gray-300 p-2 text-black">
                    {item.value}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
