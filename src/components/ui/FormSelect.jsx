export const FormSelect = ({
  label,
  name,
  value,
  options,
  isRequired,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="ml-1 mb-1 text-sm font-medium text-gray-700"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Dropdown */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 w-full bg-gray-200 rounded-md focus:outline-none`}
      >
        <option value="">Select an option</option>
        {options?.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const YearSelect = ({
  label,
  name,
  options,
  onChange,
  value,
  isRequired,
  error,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="ml-1 mb-0.5">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`px-4 py-2 w-full bg-gray-200 rounded-md focus:outline-none `}
      >
        <option value="" disabled>
          Select a session
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
