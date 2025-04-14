import { format } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExamMonthPicker = ({ value, onChange, error, isRequired }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="font-semibold">
        Exam Month {isRequired && <span className="text-red-500">*</span>}
      </label>

      <DatePicker
        required={isRequired}
        selected={value ? new Date(value) : null} // Ensure it's a Date object
        onChange={(date) =>
          onChange({
            target: {
              name: "examMonth",
              value: format(date, "MMMM yyyy"),
            },
          })
        }
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        placeholderText="Select Exam Month"
        className="px-4 py-2 w-full placeholder:text-sm placeholder:select-none border border-white focus:border-blue-500 focus:outline-none bg-gray-200 rounded-md"
        onKeyDown={(e) => e.preventDefault()}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => {
          const currentYear =
            date instanceof Date
              ? date.getFullYear()
              : new Date().getFullYear(); // Ensures a valid Date object

          return (
            <div className="flex items-center justify-between px-2 py-1">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                &lt;
              </button>
              <select
                value={currentYear}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className="mx-2 bg-gray-200 border rounded-md"
              >
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - 5 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                &gt;
              </button>
            </div>
          );
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ExamMonthPicker;
