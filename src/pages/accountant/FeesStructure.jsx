import { useQuery } from "@tanstack/react-query";
import { FeesTable } from "../../components/ui/FeesTable";
import { FeeFilter } from "./FeeFilter";
import { getAllFeesService } from "../../service/UserService";
import { useState } from "react";
import { UpdateFeesModal } from "./UpdateFeesModal";

export const FeesStructure = () => {
  const [selectedFee, setSelectedFee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState({
    stdClass: undefined,
  });

  const { data: fees, refetch } = useQuery({
    queryKey: ["fees", filter],
    queryFn: async () => {
      return await getAllFeesService(filter);
    },
  });

  console.log(fees);

  const handleEdit = (fee) => {
    setSelectedFee(fee);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col w-full h-full gap-5">
        <div>
          <FeeFilter
            filter={filter}
            setFilter={setFilter}
            onFilterChange={refetch}
          />
        </div>
        <div className="w-full h-full">
          <FeesTable feesData={fees} onEdit={handleEdit} />
        </div>
      </div>
      <UpdateFeesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feeData={selectedFee}
      />
    </div>
  );
};
