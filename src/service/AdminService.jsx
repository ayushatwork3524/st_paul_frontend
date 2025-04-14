import { promoteStudent } from "../api/Admin";
import { errorResponse } from "../api/response/ErrorResponse";
import { auth_token } from "../constants/AppConstants";

export const promoteStudentService = async (promoteReq) => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await promoteStudent(promoteReq, token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};
