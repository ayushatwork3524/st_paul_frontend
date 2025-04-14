import axios from "axios";
import { add_fees_end_point, superAdminUrl } from "./ApiConstants";

const superAdmin = axios.create({
  baseURL: superAdminUrl,
});

export const addFees = (addReq, token) => {
  return superAdmin.post(add_fees_end_point, addReq, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateFees = (updateReq, feeId, token) => {
  return superAdmin.put(`${add_fees_end_point}/${feeId}`, updateReq, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFees = (feeId, token) => {
  return superAdmin.delete(`${add_fees_end_point}/${feeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
