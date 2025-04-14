import {
  login_user,
  logoutApi,
  register_user,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../api/Auth";
import { errorResponse } from "../api/response/ErrorResponse";
import { auth_token } from "../constants/AppConstants";

export const registerService = async (registerReq) => {
  try {
    const res = await register_user(registerReq);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const loginService = async (loginReq) => {
  try {
    const res = await login_user(loginReq);
    const token = res?.data?.token;
    localStorage.setItem("auth-st-key", token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const logoutService = async () => {
  try {
    const token = localStorage.getItem(auth_token);
    const res = await logoutApi(token);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const sendOtpService = async (email) => {
  try {
    const res = await sendOtp(email);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const verifyOtpService = async (email, otp) => {
  try {
    const res = await verifyOtp({ email, opt: otp });
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};

export const resetPasswordService = async (email, otp, password) => {
  try {
    const res = await resetPassword({ email, opt: otp, password });
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || errorResponse;
  }
};
