import { useState, useRef } from "react";
import {
  downloadRawExcelService,
  uploadExcelService,
} from "../../../service/ManagerService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";

export const Import = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateFile(selectedFile);
  };

  const validateFile = (file) => {
    if (!file) return;
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Only Excel files are allowed");
      setFile(null);
    } else {
      setError("");
      setFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const handleClick = (event) => {
    if (event.target.tagName !== "BUTTON") {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (event) => {
    event.stopPropagation();

    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadExcelService(formData);

    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.success(res?.message);
      }, 1000);
    } else {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.error(res?.message);
      }, 1000);
      return;
    }

    setFile(null);
    fileInputRef.current.value = "";
  };

  const handleDownload = async () => {
    try {
      dispatch(setLoading(true));

      const res = await downloadRawExcelService();

      if (res.status === 200) {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Extract filename from Content-Disposition
        const disposition = res.headers["content-disposition"];
        let filename = "raw.xlsx";
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

  return (
    <div className="w-full h-full flex flex-col gap-2 p-6">
      <div className="flex justify-end items-center w-full px-5">
        <div
          onClick={handleDownload}
          className="border border-gray-600 hover:border-blue-700 hover:text-blue-600 cursor-pointer flex items-center gap-2 rounded-md p-2 justify-center"
        >
          <p>Download Raw Excel</p>
          <button className=" cursor-pointer gap-2 rounded-md   text-blue-500 hover:bg-blue-100 transition">
            <FaDownload size={20} />
          </button>
        </div>
      </div>
      <div
        className="flex flex-col  gap-5 justify-center items-center w-full h-full border-2 border-dashed border-gray-300 cursor-pointer bg-white"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <img src="/import.jpg" alt="import" width={300} />
        <p className="text-gray-600">
          Drag & Drop an Excel file here or click to select
        </p>
        <input
          type="file"
          name="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {file && (
          <>
            <p className="text-green-600">Selected File: {file.name}</p>
            <button
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleUpload}
            >
              Upload
            </button>
          </>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};
