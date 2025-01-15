import React from 'react';

const Table = ({ headers, data }) => {
  return (
    <div className="w-100 shadow-lg rounded-lg">
      <table className="min-w-full table-auto border-collapse bg-white rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-semibold uppercase tracking-wide border-b border-blue-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-blue-100 transition duration-300"
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 border-b border-gray-200 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
