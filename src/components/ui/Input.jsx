export const Input = ({ type, label, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={label}
      value={value}
      onChange={onChange}
      id={label}
      placeholder={placeholder}
      className="px-4 py-2 w-full placeholder:text-sm placeholder:select-none focus:outline-none bg-gray-200 rounded-md"
    />
  );
};
