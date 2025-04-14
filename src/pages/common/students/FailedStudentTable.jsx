import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { NoData } from "../../../components/ui/NoData";
import { getClassSuffix } from "../../../uitl/Util";
import { TableLoader } from "../../../components/ui/loaders/TableLoader";

export const FailedStudentTable = ({
  students,
  isLoading,
  onTouch,
  onPromote,
  isPromotable,
}) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.75);
  const [selectedStudents, setSelectedStudents] = useState([]);

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
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const cancelSelection = () => {
    setSelectedStudents([]); // Clears selected students
  };

  const handleDelete = () => {
    console.log(selectedStudents);
    cancelSelection();
  };

  const Row = ({ index, style }) => {
    const student = students[index];
    const isSelected = selectedStudents.includes(student?.studentId);

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
              className={`cursor-pointer shadow-sm transition text-sm md:text-base ${
                isSelected ? "bg-blue-600/20" : "hover:bg-blue-600/20"
              }`}
              onClick={() => onTouch(student?.studentId)}
            >
              {isPromotable && (
                <td className="p-2 md:p-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isSelected}
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
                title={student?.studentAcademics?.[0]?.result?.toUpperCase()}
                className={`p-2 md:p-3 font-medium truncate max-w-[140px] ${
                  student?.studentAcademics?.[0]?.result?.toUpperCase() ===
                  "FAIL"
                    ? "text-red-500"
                    : student?.studentAcademics?.[0]?.result?.toUpperCase() ===
                      "PASS"
                    ? "text-green-500"
                    : "text-gray-700"
                }`}
              >
                {student?.studentAcademics?.[0]?.result?.toUpperCase() || "-"}
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
          <div className="flex justify-start items-center mb-2">
            {isPromotable && (
              <div className="flex justify-between w-full">
                <div className="flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
                    onClick={() => onPromote(selectedStudents)}
                    disabled={selectedStudents.length === 0}
                  >
                    Promote Selected ({selectedStudents.length})
                  </button>
                  {selectedStudents.length > 0 && (
                    <button
                      className="bg-red-600 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-red-700"
                      onClick={cancelSelection}
                    >
                      Cancel Selection
                    </button>
                  )}
                </div>
                {selectedStudents.length > 0 && (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="w-full overflow-hidden">
            <table className="w-full rounded-lg table-fixed">
              <thead className="bg-white text-gray-700 uppercase text-xs md:text-sm">
                <tr className="sticky top-0 bg-white shadow-sm">
                  {isPromotable && (
                    <th className="p-2 md:p-3 text-left min-w-[40px]">
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
                  <th className="p-2 md:p-3 text-left min-w-[120px]">Result</th>
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
