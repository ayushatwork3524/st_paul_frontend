import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";

export const ReceiptFilter = () => {
  return (
    <div className="flex w-full gap-5">
      <div>
        <Input type="search" label="search" placeholder="Search By Name" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <label
          htmlFor="class"
          className="font-medium text-sm text-gray-700 uppercase"
        >
          Class:-
        </label>
        <Select label="class" options={["All", "11th", "12th"]} />
      </div>
      <div className="flex justify-center items-center gap-2">
        <label
          htmlFor="session"
          className="font-medium text-sm text-gray-700 uppercase"
        >
          Session:-
        </label>
        <Select label="session" options={["All", "A", "B", "C"]} />
      </div>
    </div>
  );
};
