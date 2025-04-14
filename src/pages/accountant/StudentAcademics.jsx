import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentAcademicsService } from "../../service/UserService";
import { downloadReceipt } from "../../uitl/Util";
import { BsArrowLeftCircle } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineSimCardDownload } from "react-icons/md";
import { decodeId } from "../../security/secureuri/SecureUri";
import { HomeLoader } from "../../components/ui/loaders/HomeLoader";
import { NoData } from "../../components/ui/NoData";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";
import { downloadPaymentReceiptService } from "../../service/AccountantService";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { PayFeesForm } from "./PayFeesForm";

export const StudentAcademics = () => {
  const { studentId } = useParams();
  const id = decodeId(studentId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAcademicId, setSelectedAcademicId] = useState(null);

  const { data: academics, isLoading } = useQuery({
    queryKey: ["academics", id],
    queryFn: async () => {
      const res = await getStudentAcademicsService(id);
      return res.filter((academic) => academic?.paymentDetail !== null);
    },
  });

  const [activeTab, setActiveTab] = useState(0);

  if (!academics || academics?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <NoData content="No academic data available." />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <HomeLoader />
      </div>
    );
  }

  console.log(academics);

  const formatDate = (isoString) => {
    if (!isoString) return "Invalid Date";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDownload = async (receiptId) => {
    dispatch(setLoading(true));
    const res = await downloadPaymentReceiptService(id, receiptId);
    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      if (res?.data === null) {
        setTimeout(() => {
          toast.error("Please try again later!");
        }, 500);
        return;
      }
      downloadReceipt(res?.data, `receipt_${receiptId}.pdf`);
    } else {
      toast.error(res?.message);
      dispatch(setLoading(false));
    }
  };

  const handlePayClick = (academicId) => {
    setSelectedAcademicId(academicId);
    setIsFormOpen(true);
  };

  return (
    <div className="bg-white rounded-lg">
      <Header navigate={navigate} />

      {/* Tabs Section */}
      <div className="flex gap-3 px-6 overflow-x-auto">
        {academics?.map((record, index) => (
          <button
            key={index}
            className={`px-4 py-2 cursor-pointer text-sm font-semibold rounded-t-lg transition ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-600 bg-blue-100"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {`Class ${record.stdClass}`}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className=" px-6">
        {academics?.map(
          (record, index) =>
            activeTab === index && (
              <div key={record.studentAcademicsId} className="p-4 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-blue-600">
                      Stream - {record.stream?.stream}
                    </h3>
                    <p>
                      <span className="text-gray-900 font-medium">Status:</span>{" "}
                      {record.status}
                    </p>
                    <p>
                      <span className="text-gray-900 font-medium">Result:</span>{" "}
                      {record.result}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handlePayClick(record?.studentAcademicsId)}
                      className="flex items-center cursor-pointer gap-2 p-2 border rounded-md border-green-600 text-white font-medium uppercase bg-green-600 hover:bg-green-700 transition"
                    >
                      <PiContactlessPaymentLight size={24} />
                      <span>Pay Fee</span>
                    </button>
                  </div>
                </div>

                {/* Fee Details */}
                <div className="overflow-x-auto">
                  <table className="w-full border mt-4">
                    <tbody>
                      <tr>
                        <td className="p-2 border">Total Fees:</td>
                        <td className="p-2 border font-medium">
                          ₹{record.paymentDetail?.totalFees || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Paid Amount:</td>
                        <td className="p-2 border text-green-600 font-medium">
                          ₹{record.paymentDetail?.paidAmount || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Balance Amount:</td>
                        <td className="p-2 border text-red-600 font-medium">
                          ₹{record.paymentDetail?.balanceAmount || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Installments:</td>
                        <td className="p-2 border">
                          {record.paymentDetail?.installments || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Due Date:</td>
                        <td className="p-2 border">
                          {formatDate(record.paymentDetail?.dueDate) || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Payment Type:</td>
                        <td className="p-2 border">
                          {record.paymentDetail?.paymentType || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Receipt Downloads */}
                {record?.paymentDetail?.receipt?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold font-serif text-gray-800">
                      Receipts:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">
                              Sr. No
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                              Date
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                              Amount (₹)
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                              Payment Mode
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {record?.paymentDetail?.receipt?.map(
                            (receipt, idx) => (
                              <tr
                                key={idx}
                                className="text-center border border-gray-300"
                              >
                                <td className="border border-gray-300 px-4 py-2">
                                  {idx + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {formatDate(receipt?.paymentDate)}
                                </td>
                                <td className="border border-gray-300 text-green-600 font-medium px-4 py-2">
                                  ₹{receipt?.amountPaid}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {receipt?.paymentMode || "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  <button
                                    onClick={() =>
                                      handleDownload(receipt?.receiptNo)
                                    }
                                    className=" cursor-pointer gap-2 p-2 border rounded-md border-blue-400 text-blue-500 hover:bg-blue-100 transition"
                                  >
                                    <FaDownload size={20} />
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
      <PayFeesForm
        academicsId={selectedAcademicId}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedAcademicId(null);
        }}
      />
    </div>
  );
};

const Header = ({ navigate }) => (
  <div className="flex items-center justify-between p-6 bg-white sticky top-0 w-full">
    <div onClick={() => navigate(-1)} className="cursor-pointer text-blue-600">
      <BsArrowLeftCircle size={30} />
    </div>

    <div className="flex-1 flex justify-center">
      <h1 className="text-2xl font-semibold font-serif">Detail</h1>
    </div>
  </div>
);
