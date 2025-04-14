export const Select = ({ label, options, onChange, value }) => {
  return (
    <select
      name={label}
      onChange={onChange}
      value={value}
      className="px-4 py-1 w-full placeholder:select-none focus:outline-none bg-gray-200 rounded-md"
    >
      {options?.map((opt, index) => {
        return (
          <option key={index} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  );
};
