import axios from "axios";
import { adminUrl, submit_admission_form_end_point } from "./ApiConstants";

const admin = axios.create({
  baseURL: adminUrl,
});

export const promoteStudent = (promoteReq, token) => {
  return admin.post(`${submit_admission_form_end_point}/promote`, promoteReq, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
