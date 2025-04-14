import { FixedSizeList as List } from "react-window";
import { useEffect, useState } from "react";
import { getClassSuffix } from "../../uitl/Util";
import { TableLoader } from "../../components/ui/loaders/TableLoader";
import { NoData } from "../../components/ui/NoData";
import { MdCurrencyExchange } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { Payment } from "../common/admission/Payment";

export const PendingTable = ({ students, isLoading }) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.75);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    academicId: "",
    stdClass: "",
    totalFees: 0.0,
  });

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

  const handleClick = (id, academicId, stdClass, totalFees) => {
    setSelectedStudent((prev) => ({
      ...prev,
      id,
      academicId,
      stdClass,
      totalFees,
    }));
    setIsModalOpen(true);
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
              //   onClick={() => onTouch(student?.studentId)}
              className="shadow-sm  transition text-sm md:text-base"
            >
              <td
                className="p-2 md:p-3 truncate max-w-[120px]"
                title={student?.session || "-"}
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
                title={student?.dateOfAdmission || "-"}
              >
                {student?.dateOfAdmission || "-"}
              </td>
              <td
                className="p-2 md:p-3 max-w-[180px] truncate flex items-center gap-1"
                title={`${student?.firstName} ${student?.surName}`}
              >
                {/* <img
                  src={
                    student?.image
                      ? `data:image/jpeg;base64,${student.image}`
                      : "/student.jpg"
                  }
                  alt="student"
                  className="w-6 h-6 rounded-full object-cover"
                /> */}
                <span className="truncate">{`${student?.firstName} ${student?.surName}`}</span>
              </td>

              <td
                className="p-2 md:p-3 truncate max-w-[220px]"
                title={student?.email}
              >
                {student?.email}
              </td>
              <td
                className="p-2 md:p-3 truncate max-w-[140px]"
                title={student?.contact}
              >
                {student?.contact}
              </td>
              <td
                className="p-2 md:p-3 text-red-500 font-medium uppercase truncate max-w-[120px]"
                title={student?.status?.toUpperCase() || "-"}
              >
                {student?.status || "-"}
              </td>
              <td
                className="p-2 md:p-3 truncate max-w-[120px]"
                title="Add Payment"
              >
                <p>
                  <FaRegCheckSquare
                    size={24}
                    className="cursor-pointer text-green-400 hover:text-green-500"
                    onClick={() =>
                      handleClick(
                        student?.studentId,
                        student?.academicId,
                        student?.stdClass,
                        student?.totalFees
                      )
                    }
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
              <thead className="bg-white text-gray-700 uppercase text-xs md:text-sm">
                <tr className="sticky top-0 bg-white shadow-sm">
                  <th className="p-2 md:p-3 text-left min-w-[120px]">
                    Session
                  </th>
                  <th className="p-2 md:p-3 text-left min-w-[100px]">Class</th>
                  <th className="p-2 md:p-3 text-left min-w-[100px]">Date</th>
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
            <Payment
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              id={selectedStudent.id}
              academicId={selectedStudent.academicId}
              stdClass={selectedStudent.stdClass}
              totalFees={selectedStudent.totalFees}
            />
          </div>
        </>
      )}
    </div>
  );
};
