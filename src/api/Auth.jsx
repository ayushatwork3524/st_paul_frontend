import axios from "axios";
import {
  authUrl,
  logout_end_point,
  send_otp_end_point,
  user_login_end_point,
  user_register_end_point,
  verify_otp_end_point,
} from "./ApiConstants";

const auth = axios.create({
  baseURL: authUrl,
});

export const register_user = (registerReq) => {
  return auth.post(user_register_end_point, registerReq);
};

export const login_user = (loginReq) => {
  return auth.post(user_login_end_point, loginReq);
};

export const logoutApi = (token) => {
  return auth.post(
    logout_end_point,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sendOtp = (email) => {
  return auth.post(`${send_otp_end_point}/${email}`, {});
};

export const verifyOtp = (verifyReq) => {
  return auth.post(verify_otp_end_point, verifyReq);
};

export const resetPassword = (resetReq) => {
  return auth.post(resetPassword, resetReq);
};
