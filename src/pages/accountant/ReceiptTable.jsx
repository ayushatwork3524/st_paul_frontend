import { FixedSizeList as List } from "react-window";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NoData } from "../../components/ui/NoData";
import { useNavigate } from "react-router-dom";
import { encodeId } from "../../security/secureuri/SecureUri";

export const ReceiptTable = ({ receiptData }) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.6);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.6);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!receiptData || receiptData.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <NoData content="No data found" />
      </div>
    );
  }

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

  const Row = ({ index, style }) => {
    const receipt = receiptData[index];
    return (
      <div style={{ ...style, display: "flex", width: "100%" }}>
        <table className="w-full table-fixed ">
          <tbody>
            <tr
              onClick={() =>
                navigate(`/user/receipt/${encodeId(receipt?.receiptNo)}`)
              }
              className="cursor-pointer shadow-sm hover:bg-blue-600/20 transition text-sm md:text-base"
            >
              <td className="p-2 md:p-3 truncate">
                {receipt?.receiptNo || "-"}
              </td>
              <td className="p-2 md:p-3 truncate">{receipt?.session || "-"}</td>
              <td className="p-2 md:p-3 truncate">{receipt?.name || "-"}</td>
              <td className="p-2 md:p-3 truncate">
                {receipt?.stdClass || "-"}
              </td>
              <td className="p-2 md:p-3 truncate">
                {receipt?.admissionNo || "-"}
              </td>
              <td className="p-2 md:p-3 truncate">
                {formatDate(receipt?.date)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      {/* Table Header */}
      <div className="w-full overflow-hidden">
        <table className="w-full rounded-lg table-fixed">
          <thead className="bg-white text-gray-700 uppercase text-xs md:text-sm">
            <tr className="sticky top-0 bg-white shadow-sm">
              <th className="p-2 md:p-3 text-left ">Receipt No.</th>
              <th className="p-2 md:p-3 text-left ">Session</th>
              <th className="p-2 md:p-3 text-left ">Name</th>
              <th className="p-2 md:p-3 text-left ">Std</th>
              <th className="p-2 md:p-3 text-left ">Admission No</th>
              <th className="p-2 md:p-3 text-left ">Date</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Virtualized List */}
      <div className="w-full" style={{ height: `${listHeight}px` }}>
        <List
          height={listHeight}
          itemCount={receiptData.length}
          itemSize={50}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
};
