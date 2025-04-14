import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FormInput } from "../../../components/ui/FormInput";

export const UpdateBankModal = ({ isOpen, onClose, bankDetail, onSave }) => {
  const [updatedBank, setUpdatedBank] = useState({});
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
    setUpdatedBank({ ...bankDetail });
  }, [bankDetail]);

  const handleChange = (e) => {
    setUpdatedBank({
      ...updatedBank,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!updatedBank.bankName?.trim()) {
      newErrors.bankName = "Bank Name is required";
    }

    if (!updatedBank.branchName?.trim()) {
      newErrors.branchName = "Branch Name is required";
    }

    if (!updatedBank.accountNo?.trim()) {
      newErrors.accountNo = "Account Number is required";
    } else if (!/^\d{9,18}$/.test(updatedBank.accountNo)) {
      newErrors.accountNo = "Enter a valid 9-18 digit Account Number";
    }

    if (!updatedBank.ifscCode?.trim()) {
      newErrors.ifscCode = "IFSC Code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(updatedBank.ifscCode)) {
      newErrors.ifscCode = "Enter a valid IFSC Code (e.g., SBIN0001234)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(updatedBank);
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
              Update Bank Details
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
                label="Bank Name"
                type="text"
                name="bankName"
                value={updatedBank.bankName || ""}
                onChange={handleChange}
                placeholder="Bank Name"
                error={errors.bankName}
              />
              <FormInput
                isRequired
                label="Bank Branch"
                type="text"
                name="branchName"
                value={updatedBank.branchName || ""}
                onChange={handleChange}
                placeholder="Bank Branch"
                error={errors.branchName}
              />
              <FormInput
                isRequired
                label="Account Number"
                type="text"
                name="accountNo"
                value={updatedBank.accountNo || ""}
                onChange={handleChange}
                placeholder="Account Number"
                error={errors.accountNo}
              />
              <FormInput
                isRequired
                label="IFSC Code"
                type="text"
                name="ifscCode"
                value={updatedBank.ifscCode || ""}
                onChange={handleChange}
                placeholder="IFSC Code (e.g., SBIN0001234)"
                error={errors.ifscCode}
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
