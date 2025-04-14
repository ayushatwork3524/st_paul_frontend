import { FixedSizeList as List } from "react-window";
import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Importing icons
import { NoData } from "./NoData";
import { deleteFeesService } from "../../service/SuperAdminService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";
import { getClassSuffix } from "../../uitl/Util";
import { openPopup } from "../../redux/store/PopupSlice";

export const FeesTable = ({ feesData, onEdit }) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.6);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.6);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!feesData || feesData.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <NoData content="No data found" />
      </div>
    );
  }

  const onDelete = async (selectedId) => {
    dispatch(
      openPopup({
        title: "Delete Confirmation",
        message: "Are you sure you want to delete this student?",
        confirmText: "Yes, Delete",
        cancelText: "Cancel",
        functionKey: "deleteFees",
        functionParams: [selectedId],
      })
    );
  };

  const Row = ({ index, style }) => {
    const fee = feesData[index];
    return (
      <div
        style={{
          ...style,
          display: "table",
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <table className="w-full table-fixed">
          <tbody>
            <tr className="cursor-pointer shadow-sm transition text-sm md:text-base">
              <td
                title={fee?.stdClass}
                className="p-2 md:p-3 truncate max-w-[120px]"
              >
                {/* {getClassSuffix(fee?.stdClass) || "-"} */}
                {fee?.stdClass || "-"}
              </td>
              <td
                title={fee?.totalFees}
                className="p-2 md:p-3 truncate max-w-[100px]"
              >
                ₹{fee?.totalFees || "-"}
              </td>
              <td
                title={fee?.installmentGap}
                className="p-2 md:p-3 truncate max-w-[100px]"
              >
                {fee?.installmentGap || "-"}
              </td>
              <td
                title={fee?.installmentsAmount}
                className="p-2 md:p-3 truncate max-w-[300px]"
              >
                ₹{fee?.installmentsAmount || "-"}
              </td>
              {/* Action Column */}
              <td className="p-2 md:p-3 flex items-center space-x-5">
                <button
                  title="update"
                  onClick={() => onEdit(fee)}
                  className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                >
                  <AiOutlineEdit size={25} />
                </button>
                <button
                  title="delete"
                  onClick={() => onDelete(fee?.id)}
                  className="text-red-600 cursor-pointer hover:text-red-800 transition"
                >
                  <AiOutlineDelete size={25} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full overflow-hidden">
        <table className="w-full rounded-lg table-fixed">
          <thead className="bg-white text-gray-700 uppercase text-xs md:text-sm">
            <tr className="sticky top-0 bg-white shadow-sm">
              <th className="p-2 md:p-3 truncate text-left min-w-[120px]">
                Class
              </th>
              <th className="p-2 md:p-3 truncate text-left min-w-[100px]">
                Total Fees
              </th>
              <th className="p-2 md:p-3 truncate text-left min-w-[100px]">
                Installments
              </th>
              <th className="p-2 md:p-3 truncate text-left min-w-[300px]">
                Installment Amount
              </th>
              <th className="p-2 md:p-3 truncate text-left min-w-[100px]">
                Action
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="w-full" style={{ height: `${listHeight}px` }}>
        <List
          height={listHeight}
          itemCount={feesData.length}
          itemSize={50}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
};
