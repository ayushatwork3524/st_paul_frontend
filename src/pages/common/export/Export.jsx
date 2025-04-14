import React, { useState } from "react";
import { Select } from "../../../components/ui/Select";
import { downloadExcelFileService } from "../../../service/ManagerService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getAllClassesService } from "../../../service/UserService";

export const Export = () => {
  const [section, setSection] = useState(undefined);
  const [className, setClassName] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const sessionOptions = Array.from(
    { length: 10 },
    (_, i) => `${currentYear - i}-${currentYear - i + 1}`
  );

  const handleExport = async () => {
    try {
      dispatch(setLoading(true));

      const res = await downloadExcelFileService(
        null,
        className,
        section,
        session
      );

      if (res.status === 200) {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Extract filename from Content-Disposition
        const disposition = res.headers["content-disposition"];
        let filename = "students.xlsx";
        if (disposition && disposition.includes("filename=")) {
          const match = disposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            filename = match[1];
          }
        }

        // Create a download link and click it
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        dispatch(setLoading(false));
        toast.success("Excel downloaded successfully!");
      } else {
        dispatch(setLoading(false));
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Export error:", error);
      dispatch(setLoading(false));
      toast.error("Something went wrong!");
    }
  };

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      return await getAllClassesService();
    },
  });

  return (
    <div className="flex flex-col p-6 gap-5 justify-center items-center w-full h-full">
      <img src="/export.jpg" alt="export" width={300} />

      <div className="flex gap-5">
        <div className="flex gap-1 h-10">
          <label
            htmlFor="className"
            className="uppercase text-gray-700 font-medium text-sm flex justify-center items-center"
          >
            Class:-
          </label>
          <Select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            options={["All", ...(classes || [])]}
          />
        </div>

        <div className="flex gap-1 h-10">
          <label
            htmlFor="section"
            className="uppercase text-gray-700 font-medium text-sm flex justify-center items-center"
          >
            Section:-
          </label>
          <Select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            options={["All", "A", "B", "C"]}
          />
        </div>

        <div className="flex gap-1 h-10">
          <label
            htmlFor="session"
            className="uppercase text-gray-700 font-medium text-sm flex justify-center items-center"
          >
            Session:-
          </label>
          <Select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            options={["All", ...(sessionOptions || [])]}
          />
        </div>
      </div>

      <button
        onClick={handleExport}
        className="px-4 py-2 mt-5 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export Excel
      </button>
    </div>
  );
};
