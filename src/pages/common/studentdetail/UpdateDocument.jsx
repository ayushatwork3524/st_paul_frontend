import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { RxCross2 } from "react-icons/rx";
import { updateStudentDocumentService } from "../../../service/ManagerService";
import { toast } from "react-toastify";

export const UpdateDocument = ({ isOpen, onClose, file, setFile, docId }) => {
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.9);
  const [contentHeight, setContentHeight] = useState(window.innerHeight * 0.6);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.9);
      setContentHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5 MB.");
        setFile(null);
        return;
      }
      setError("");
      setFile(file);
    }
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = (e) => handleFile(e.target.files[0]);
    input.click();
  };

  const handleSave = async () => {
    if (!file) {
      setError("Please select a valid PDF file.");
      return;
    }

    console.log("Uploading document:", file);
    const formData = new FormData();
    formData.append("document", file);
    dispatch(setLoading(true));

    const res = await updateStudentDocumentService(formData, docId);
    dispatch(setLoading(false));

    if (res?.statusCode === 200) {
      setTimeout(() => {
        toast.success(res?.message);
      }, 200);
      onClose();
    } else {
      setTimeout(() => {
        toast.error(res?.message);
      }, 200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div
        className="bg-white p-6 rounded-lg flex flex-col justify-between shadow-lg w-[95%]"
        style={{ height: listHeight }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between w-[98%] mx-auto">
            <h2 className="text-lg text-gray-800 mb-4 font-serif">
              Update Document
            </h2>
            <RxCross2
              onClick={onClose}
              size={24}
              className="cursor-pointer transform hover:text-red-600 hover:scale-110"
            />
          </div>

          <div
            className="flex-col gap-10 px-2 overflow-auto cursor-pointer border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center p-10"
            style={{ height: contentHeight }}
            onClick={handleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {file ? (
              <p className="text-gray-700">{file.name}</p>
            ) : (
              <p className="text-gray-500">Click or drag and drop a PDF here</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 cursor-pointer bg-gray-200 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
