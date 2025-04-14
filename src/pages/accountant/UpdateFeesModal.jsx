import { useState, useEffect } from "react";
import { FormInput } from "../../components/ui/FormInput";
import { updateFeesService } from "../../service/SuperAdminService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";

export const UpdateFeesModal = ({ isOpen, onClose, feeData }) => {
  const [formData, setFormData] = useState({
    stdClass: "",
    totalFees: "",
    installmentGap: "",
    installmentsAmount: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (feeData) {
      setFormData({
        stdClass: feeData.stdClass || "",
        totalFees: feeData.totalFees || "",
        installmentGap: feeData.installmentGap || "",
        installmentsAmount:
          feeData.totalFees && feeData.installmentGap
            ? (feeData.totalFees / feeData.installmentGap).toFixed(2)
            : "",
      });
    }
  }, [feeData]);

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.stdClass) {
      newErrors.stdClass = "Class is required";
    }
    if (!formData.totalFees || formData.totalFees <= 0) {
      newErrors.totalFees = "Total Fees must be greater than 0";
    }
    if (!formData.installmentGap || formData.installmentGap <= 0) {
      newErrors.installmentGap = "Installments must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Prevent negative values
    if (name !== "stdClass" && value < 0) {
      return;
    }

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: newValue };

      // Auto-calculate Installment Amount
      if (name === "totalFees" || name === "installmentGap") {
        const total = parseFloat(updatedData.totalFees) || 0;
        const gap = parseFloat(updatedData.installmentGap) || 1;
        updatedData.installmentsAmount = gap > 0 ? (total / gap).toFixed(2) : 0;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      dispatch(setLoading(true));
      const res = await updateFeesService(formData, feeData?.id);
      if (res?.statusCode === 200) {
        dispatch(setLoading(false));
        setTimeout(() => {
          toast.success(res?.message);
        }, 500);
      } else {
        dispatch(setLoading(false));
        setTimeout(() => {
          toast.error(res?.message);
        }, 500);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Fees</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Class (Editable) */}
          <FormInput
            type="text"
            name="stdClass"
            label="Class"
            value={formData.stdClass}
            onChange={handleChange}
            error={errors.stdClass}
          />

          {/* Total Fees */}
          <FormInput
            type="text"
            name="totalFees"
            label="Total Fees"
            value={formData.totalFees}
            onChange={handleChange}
            error={errors.totalFees}
          />

          <FormInput
            type="text"
            name="installmentGap"
            label="Installments"
            value={formData.installmentGap}
            onChange={handleChange}
            error={errors.installmentGap}
          />

          <FormInput
            type="text"
            name="installmentsAmount"
            label="Installment Amount"
            disabled
            value={formData.installmentsAmount}
            onChange={handleChange}
            error={errors.installmentsAmount}
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
