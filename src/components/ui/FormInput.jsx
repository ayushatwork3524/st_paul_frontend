export const FormInput = ({
  type,
  name,
  label,
  accept,
  value,
  isRequired,
  onChange,
  error,
  disabled,
  placeholder,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="ml-1">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type || "text"}
        name={name}
        accept={accept}
        value={value}
        disabled={disabled}
        onChange={onChange}
        id={label}
        placeholder={placeholder}
        className="px-4 py-2 w-full placeholder:text-sm placeholder:select-none border border-white focus:border-blue-500 focus:outline-none bg-gray-200 rounded-md"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
