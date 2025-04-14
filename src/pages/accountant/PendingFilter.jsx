import { useQuery } from "@tanstack/react-query";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { getAllClassesService } from "../../service/UserService";

export const PendingFilter = ({ filter, setFilter, onFilterChange }) => {
  // Generate session options (past 10 years)
  const currentYear = new Date().getFullYear();
  const sessionOptions = Array.from(
    { length: 10 },
    (_, i) => `${currentYear - i}-${currentYear - i + 1}`
  );

  // Update filter values and refetch data
  const handleChange = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value === "All" ? undefined : value,
    }));
    onFilterChange(); // Refetch on change
  };

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      return await getAllClassesService();
    },
  });

  return (
    <div className="flex w-full gap-5">
      {/* Search Input */}
      <div>
        <Input
          type="search"
          label="Search"
          placeholder="Search By Name or Email"
          value={filter.query}
          onChange={(e) => handleChange("query", e.target.value)}
        />
      </div>

      {/* Class Filter */}
      <div className="flex justify-center items-center gap-2">
        <label className="font-medium text-sm text-gray-700 uppercase">
          Class:-
        </label>
        <Select
          label="class"
          options={["All", ...classes]}
          value={filter.stdClass}
          onChange={(e) => handleChange("stdClass", e.target.value)}
        />
      </div>

      {/* Session Filter */}
      <div className="flex justify-center items-center gap-2">
        <label className="font-medium text-sm text-gray-700 uppercase">
          Session:-
        </label>
        <Select
          label="session"
          options={["All", ...sessionOptions]}
          value={filter.session}
          onChange={(e) => handleChange("session", e.target.value)}
        />
      </div>
    </div>
  );
};
