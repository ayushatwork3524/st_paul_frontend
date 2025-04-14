import React, { useEffect, useState } from "react";
import { FormInput } from "../../../components/ui/FormInput";
import { FormSelect } from "../../../components/ui/FormSelect";
import { useNavigate } from "react-router-dom";
import { makePaymentService } from "../../../service/ManagerService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/store/LoadingSlice";
import { toast } from "react-toastify";
import { downloadReceipt } from "../../../uitl/Util";
import { encodeId } from "../../../security/secureuri/SecureUri";
import { RxCross2 } from "react-icons/rx";

export const Payment = ({
  isOpen,
  onClose,
  id,
  academicId,
  stdClass,
  totalFees,
}) => {
  const [feeDetails, setFeeDetails] = useState({
    totalFees: 0.0, // Double
    balanceAmount: 0.0, // Double
    paidAmount: 0.0, // Double
    paymentType: "",
    installmentAmount: 0.0, // Double
    installmentType: "",
    installments: 0, // Int
    dueDate: "",
    stdClass: "",
  });

  const [listHeight, setListHeight] = useState(window.innerHeight * 0.9);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.9);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFeeDetails((prev) => {
      const newBalance = totalFees
        ? (parseFloat(totalFees) - parseFloat(prev.paidAmount || 0)).toString()
        : "";
      return {
        ...prev,
        totalFees: totalFees || "",
        stdClass: stdClass || "",
        balanceAmount: newBalance,
        installmentAmount: prev.installments
          ? (parseFloat(newBalance) / parseInt(prev.installments)).toFixed(2)
          : "",
      };
    });
  }, [stdClass, totalFees]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = [
      "totalFees",
      "balanceAmount",
      "paidAmount",
      "installmentAmount",
    ].includes(name)
      ? parseFloat(value) || 0.0
      : name === "installments"
      ? parseInt(value) || 0
      : value;

    setFeeDetails((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // ✅ Auto-calculate Balance Amount when Paid Amount is updated
    if (name === "paidAmount") {
      setFeeDetails((prev) => ({
        ...prev,
        balanceAmount: parseFloat(prev.totalFees - parsedValue).toFixed(2),
      }));
    }

    // ✅ Auto-calculate Installments & Installment Amount when Installment Type is selected
    if (name === "installmentType") {
      let numInstallments = 1;

      if (value === "1/2") numInstallments = 2;
      else if (value === "1/3") numInstallments = 3;
      else if (value === "1/4") numInstallments = 4;

      setFeeDetails((prev) => ({
        ...prev,
        installmentType: value,
        installments: numInstallments,
        installmentAmount: parseFloat(
          prev.balanceAmount / numInstallments
        ).toFixed(2),
      }));
    }

    // ✅ Auto-calculate Installment Amount when Number of Installments is updated manually
    if (name === "installments" && parsedValue > 0) {
      setFeeDetails((prev) => ({
        ...prev,
        installmentAmount: parseFloat(prev.balanceAmount / parsedValue).toFixed(
          2
        ),
      }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!feeDetails.stdClass.trim()) newErrors.stdClass = "Class is required";
    if (feeDetails.totalFees <= 0)
      newErrors.totalFees = "Total fees must be greater than zero";
    if (feeDetails.paidAmount < 0)
      newErrors.paidAmount = "Paid amount cannot be negative";
    if (feeDetails.balanceAmount < 0)
      newErrors.balanceAmount = "Balance amount cannot be negative";
    if (!feeDetails.paymentType)
      newErrors.paymentType = "Payment type is required";

    if (
      feeDetails.paymentType === "CASH" &&
      feeDetails.paidAmount !== feeDetails.totalFees
    )
      newErrors.paidAmount =
        "Paid amount must be equal to total fees for cash payment";

    if (feeDetails.paymentType === "INSTALLMENTS") {
      if (feeDetails.installmentAmount <= 0)
        newErrors.installmentAmount =
          "Installment amount must be greater than zero";
      if (feeDetails.installments <= 0)
        newErrors.installments = "Number of installments must be at least 1";
      if (!feeDetails.dueDate) newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      //   alert("Fees updated successfully!");

      // if (feeDetails.paidAmount !== feeDetails.totalFees.toString) {
      //   toast.warning(
      //     "For one-time payment, Paid Amount should be equal to Total Fees!"
      //   );
      //   return;
      // }

      const { installmentType, stdClass, ...payload } = feeDetails;

      console.log(payload);

      dispatch(setLoading(true));
      const res = await makePaymentService(id, academicId, payload);

      if (res?.statusCode === 200) {
        dispatch(setLoading(false));
        // navigate("/user/pending-applications");
        setTimeout(() => {
          toast.success(res?.message);
        }, 2000);

        if (res?.data) {
          downloadReceipt(res.data, `Receipt_${encodeId(academicId)}.pdf`);
        }
      } else {
        dispatch(setLoading(false));
        toast.error(res?.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div
        className="bg-white p-6 rounded-lg flex flex-col justify-between shadow-lg w-[95%]"
        style={{ height: listHeight }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between w-[98%] mx-auto">
            <h2 className="text-lg text-gray-800 mb-4 font-serif">Payment</h2>
            <RxCross2 onClick={onClose} size={24} className="cursor-pointer" />
          </div>

          <div className="flex flex-col gap-6">
            {/* Grid for inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <FormInput
                label="Class"
                type="text"
                name="stdClass"
                disabled
                value={feeDetails.stdClass}
                onChange={handleChange}
                error={errors.stdClass}
              />
              <FormInput
                label="Total Fees"
                type="text"
                name="totalFees"
                disabled
                value={feeDetails.totalFees}
                onChange={handleChange}
                error={errors.totalFees}
              />
              <FormInput
                label="Paid Amount"
                type="text"
                name="paidAmount"
                value={feeDetails.paidAmount}
                onChange={handleChange}
                error={errors.paidAmount}
              />
              <FormInput
                label="Balance Amount (Auto)"
                type="text"
                disabled
                name="balanceAmount"
                value={feeDetails.balanceAmount}
                onChange={handleChange}
                error={errors.balanceAmount}
              />
              <FormSelect
                label="Payment Type"
                name="paymentType"
                value={feeDetails.paymentType}
                options={["CASH", "INSTALLMENTS"]}
                onChange={handleChange}
                error={errors.paymentType}
              />
            </div>

            {feeDetails.paymentType === "INSTALLMENTS" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <FormSelect
                  label="Installment Type"
                  name="installmentType"
                  value={feeDetails.installmentType}
                  options={["1/2", "1/3", "1/4"]}
                  onChange={handleChange}
                  error={errors.installmentType}
                />
                <FormInput
                  label="Number of Installments (Auto)"
                  type="text"
                  disabled
                  name="installments"
                  value={feeDetails.installments}
                  onChange={handleChange}
                  error={errors.installments}
                />
                <FormInput
                  label="Installment Amount (Auto)"
                  type="text"
                  disabled
                  name="installmentAmount"
                  value={feeDetails.installmentAmount}
                  onChange={handleChange}
                  error={errors.installmentAmount}
                />

                <FormInput
                  label="Due Date"
                  type="date"
                  name="dueDate"
                  value={feeDetails.dueDate}
                  onChange={handleChange}
                  error={errors.dueDate}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 cursor-pointer bg-gray-200 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
