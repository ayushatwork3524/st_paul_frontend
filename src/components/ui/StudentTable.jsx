import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { NoData } from "./NoData";
import { TableLoader } from "./loaders/TableLoader";
import { useDispatch } from "react-redux";
import { openPopup } from "../../redux/store/PopupSlice";

export const StudentTable = ({ students, isLoading, onTouch, isDeletable }) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.75);
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.75);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!students || students.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <NoData content="No data found" />
      </div>
    );
  }

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cancelSelection = () => {
    setSelectedIds([]);
  };

  const deleteSelected = () => {
    dispatch(
      openPopup({
        title: "Delete Confirmation",
        message: "Are you sure you want to delete these students?",
        confirmText: "Yes, Delete",
        cancelText: "Cancel",
        functionKey: "deleteStudents",
        functionParams: [selectedIds],
      })
    );
  };

  const Row = ({ index, style }) => {
    const student = students[index];
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
            <tr
              key={student?.id}
              className={`cursor-pointer shadow-sm transition text-sm md:text-base hover:bg-blue-600/20 ${
                selectedIds.includes(student?.studentId) ? "bg-blue-100" : ""
              }`}
              onClick={() => onTouch(student?.studentId)}
            >
              {isDeletable && (
                <td
                  className="p-2 md:p-3 max-w-[120px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(student?.studentId)}
                    onChange={() => toggleSelect(student?.studentId)}
                  />
                </td>
              )}

              <td
                className="p-2 md:p-3 truncate max-w-[120px]"
                title={student?.session}
              >
                {student?.session || "-"}
              </td>
              <td
                className="p-2 md:p-3 truncate max-w-[100px]"
                title={student?.stdClass}
              >
                {/* {getClassSuffix(student?.stdClass) || "-"} */}
                {student?.stdClass || "-"}
              </td>
              <td
                className="p-2 md:p-3 truncate max-w-[100px]"
                title={student?.section}
              >
                {student?.section || "-"}
              </td>
              <td
                title={`${student?.firstName} ${student?.surname}`}
                className="p-2 md:p-3 max-w-[180px] flex items-center gap-1"
              >
                <img
                  src={
                    student?.image
                      ? `data:image/jpeg;base64,${student.image}`
                      : "/student.jpg"
                  }
                  alt="student"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="truncate">{`${student?.firstName} ${student?.surname}`}</span>
              </td>
              <td
                title={student?.email}
                className="p-2 md:p-3 truncate max-w-[220px]"
              >
                {student?.email}
              </td>
              <td
                title={student?.phoneNo}
                className="p-2 md:p-3 truncate max-w-[140px]"
              >
                {student?.phoneNo}
              </td>
              <td
                title={student?.status?.toUpperCase()}
                className={`p-2 md:p-3 truncate max-w-[120px] uppercase font-medium ${
                  student?.status?.toLowerCase() === "pending"
                    ? "text-red-500"
                    : student?.status?.toLowerCase() === "ongoing"
                    ? "text-green-500"
                    : "text-gray-700"
                }`}
              >
                {student?.status || "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-2 md:p-4 w-full h-full">
      {isLoading ? (
        <div className="w-full">
          <TableLoader />
        </div>
      ) : (
        <>
          <div className="w-full overflow-hidden">
            {selectedIds.length > 0 && (
              <div className="mb-2 flex gap-2">
                <button
                  onClick={deleteSelected}
                  className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-700"
                >
                  Delete ({selectedIds.length})
                </button>
                <button
                  onClick={cancelSelection}
                  className="bg-gray-300 text-gray-800 px-4 py-2 cursor-pointer rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}

            <table className="w-full rounded-lg table-fixed">
              <thead className="bg-white text-gray-700 uppercase text-xs md:text-sm">
                <tr className="sticky top-0 bg-white shadow-sm">
                  {isDeletable && (
                    <th className="p-2 md:p-3 text-left min-w-[120px]">
                      Select
                    </th>
                  )}
                  <th className="p-2 md:p-3 text-left min-w-[120px]">
                    Session
                  </th>
                  <th className="p-2 md:p-3 text-left min-w-[100px]">Class</th>
                  <th className="p-2 md:p-3 text-left min-w-[100px]">
                    Section
                  </th>
                  <th className="p-2 md:p-3 text-left min-w-[180px]">Name</th>
                  <th className="p-2 md:p-3 text-left min-w-[220px]">Email</th>
                  <th className="p-2 md:p-3 text-left min-w-[140px]">
                    Contact
                  </th>
                  <th className="p-2 md:p-3 text-left min-w-[120px]">Status</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="w-full" style={{ height: `${listHeight}px` }}>
            <List
              height={listHeight}
              itemCount={students.length}
              itemSize={50}
              width="100%"
            >
              {Row}
            </List>
          </div>
        </>
      )}
    </div>
  );
};
