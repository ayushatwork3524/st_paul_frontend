import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { NoData } from "../../components/ui/NoData";
import { TableLoader } from "../../components/ui/loaders/TableLoader";
import { FaAmazonPay } from "react-icons/fa";

export const StudentTableForFees = ({ students, isLoading, onTouch }) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.8);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.8);
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
              className="cursor-pointer shadow-sm transition text-sm md:text-base"
              onClick={() => onTouch(student?.studentId)}
            >
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
              <td
                className="p-2 md:p-3 truncate max-w-[120px]"
                title="Add Payment"
              >
                <p>
                  <FaAmazonPay
                    size={30}
                    className="cursor-pointer text-gray-800 hover:text-gray-900 transition transform hover:scale-120"
                    // onClick={() =>
                    //   handleClick(
                    //     student?.studentId,
                    //     student?.academicId,
                    //     student?.stdClass,
                    //     student?.totalFees
                    //   )
                    // }
                  />
                </p>
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
            <table className="w-full rounded-lg table-fixed">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                <tr className="sticky top-0 bg-gray-100 shadow-sm">
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
                  <th className="p-2 md:p-3 text-left min-w-[120px]">Action</th>
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
