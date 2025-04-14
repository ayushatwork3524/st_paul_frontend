import { useQuery } from "@tanstack/react-query";
import { getPendingApplicationService } from "../../service/AccountantService";
import { PendingTable } from "./PendingTable";
import { useState } from "react";
import { PendingFilter } from "./PendingFilter";

export const PendingApplications = () => {
  const [filter, setFilter] = useState({
    query: "",
    stdClass: undefined,
    session: undefined,
  });

  const {
    data: students,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", filter],
    queryFn: async () => {
      return await getPendingApplicationService(filter);
    },
  });

  console.log(students);

  return (
    <div className="w-full p-6 overflow-hidden flex flex-col gap-2 h-full">
      <div className="px-5">
        <PendingFilter
          filter={filter}
          setFilter={setFilter}
          onFilterChange={refetch}
        />
      </div>
      <div className="w-full h-full">
        <PendingTable students={students} isLoading={isLoading} />
      </div>
    </div>
  );
};
