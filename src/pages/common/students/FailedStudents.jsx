import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFailedStudentsService } from "../../../service/UserService";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { promoteStudentService } from "../../../service/AdminService";
import { Filters } from "./Filters";
import { FailedStudentTable } from "./FailedStudentTable";
import { encodeId } from "../../../security/secureuri/SecureUri";
import { useState } from "react";

export const FailedStudents = () => {
  const [filter, setFilter] = useState({
    query: "",
    stdClass: undefined,
    section: undefined,
    session: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: students,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", filter],
    queryFn: async () => {
      return await getFailedStudentsService(filter);
    },
  });

  console.log(students);

  const handleClick = (id) => {
    return navigate(`/user/student/${encodeId(id)}`);
  };

  const handlePromote = async (selectedStudents) => {
    console.log(selectedStudents);
    dispatch(setLoading(true));
    const res = await promoteStudentService(selectedStudents);
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.success(res?.message);
      }, 200);
    } else {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.error(res?.message);
      }, 200);
      return;
    }
  };

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
        <FailedStudentTable
          students={students}
          isLoading={isLoading}
          onTouch={handleClick}
          isPromotable={true}
          onPromote={handlePromote}
        />
      </div>
    </div>
  );
};
