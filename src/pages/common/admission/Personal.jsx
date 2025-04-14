import { useEffect, useState } from "react";
import { FormInput } from "../../../components/ui/FormInput";
import { FormRadioInput } from "../../../components/ui/FormRadioInput";
import { FormSelect } from "../../../components/ui/FormSelect";
import { FormTextArea } from "../../../components/ui/FormTextArea";
import { CiCalendarDate } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Personal = ({
  errors,
  personalData,
  setPersonalData,
  setImage,
}) => {
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
  const [date, setDate] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDateTime = (dateObj) => {
    const now = dateObj || new Date();
    return (
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0")
    );
  };

  useEffect(() => {
    if (personalData.dateOfBirth) {
      setDate(new Date(personalData.dateOfBirth));
    }
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setPersonalData((prev) => ({
      ...prev,
      dateOfBirth: formatDateTime(selectedDate),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* row 1 */}
      <div className="flex justify-between gap-2">
        <FormInput
          value={personalData.firstName}
          error={errors.firstName}
          isRequired={true}
          onChange={handleInputChange}
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <FormInput
          value={personalData.fatherName}
          error={errors.fatherName}
          isRequired={true}
          onChange={handleInputChange}
          name="fatherName"
          label="Father Name"
          placeholder="Father Name"
        />
        <FormInput
          value={personalData.surname}
          error={errors.surname}
          isRequired={true}
          onChange={handleInputChange}
          name="surname"
          label="Last Name"
          placeholder="Last Name"
        />
      </div>

      {/* row 2 */}
      <div className="flex justify-between gap-2">
        <FormInput
          value={personalData.motherName}
          isRequired={true}
          error={errors.motherName}
          onChange={handleInputChange}
          name="motherName"
          label="Mother Name"
          placeholder="Mother Name"
        />
        <FormInput
          value={personalData.email}
          error={errors.email}
          onChange={handleInputChange}
          name="email"
          isRequired={true}
          type="email"
          label="Email"
          placeholder="Email"
        />
        <FormInput
          value={personalData.phoneNo}
          error={errors.phoneNo}
          isRequired={true}
          onChange={handleInputChange}
          name="phoneNo"
          label="Mobile Number"
          placeholder="Mobile Number"
        />
      </div>

      {/* row 3 */}
      <div className="flex justify-between gap-2">
        <FormRadioInput
          name="gender"
          isRequired={true}
          selectedValue={personalData.gender}
          label="Gender"
          values={["male", "female"]}
          error={errors.gender}
          onChange={handleInputChange}
          labels={["Male", "Female"]}
        />
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="date" className="text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative flex w-full items-center">
            <CiCalendarDate
              size={24}
              className="absolute left-3 text-gray-800"
            />
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              onKeyDown={(e) => e.preventDefault()}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              placeholderText="Select Date"
              className="w-full pl-10 pr-3 py-2 cursor-pointer rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
          )}
        </div>
        <FormInput
          value={personalData.caste}
          isRequired={true}
          error={errors.caste}
          onChange={handleInputChange}
          name="caste"
          label="Caste"
          placeholder="Caste"
        />
      </div>

      {/* row 4 */}
      <div className="flex justify-between gap-2">
        <FormSelect
          value={personalData.category}
          isRequired={true}
          error={errors.category}
          onChange={handleInputChange}
          label="Category"
          name="category"
          options={categories}
        />
        <FormSelect
          value={personalData.scholarshipCategory}
          error={errors.scholarshipCategory}
          onChange={handleInputChange}
          isRequired={true}
          label="Scholarship Category"
          name="scholarshipCategory"
          options={scholarshipCategories}
        />

        <FormInput
          type="file"
          onChange={handleImageChange}
          name="image"
          error={errors.image}
          label="Profile Photo"
          accept="image/*"
        />
      </div>

      {/* row 5 */}
      <div className="flex justify-between gap-2">
        <div className="flex flex-col w-full">
          <FormInput
            value={personalData.adharNo}
            error={errors.adharNo}
            onChange={handleInputChange}
            name="adharNo"
            isRequired={true}
            label="Adhar Number"
            placeholder="Adhar Number"
          />
          <FormInput
            value={personalData.bloodGroup}
            error={errors.bloodGroup}
            onChange={handleInputChange}
            name="bloodGroup"
            label="Blood Group"
            placeholder="Blood Group"
          />
        </div>
        <FormTextArea
          value={personalData.localAddress}
          error={errors.localAddress}
          onChange={handleInputChange}
          name="localAddress"
          isRequired={true}
          label="Present Address"
          rows={4}
          placeholder="Present Address"
        />
        <FormTextArea
          value={personalData.permanentAddress}
          error={errors.permanentAddress}
          onChange={handleInputChange}
          name="permanentAddress"
          isRequired={true}
          label="Permanent Address"
          rows={4}
          placeholder="Permanent Address"
        />
      </div>
    </div>
  );
};
