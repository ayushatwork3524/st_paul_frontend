import React, { useEffect, useState } from "react";
import { FormInput } from "../../../components/ui/FormInput";
import { RxCross2 } from "react-icons/rx";
import { FormRadioInput } from "../../../components/ui/FormRadioInput";
import { FormTextArea } from "../../../components/ui/FormTextArea";
import { FormSelect } from "../../../components/ui/FormSelect";

export const UpdateStudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [errors, setErrors] = useState({});
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.9);
  const [contentHeight, setContentHeight] = useState(window.innerHeight * 0.6);

  const categories = [
    "OPEN",
    "SC",
    "ST",
    "OBC",
    "VJ",
    "NT-1",
    "NT-2",
    "NT-3",
    "SBC",
  ];

  const scholarshipCategories = [
    "GOI",
    "PTC",
    "EBC",
    "FREESHIP",
    "EX-SERVICEMAN",
    "FREEDOM FIGHTER",
    "FEES PAYING",
  ];

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.9);
      setContentHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setUpdatedStudent({ ...student });
  }, [student]);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value,
    });

    // Clear error on change
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate inputs
  const validate = () => {
    let newErrors = {};

    if (!updatedStudent.firstName)
      newErrors.firstName = "First Name is required";
    if (!updatedStudent.fatherName)
      newErrors.fatherName = "Father Name is required";
    if (!updatedStudent.surname) newErrors.surname = "Surname is required";

    if (!updatedStudent.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(updatedStudent.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!updatedStudent.phoneNo) {
      newErrors.phoneNo = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(updatedStudent.phoneNo)) {
      newErrors.phoneNo = "Mobile Number must be 10 digits";
    }

    if (!updatedStudent.gender) newErrors.gender = "Gender is required";

    if (!updatedStudent.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";

    if (!updatedStudent.adharNo) {
      newErrors.adharNo = "Aadhar Number is required";
    } else if (!/^\d{12}$/.test(updatedStudent.adharNo)) {
      newErrors.adharNo = "Aadhar Number must be 12 digits";
    }

    if (!updatedStudent.bloodGroup)
      newErrors.bloodGroup = "Blood Group is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle save
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
              Update Personal Details
            </h2>
            <RxCross2
              onClick={onClose}
              size={24}
              className="cursor-pointer transform hover:text-red-600 hover:scale-110"
            />
          </div>

          {/* Form Fields */}
          <div
            className="flex flex-col gap-10 px-2 overflow-auto"
            style={{ height: contentHeight }}
          >
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="First Name"
                type="text"
                name="firstName"
                value={updatedStudent.firstName || ""}
                onChange={handleChange}
                placeholder="First Name"
                error={errors.firstName}
              />
              <FormInput
                isRequired
                label="Father Name"
                type="text"
                name="fatherName"
                value={updatedStudent.fatherName || ""}
                onChange={handleChange}
                placeholder="Father Name"
                error={errors.fatherName}
              />
              <FormInput
                isRequired
                label="Surname"
                type="text"
                name="surname"
                value={updatedStudent.surname || ""}
                onChange={handleChange}
                placeholder="Surname"
                error={errors.surname}
              />
              <FormInput
                isRequired
                label="Mother Name"
                type="text"
                name="motherName"
                value={updatedStudent.motherName || ""}
                onChange={handleChange}
                placeholder="Mother Name"
                error={errors.motherName}
              />
            </div>
            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="Email"
                type="email"
                name="email"
                value={updatedStudent.email || ""}
                onChange={handleChange}
                placeholder="Email"
                error={errors.email}
              />
              <FormInput
                isRequired
                label="Mobile Number"
                type="text"
                name="phoneNo"
                value={updatedStudent.phoneNo || ""}
                onChange={handleChange}
                placeholder="Mobile"
                error={errors.phoneNo}
              />
              <FormRadioInput
                isRequired
                label="Gender"
                labels={["Male", "Female"]}
                name="gender"
                values={["male", "female"]}
                onChange={handleChange}
                selectedValue={updatedStudent.gender}
                error={errors.gender}
              />
              <FormInput
                isRequired
                label="Caste"
                type="text"
                name="caste"
                value={updatedStudent.caste || ""}
                onChange={handleChange}
                placeholder="caste"
                error={errors.caste}
              />
            </div>

            <div className="flex gap-3 w-full">
              <FormInput
                isRequired
                label="Aadhar Number"
                type="text"
                name="adharNo"
                value={updatedStudent.adharNo || ""}
                onChange={handleChange}
                placeholder="Aadhar No."
                error={errors.adharNo}
              />
              <FormInput
                isRequired
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={updatedStudent.dateOfBirth || ""}
                onChange={handleChange}
                error={errors.dateOfBirth}
              />

              <FormInput
                isRequired
                label="Blood Group"
                type="text"
                name="bloodGroup"
                value={updatedStudent.bloodGroup || ""}
                onChange={handleChange}
                placeholder="Blood Group"
                error={errors.bloodGroup}
              />

              <FormSelect
                value={updatedStudent.category}
                isRequired={true}
                error={errors.category}
                onChange={handleChange}
                label="Category"
                name="category"
                options={categories}
              />
            </div>

            <div className="flex gap-3 w-full">
              <FormSelect
                value={updatedStudent.scholarshipCategory}
                error={errors.scholarshipCategory}
                onChange={handleChange}
                isRequired={true}
                label="Scholarship Category"
                name="scholarshipCategory"
                options={scholarshipCategories}
              />
              <FormTextArea
                isRequired
                label="Present Address"
                name="localAddress"
                rows={3}
                value={updatedStudent.localAddress || ""}
                onChange={handleChange}
                placeholder="Present Address"
                error={errors.localAddress}
              />
              <FormTextArea
                isRequired
                label="Permanent Address"
                name="permanentAddress"
                rows={3}
                value={updatedStudent.permanentAddress || ""}
                onChange={handleChange}
                placeholder="Permanent Address"
                error={errors.permanentAddress}
              />
              <div className="w-full"></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
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
