import { useNavigate, useParams } from "react-router-dom";
import { DetailsTable } from "../common/studentDetail/DetailsTable";
import { BsArrowLeftCircle } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineSimCardDownload } from "react-icons/md";
import { decodeId } from "../../security/secureuri/SecureUri";

export const ReceiptDetail = () => {
  const navigate = useNavigate();
  const { receiptNo } = useParams();

  const id = decodeId(receiptNo);

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    if (isNaN(date)) return "-";

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const receipt = {
    receiptNo: 522,
    date: formatDate("2025-03-03"),
    name: "Ayush Narule",
    stdClass: "5",
    section: "A",
    AdmissionNo: 5522,
    session: "2024-2025",
    installment: "3",
    dueDate: formatDate("2025-12-03"),
    total: 9000,
    fine: null,
    grandTotal: 9000,
    particulars: [
      "Admission Fees",
      "Prospectus Fees",
      "Tuition Fees",
      "Previous Fees",
      "Other Fee",
    ],
  };

  const detailData = [
    { label: "Receipt No.", value: receipt.receiptNo },
    { label: "Date", value: receipt.date },
    { label: "Name", value: receipt.name },
    { label: "Class", value: `${receipt.stdClass} - ${receipt.section}` },
    { label: "Admission No", value: receipt.AdmissionNo },
    { label: "Session", value: receipt.session },
    { label: "Installment", value: receipt.installment },
    { label: "Due Date", value: receipt.dueDate },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between p-6 bg-white sticky top-0 w-full">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer text-blue-600"
        >
          <BsArrowLeftCircle size={30} />
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-semibold font-serif">Detail</h1>
        </div>

        <div className="flex gap-2">
          <button
            // onClick={handleDelete}
            className="flex items-center cursor-pointer gap-2 p-2 border rounded-md border-red-400 text-red-500 font-medium uppercase hover:bg-red-100 transition"
          >
            <MdDeleteOutline size={24} />
            <span>Delete</span>
          </button>
          <button
            // onClick={handleDelete}
            className="flex items-center cursor-pointer gap-2 p-2 border rounded-md border-blue-400 text-blue-500 font-medium uppercase hover:bg-blue-100 transition"
          >
            <MdOutlineSimCardDownload size={24} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* General Details Table */}
      <div className="p-5">
        <DetailsTable detailData={detailData} />
      </div>

      {/* Particulars Table */}
      <div className="mt-5 px-5">
        <h3 className="text-lg font-semibold mb-2">Particulars</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300">Sr No.</th>
              <th className="p-2 border border-gray-300">Fee Type</th>
              <th className="p-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {receipt.particulars.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="p-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {item}
                </td>
                {index === 0 && (
                  <td
                    className="p-2 border border-gray-300 text-center align-middle"
                    rowSpan={receipt.particulars.length}
                  >
                    ₹9000
                  </td>
                )}
              </tr>
            ))}

            <tr className="bg-gray-100 font-semibold">
              <td className="p-2 border border-gray-300 text-right" colSpan="2">
                Total Fees:
              </td>
              <td className="p-2 border border-gray-300 text-center">
                ₹{receipt.total}
              </td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td className="p-2 border border-gray-300 text-right" colSpan="2">
                Fine:
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {receipt.fine ? `₹${receipt.fine}` : "-"}
              </td>
            </tr>
            <tr className="bg-gray-200 font-bold">
              <td className="p-2 border border-gray-300 text-right" colSpan="2">
                Grand Total:
              </td>
              <td className="p-2 border border-gray-300 text-center text-green-700">
                ₹{receipt.grandTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
