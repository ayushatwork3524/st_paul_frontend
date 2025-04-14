import { useEffect, useState } from "react";
import { FormInput } from "../../../components/ui/FormInput";
import { FormSelect, YearSelect } from "../../../components/ui/FormSelect";
import { Select } from "../../../components/ui/Select";
import { CiCalendarDate } from "react-icons/ci";
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";
import { getAllClassesService } from "../../../service/UserService";

export const Academic = ({ errors, formData, setFormData }) => {
  const currentYear = new Date().getFullYear();
  const sessionOptions = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!formData?.admissionDate) {
      setFormData((prevState) => ({
        ...prevState,
        admissionDate: formatDateTime(date),
      }));
    }

    if (!formData?.session) {
      const defaultSession = `${currentYear}-${currentYear + 1}`;
      setFormData((prevState) => ({
        ...prevState,
        session: defaultSession,
      }));
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      return await getAllClassesService();
    },
  });

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

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setFormData((prev) => ({
      ...prev,
      admissionDate: formatDateTime(selectedDate),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const sections = ["A", "B", "C"];

  return (
    <div className=" flex justify-between gap-2">
      <YearSelect
        label="Session"
        isRequired
        name="session"
        error={errors.session}
        value={formData.session}
        onChange={handleInputChange}
        options={sessionOptions.map((year) => `${year}-${year + 1}`)}
      />

      <FormInput
        label="Form Number"
        error={errors.formNo}
        name="formNo"
        isRequired
        value={formData.formNo}
        onChange={handleInputChange}
        placeholder="Form Number"
      />
      <FormSelect
        label="Class"
        error={errors.stdClass}
        name="stdClass"
        isRequired
        value={formData.stdClass}
        options={data}
        onChange={handleInputChange}
        placeholder="Class"
      />
      <div className="flex flex-col w-full">
        <label htmlFor="date">
          Date of Admission <span className="text-red-500">*</span>
        </label>
        <div className="relative flex w-full items-center">
          <CiCalendarDate size={24} className="absolute left-3 text-gray-800" />
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
        {errors.admissionDate && (
          <p className="text-red-500 text-sm">{errors.admissionDate}</p>
        )}
      </div>
    </div>
  );
};
