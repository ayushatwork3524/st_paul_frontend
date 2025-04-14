import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { payFeesService } from "../../service/AccountantService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";
import { downloadReceipt } from "../../uitl/Util";
import { encodeId } from "../../security/secureuri/SecureUri";

export const PayFeesForm = ({ academicsId, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    academicsId: "",
    paymentMode: "",
    amountPaid: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, academicsId: academicsId }));
  }, [academicsId]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.academicsId)
      tempErrors.academicsId = "Academics ID is required.";
    if (!formData.paymentMode)
      tempErrors.paymentMode = "Payment Mode is required.";
    if (!formData.amountPaid) {
      tempErrors.amountPaid = "Amount Paid is required.";
    } else if (isNaN(formData.amountPaid) || formData.amountPaid <= 0) {
      tempErrors.amountPaid = "Enter a valid amount.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(setLoading(true));

      const { academicsId, ...data } = formData;

      const res = await payFeesService(formData.academicsId, data);

      if (res?.statusCode === 200) {
        dispatch(setLoading(false));
        setTimeout(() => {
          toast.success(res?.message);
        }, 200);

        if (res?.data) {
          downloadReceipt(
            res.data,
            `Receipt_${encodeId(formData.academicsId)}.pdf`
          );
        }
      } else {
        dispatch(setLoading(false));
        setTimeout(() => {
          toast.error(res?.message);
        }, 200);
      }

      setFormData({ academicsId: "", paymentMode: "", amountPaid: "" });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative animate-fadeIn">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Pay Fees</h2>
          <RxCross2
            onClick={onClose}
            size={24}
            className="cursor-pointer text-gray-600 hover:text-red-500"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Payment Mode */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full p-2 border mt-1 focus:outline-none border-gray-400 focus:border-blue-400 rounded-md"
            >
              <option value="">Select Payment Mode</option>
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">NET BANKING</option>
              <option value="CASH">CASH</option>
              <option value="CARD">CARD</option>
            </select>
            {errors.paymentMode && (
              <p className="text-red-500 text-sm">{errors.paymentMode}</p>
            )}
          </div>

          {/* Amount Paid */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Amount Paid
            </label>
            <input
              type="text"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleChange}
              className="w-full p-2 border mt-1 focus:outline-none border-gray-400 focus:border-blue-400 rounded-md"
              placeholder="Enter Amount"
            />
            {errors.amountPaid && (
              <p className="text-red-500 text-sm">{errors.amountPaid}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
