import { useState } from "react";
import { toast } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";
import { Link, NavLink } from "react-router-dom"; // Import Link
import {
  resetPasswordService,
  sendOtpService,
  verifyOtpService,
} from "../../service/AuthService";

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email) return toast.warn("Email is required");
    dispatch(setLoading(true));
    const res = await sendOtpService(formData.email);
    if (res?.statusCode === 200) {
      setIsOtpSent(true);
      setOtpCountdown(true);
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
    dispatch(setLoading(false));
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!formData.otp) return toast.warn("Enter the OTP");
    dispatch(setLoading(true));
    const res = await verifyOtpService(formData.email, formData.otp);
    if (res?.statusCode === 200) {
      setIsOtpVerified(true);
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
    dispatch(setLoading(false));
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (!formData.password) return toast.warn("Enter a new password");
    dispatch(setLoading(true));
    const res = await resetPasswordService(
      formData.email,
      formData.otp,
      formData.password
    );
    if (res?.statusCode === 200) {
      toast.success(res?.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(res?.message);
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold font-urbanist mb-6">
          Forgot Password
        </h2>

        {/* Step 1: Enter Email */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-white bg-slate-200"
            placeholder="Enter your email"
            disabled={isOtpSent}
          />
          {!isOtpSent && (
            <button
              onClick={handleSendOtp}
              className="mt-5 w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Send OTP
            </button>
          )}
        </div>

        {/* Step 2: Enter OTP */}
        {isOtpSent && (
          <div className="mt-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-white bg-slate-200"
              placeholder="Enter OTP"
              disabled={isOtpVerified}
            />
            {otpCountdown && !isOtpVerified ? (
              <div className="flex justify-end mt-3">
                <CountdownCircleTimer
                  isPlaying
                  duration={10}
                  colors={["#004777", "#F7B801", "#A30000"]}
                  colorsTime={[40, 20, 0]}
                  size={30}
                  strokeWidth={2}
                  onComplete={() => setOtpCountdown(false)}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </div>
            ) : (
              <div className="flex justify-end mt-2">
                <button onClick={handleSendOtp} className="text-blue-500">
                  Resend OTP
                </button>
              </div>
            )}
            {!isOtpVerified && (
              <button
                onClick={handleVerifyOtp}
                className="mt-5 w-full bg-green-500 text-white py-2 rounded-md"
              >
                Verify OTP
              </button>
            )}
          </div>
        )}

        {/* Step 3: Reset Password */}
        {isOtpVerified && (
          <div className="mt-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-white bg-slate-200"
              placeholder="Enter new password"
            />
            <button
              onClick={handleResetPassword}
              className="mt-5 w-full bg-purple-500 text-white py-2 rounded-md"
            >
              Reset Password
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <NavLink to="/sign-in" className="text-blue-500">
            Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};
