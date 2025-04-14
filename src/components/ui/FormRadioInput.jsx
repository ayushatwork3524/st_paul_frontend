export const FormRadioInput = ({
  values,
  labels,
  label,
  isRequired,
  error,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        {values?.map((value, index) => {
          return (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={name}
                value={value}
                checked={selectedValue === value}
                onChange={onChange}
                className="w-4 h-4"
              />
              <span>{labels[index]}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
