import React from "react";

const LeavingCertificatesTable = ({ leavingCertificates }) => {
  // Check if the array is empty or undefined
  if (!leavingCertificates || leavingCertificates.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No leaving certificates found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Sr. No.</th>
            <th className="border px-4 py-2">Copy Number</th>
            <th className="border px-4 py-2">Issue Date</th>
            <th className="border px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          {leavingCertificates.map((cert, index) => (
            <tr key={index} className="hover:bg-gray-50 text-center">
              <td className="border px-4 py-2">{cert.srNo}</td>
              <td className="border px-4 py-2">{cert.copyNumber}</td>
              <td className="border px-4 py-2">
                {new Date(cert.issueAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 text-blue-600 underline">
                <a
                  href={`data:application/pdf;base64,${cert.data}`}
                  download={`LeavingCertificate_${cert.srNo}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View / Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavingCertificatesTable;
