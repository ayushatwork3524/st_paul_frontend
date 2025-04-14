import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FormInput } from "../../../components/ui/FormInput";

export const UpdateGuardianModal = ({ isOpen, onClose, guardian, onSave }) => {
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
    setUpdatedStudent({ ...guardian });
  }, [guardian]);

  const handleChange = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!updatedStudent.name) {
      newErrors.name = "Name is required";
    }

    if (!updatedStudent.phone) {
      newErrors.phone = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(updatedStudent.phone)) {
      newErrors.phone = "Enter a valid 10-digit Mobile Number";
    }

    if (!updatedStudent.occupation) {
      newErrors.occupation = "Occupation is required";
    }

    if (!updatedStudent.relation) {
      newErrors.relation = "Relation is required";
    }

    if (!updatedStudent.income) {
      newErrors.income = "Income is required";
    } else if (isNaN(updatedStudent.income) || updatedStudent.income < 0) {
      newErrors.income = "Income must be a valid positive number";
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
            <RxCross2
              onClick={onClose}
              size={24}
              className="cursor-pointer transform hover:text-red-600 hover:scale-110"
            />
          </div>

          <div
            className="flex flex-col gap-10 px-2 overflow-auto"
            style={{ height: contentHeight }}
          >
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="Name"
                type="text"
                name="name"
                value={updatedStudent.name || ""}
                onChange={handleChange}
                placeholder="Name"
                error={errors.name}
              />
              <FormInput
                isRequired
                label="Mobile Number"
                type="text"
                name="phone"
                value={updatedStudent.phone || ""}
                onChange={handleChange}
                placeholder="Mobile Number"
                error={errors.phone}
              />
              <FormInput
                isRequired
                label="Occupation"
                type="text"
                name="occupation"
                value={updatedStudent.occupation || ""}
                onChange={handleChange}
                placeholder="Occupation"
                error={errors.occupation}
              />
              <FormInput
                isRequired
                label="Relation"
                type="text"
                name="relation"
                value={updatedStudent.relation || ""}
                onChange={handleChange}
                placeholder="Relation"
                error={errors.relation}
              />
              <FormInput
                isRequired
                label="Income"
                type="text"
                placeholder="Income"
                name="income"
                value={updatedStudent.income || ""}
                onChange={handleChange}
                error={errors.income}
              />
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
