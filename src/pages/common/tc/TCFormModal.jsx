import { useState, useEffect } from "react";
import { generateLeavingCertificateService } from "../../../service/ManagerService";
import { toast } from "react-toastify";
import { downloadReceipt } from "../../../uitl/Util";

export const TCFormModal = ({ isOpen, onClose, studentId }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    tcNo: "",
    admissionNo: "",
    duePaid: "",
    totalDays: "",
    totalPresentDays: "",
    dateOfApplication: "",
    dateOfIssue: "",
    reason: "",
    remark: "",
    generalConduct: "",
  });

  const [errors, setErrors] = useState({});

  // Prefill studentId if passed as prop

  const optionalFields = [
    "duePaid",
    "admissionNo",
    "generalConduct",
    "dateOfIssue",
    "reason",
    "remark",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict to digits for specific fields
    if (
      (name === "totalDays" || name === "totalPresentDays") &&
      value !== "" &&
      !/^\d*$/.test(value)
    ) {
      return; // prevent non-numeric input
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    // Loop through each form field
    Object.entries(formData).forEach(([key, value]) => {
      // Check if field is not optional
      if (!optionalFields.includes(key)) {
        // Check if required fields are empty
        if (!value.trim()) {
          newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
        }
        // Check if date fields match the dd/mm/yyyy format
        else if (
          (key === "dateOfApplication" || key === "dateOfIssue") &&
          !/^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())
        ) {
          newErrors[key] = `Enter date in dd/mm/yyyy format`;
        }
        // Check if totalDays and totalPresentDays are numbers
        else if (
          (key === "totalDays" || key === "totalPresentDays") &&
          !/^\d+$/.test(value.trim())
        ) {
          newErrors[key] = `${key.replace(
            /([A-Z])/g,
            " $1"
          )} must be a valid number`;
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await generateLeavingCertificateService(studentId, formData);
      if (res?.statusCode === 200) {
        downloadReceipt(res?.data, "TransferCertificate.pdf");
        onClose();
        setFormData({
          studentId: "",
          tcNo: "",
          admissionNo: "",
          duePaid: "",
          dateOfApplication: "",
          dateOfIssue: "",
          reason: "",
          remark: "",
          generalConduct: "",
          totalDays: "",
          totalPresentDays: "",
        });
        setTimeout(() => {
          toast.success("Transfer certificate generated successfully.");
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error(res?.message);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        toast.error("Failed to generate transfer certificate.");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-md shadow-lg p-10 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer text-gray-500 hover:text-black text-xl"
        >
          X
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Before Generating TC, please fill this form
        </h2>

        <hr className="mb-4" />

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1")}
                {!optionalFields.includes(key) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={
                  key === "dateOfApplication" || key === "dateOfIssue"
                    ? "dd/mm/yyyy"
                    : ""
                }
                className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                  errors[key]
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />

              {errors[key] && (
                <span className="text-red-500 text-xs mt-1">{errors[key]}</span>
              )}
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
