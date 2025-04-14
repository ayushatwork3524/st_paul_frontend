import { useQuery } from "@tanstack/react-query";
import { StudentTable } from "../../../components/ui/StudentTable";
import { Filters } from "./Filters";
import { useNavigate } from "react-router-dom";
import { getStudentsService } from "../../../service/UserService";
import { encodeId } from "../../../security/secureuri/SecureUri";
import { useState } from "react";

export const Students = () => {
  const [filter, setFilter] = useState({
    query: "",
    stdClass: undefined,
    section: undefined,
    session: undefined,
  });

  const navigate = useNavigate();

  // Fetch students with filters
  const {
    data: students,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", filter],
    queryFn: async () => {
      return await getStudentsService(filter);
    },
  });

  console.log(students);

  const handleClick = (id) => {
    return navigate(`/user/student/${encodeId(id)}`);
  };

  return (
    <div className="w-full p-6 overflow-hidden flex flex-col gap-2 h-full">
      <div className="px-5">
        {/* Pass filter and update function */}
        <Filters
          filter={filter}
          setFilter={setFilter}
          onFilterChange={refetch}
        />
      </div>
      <div className="w-full h-full">
        <StudentTable
          students={students}
          isLoading={isLoading}
          onTouch={handleClick}
          isDeletable
        />
      </div>
    </div>
  );
};
