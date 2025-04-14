import {
  downloadPaymentReceipt,
  getPendingApplication,
  payFees,
} from "../api/Accountant";
import { errorResponse } from "../api/response/ErrorResponse";
import { auth_token } from "../constants/AppConstants";

export const downloadPaymentReceiptService = async (studentId, receiptId) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await downloadPaymentReceipt(studentId, receiptId, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return errorResponse;
  }
};

export const getPendingApplicationService = async (filter) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await getPendingApplication(token, filter);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const payFeesService = async (academicId, paymentReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await payFees(academicId, paymentReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return errorResponse;
  }
};
