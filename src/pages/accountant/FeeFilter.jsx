import { Input } from "../../components/ui/Input";

export const FeeFilter = ({ filter, setFilter, onFilterChange }) => {
  const handleChange = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value === "" ? undefined : value,
    }));
    onFilterChange();
  };

  return (
    <div className="w-[80%] mx-auto">
      <Input
        type="search"
        className="w-24"
        label="stdClass"
        value={filter.stdClass}
        onChange={(e) => handleChange("stdClass", e.target.value)}
        placeholder="Search By Class Number"
      />
    </div>
  );
};
