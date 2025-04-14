import { useEffect, useState } from "react";
import { addFeesService } from "../../service/SuperAdminService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/store/LoadingSlice";
import { FormSelect } from "../../components/ui/FormSelect";

export const FeesForm = () => {
  const [className, setClassName] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [installments, setInstallments] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (totalFees && installments) {
      calculateInstallment(installments);
    }
  }, [totalFees, installments]);

  const validateForm = () => {
    let newErrors = {};

    // Ensure class name is a number between 1 and 12
    if (
      !className.trim() ||
      isNaN(className) ||
      className < 1 ||
      className > 12
    ) {
      newErrors.className = "Class name must be a number between 1 and 12.";
    }

    if (!totalFees || isNaN(totalFees) || totalFees <= 0)
      newErrors.totalFees = "Enter a valid total fee amount.";

    if (
      !installments ||
      isNaN(installments) ||
      installments <= 0 ||
      !Number.isInteger(Number(installments))
    )
      newErrors.installments = "Enter a valid number of installments.";

    if (
      !installmentAmount ||
      isNaN(installmentAmount) ||
      installmentAmount <= 0
    )
      newErrors.installmentAmount = "Enter a valid installment amount.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateInstallment = (num) => {
    const fees = Number(totalFees);
    const installmentsNum = Number(num);

    if (fees > 0 && installmentsNum > 0) {
      const singleInstallmentValue = (fees / installmentsNum).toFixed(2);
      setInstallmentAmount(singleInstallmentValue);
    } else {
      setInstallmentAmount("");
    }
  };

  const handleInstallmentsChange = (value) => {
    if (!isNaN(value) && Number.isInteger(Number(value)) && value >= 0) {
      setInstallments(value);
      calculateInstallment(value); // Use the updated value directly
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        stdClass: className,
        totalFees,
        installmentGap: installments,
        installmentsAmount: installmentAmount,
      };

      console.log(payload);

      dispatch(setLoading(true));
      const res = await addFeesService(payload);
      if (res?.statusCode === 200) {
        dispatch(setLoading(false));
        navigate("/user/class-structure");
        setTimeout(() => {
          toast.success(res?.message);
        }, 1000);
      } else {
        dispatch(setLoading(false));
        setTimeout(() => {
          toast.error(res?.message);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex items-center mt-10 justify-center p-6">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full border border-gray-300 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Fees Master
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Class</label>
            <input
              type="text"
              className="w-full border rounded-lg focus:outline-none p-2 mt-1 border-gray-300 focus:border-blue-500"
              placeholder="Enter class number (1-12)"
              value={className}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value <= 12) {
                  setClassName(value);
                }
              }}
            />

            {errors.className && (
              <p className="text-red-500 text-sm">{errors.className}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Total Fees
            </label>
            <input
              type="text"
              className="w-full border rounded-lg focus:outline-none p-2 mt-1 border-gray-300 focus:border-blue-500"
              placeholder="Enter total fees"
              value={totalFees}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (/^\d+$/.test(value) && value > 0)) {
                  setTotalFees(value);
                  calculateInstallment(installments);
                }
              }}
            />
            {errors.totalFees && (
              <p className="text-red-500 text-sm">{errors.totalFees}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Number of Installments
            </label>
            <input
              type="text"
              disabled={!className.trim() || !totalFees.trim()}
              className="w-full border rounded-lg focus:outline-none p-2 mt-1 border-gray-300 focus:border-blue-500"
              placeholder="Enter number of installments"
              value={installments}
              onChange={(e) => handleInstallmentsChange(Number(e.target.value))}
            />
            {errors.installments && (
              <p className="text-red-500 text-sm">{errors.installments}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Installment Amount (Auto)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg focus:outline-none p-2 mt-1 border-gray-300 focus:border-blue-500"
              placeholder="installment amount"
              value={installmentAmount}
              readOnly
              onChange={(e) => setInstallmentAmount(e.target.value)}
            />
            {errors.installmentAmount && (
              <p className="text-red-500 text-sm">{errors.installmentAmount}</p>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-6 px-10 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
