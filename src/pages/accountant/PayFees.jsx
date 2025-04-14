import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStudentsService } from "../../service/UserService";
import { Filters } from "../common/students/Filters";
import { StudentTable } from "../../components/ui/StudentTable";
import { StudentTableForFees } from "./StudentTableForFees";

export const PayFees = () => {
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

  //   const handleClick = (id) => {
  //     return navigate(`/user/student/${encodeId(id)}/academics`);
  //   };

  return (
    <div className="w-full p-6 overflow-hidden flex flex-col gap-2 h-full">
      <div className="px-5">
        <Filters
          filter={filter}
          setFilter={setFilter}
          onFilterChange={refetch}
        />
      </div>
      <div className="w-full h-full">
        <StudentTableForFees
          students={students}
          isLoading={isLoading}
          //   onTouch={handleClick}
          isDeletable={false}
        />
      </div>
    </div>
  );
};
