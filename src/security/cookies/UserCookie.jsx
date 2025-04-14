// utils/auth.js
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { USER_COOKIE } from "../../constants/AppConstants";

const secretKey =
  "fjcsdbjfkcsldfy98df68775dsa78d3j2bieruw7832buibduitd8329bdsa;dbsakjdg785d6asdgui32hewe;rjaopr73232435"; // A strong key used for encryption/decryption

export const setUserCookie = (user) => {
  const isHttps = window.location.protocol === "https:";
  const encryptedUser = CryptoJS.AES.encrypt(
    JSON.stringify(user),
    secretKey
  ).toString();
  Cookies.set(USER_COOKIE, encryptedUser, {
    expires: 1,
    secure: isHttps,
    sameSite: isHttps ? "None" : "Lax",
  });
};

export const getUserFromCookie = () => {
  const encryptedUser = Cookies.get(USER_COOKIE);
  if (encryptedUser) {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    const decryptedUser = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedUser ? JSON.parse(decryptedUser) : null;
  }
  return null;
};

export const clearUserCookie = () => {
  Cookies.remove(USER_COOKIE);
};
