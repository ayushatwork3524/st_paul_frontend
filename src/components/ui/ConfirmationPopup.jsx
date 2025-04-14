import { useDispatch, useSelector } from "react-redux";
import { functionRegistry } from "../../uitl/functionRegistry";
import { closePopup } from "../../redux/store/PopupSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ConfirmationPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    functionKey,
    functionParams,
  } = useSelector((state) => state.popup);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (functionKey && functionRegistry[functionKey]) {
      functionRegistry[functionKey](...functionParams, {
        dispatch,
        navigate,
        toast,
      });
    }
    dispatch(closePopup());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-2">
        <h2 className="text-lg font-semibold font-serif text-gray-900">
          {title}
        </h2>
        <p className="mt-2">{message}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => dispatch(closePopup())}
            className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
