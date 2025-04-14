import React from "react";
import { HiPencilSquare } from "react-icons/hi2";

export const AcademicsDetail = ({ detailData }) => {
  if (!detailData) return null;

  const formattedData = [
    { label: "College Name", value: detailData.collegeName ?? "-" },
    { label: "Class", value: detailData.stdClass ?? "-" },
    { label: "Section", value: detailData.section ?? "-" },
    { label: "Stream", value: detailData.stream?.stream ?? "-" },
    { label: "Sub Stream", value: detailData.stream?.subStream ?? "-" },
    { label: "Medium", value: detailData.stream?.medium ?? "-" },
    { label: "Result", value: detailData.result ?? "-" },
    { label: "Examination", value: detailData.examination ?? "-" },
    { label: "Marks Obtained", value: detailData.marksObtained ?? "-" },
    { label: "Roll No", value: detailData.rollNo ?? "-" },
    { label: "Exam Month", value: detailData.examMonth ?? "-" },
    { label: "Status", value: detailData.status ?? "-" },
    { label: "Promotion Date", value: detailData.promotionDate ?? "-" },
    {
      label: "Biofocal Subject",
      value: detailData.biofocalSubject
        ? `${detailData.biofocalSubject.subStream} - ${detailData.biofocalSubject.subject}`
        : "-",
    },
    {
      label: "Subjects",
      value:
        detailData.stream?.subjects
          ?.map((subject) => subject.name)
          .join(", ") ?? "-",
    },
  ].filter((item) => item.value !== "-");

  const chunkArray = (arr, size) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];

    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push([arr[i]]);
      else acc[acc.length - 1].push(arr[i]);
      return acc;
    }, []);
  };

  const rows = chunkArray(formattedData, 2);

  return (
    <div className="overflow-x-auto flex flex-col gap-2 mt-5">
      <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {row.map((item, index) => (
                <React.Fragment key={index}>
                  <td className="border border-gray-300 p-3 font-semibold text-gray-700">
                    {item.label}
                  </td>
                  <td
                    className={`border border-gray-300 p-3 ${
                      item.label === "Status"
                        ? item.value.toLowerCase() === "pending"
                          ? "text-red-500 uppercase font-medium"
                          : item.value.toLowerCase() === "ongoing"
                          ? "text-green-500 uppercase font-medium"
                          : "text-black uppercase font-medium"
                        : "text-black"
                    } `}
                  >
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
