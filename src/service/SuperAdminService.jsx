import { errorResponse } from "../api/response/ErrorResponse";
import { addFees, deleteFees, updateFees } from "../api/SuperAdmin";
import { auth_token } from "../constants/AppConstants";

export const addFeesService = async (addReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await addFees(addReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const updateFeesService = async (updateReq, feeId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await updateFees(updateReq, feeId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const deleteFeesService = async (feeId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await deleteFees(feeId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};
