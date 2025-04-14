import axios from "axios";
import {
  accountantUrl,
  pay_fees_end_point,
  submit_admission_form_end_point,
} from "./ApiConstants";

const accountant = axios.create({
  baseURL: accountantUrl,
});

export const downloadPaymentReceipt = (studentId, receiptId, token) => {
  return accountant.get(
    `${submit_admission_form_end_point}/${studentId}/payment/receipt/${receiptId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPendingApplication = (token, filter) => {
  return accountant.get(`${submit_admission_form_end_point}/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query: filter.query,
      stdClass: filter.stdClass,
      session: filter.session,
    },
  });
};

export const payFees = (academicId, paymentReq, token) => {
  return accountant.post(
    `${pay_fees_end_point}/${academicId}/payment`,
    paymentReq,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
