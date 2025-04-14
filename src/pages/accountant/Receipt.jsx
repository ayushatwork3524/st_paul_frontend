import { ReceiptFilter } from "./ReceiptFilter";
import { ReceiptTable } from "./ReceiptTable";

export const Receipt = () => {
  const receiptData = [
    {
      receiptNo: "RCP001",
      session: "2024-2025",
      name: "John Doe",
      stdClass: "10th",
      admissionNo: "ADM12345",
      date: "2025-03-21",
    },
    {
      receiptNo: "RCP002",
      session: "2024-2025",
      name: "Jane Smith",
      stdClass: "9th",
      admissionNo: "ADM12346",
      date: "2025-03-20",
    },
    {
      receiptNo: "RCP003",
      session: "2024-2025",
      name: "Alice Johnson",
      stdClass: "8th",
      admissionNo: "ADM12347",
      date: "2025-03-19",
    },
    {
      receiptNo: "RCP004",
      session: "2024-2025",
      name: "Bob Williams",
      stdClass: "7th",
      admissionNo: "ADM12348",
      date: "2025-03-18",
    },
  ];
  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col w-full h-full gap-5">
        <div>
          <ReceiptFilter />
        </div>
        <div className="w-full h-full">
          <ReceiptTable receiptData={receiptData} />
        </div>
      </div>
    </div>
  );
};
