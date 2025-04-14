import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FormInput } from "../../../components/ui/FormInput";
import { FormSelect } from "../../../components/ui/FormSelect";
import ExamMonthPicker from "../../../components/ui/ExamMonthPicker";

export const UpdateLastSchoolModal = ({
  isOpen,
  onClose,
  lastSchool,
  onSave,
}) => {
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [errors, setErrors] = useState({});
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.9);
  const [contentHeight, setContentHeight] = useState(window.innerHeight * 0.6);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.9);
      setContentHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setUpdatedStudent({ ...lastSchool });
  }, [lastSchool]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict marksObtained to integer input only
    if (name === "marksObtained") {
      if (!/^\d*$/.test(value)) return; // Allow only digits
    }

    setUpdatedStudent({
      ...updatedStudent,
      [name]: value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!updatedStudent.collegeName) {
      newErrors.collegeName = "School/College Name is required";
    }
    if (!updatedStudent.uid) {
      newErrors.uid = "U Dise Number is required";
    }
    if (!updatedStudent.examination) {
      newErrors.examination = "Examination is required";
    }
    if (!updatedStudent.rollNo) {
      newErrors.rollNo = "Roll Number is required";
    }

    if (!updatedStudent.marksObtained) {
      newErrors.marksObtained = "Marks Obtained is required";
    } else {
      const marks = Number(updatedStudent.marksObtained);
      if (!Number.isInteger(marks) || marks < 0) {
        newErrors.marksObtained = "Marks must be a valid positive integer";
      }
    }

    if (!updatedStudent.result) {
      newErrors.result = "Result is required";
    }
    if (!updatedStudent.examMonth) {
      newErrors.examMonth = "Exam Month is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(updatedStudent);
      onClose();
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
              Update Last School/College Details
            </h2>
            <RxCross2 onClick={onClose} size={24} className="cursor-pointer" />
          </div>

          <div
            className="flex flex-col gap-10 px-2 overflow-auto"
            style={{ height: contentHeight }}
          >
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="School/College Name"
                type="text"
                name="collegeName"
                value={updatedStudent.collegeName || ""}
                onChange={handleChange}
                placeholder="School/College Name"
                error={errors.collegeName}
              />
              <FormInput
                isRequired
                label="U Dise Number"
                type="text"
                name="uid"
                value={updatedStudent.uid || ""}
                onChange={handleChange}
                placeholder="U Dise Number"
                error={errors.uid}
              />
              <FormInput
                isRequired
                label="Examination"
                type="text"
                name="examination"
                value={updatedStudent.examination || ""}
                onChange={handleChange}
                placeholder="Examination"
                error={errors.examination}
              />
              <FormInput
                isRequired
                label="Roll Number"
                type="text"
                name="rollNo"
                value={updatedStudent.rollNo || ""}
                onChange={handleChange}
                placeholder="Roll Number"
                error={errors.rollNo}
              />
            </div>
            <div className="flex gap-3 w-full">
              <ExamMonthPicker
                value={updatedStudent.examMonth || ""}
                error={errors.examMonth}
                onChange={handleChange}
              />
              <FormInput
                isRequired
                label="Marks Obtained"
                type="text"
                name="marksObtained"
                value={updatedStudent.marksObtained || ""}
                onChange={handleChange}
                error={errors.marksObtained}
              />
              <FormSelect
                isRequired
                label="Result"
                options={["PASS", "FAIL", "ATKT"]}
                name="result"
                value={updatedStudent.result || ""}
                onChange={handleChange}
                error={errors.result}
              />
              <div className="w-full"></div>
            </div>
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
