import { useEffect, useState } from "react";
import { PiArrowCircleRightDuotone } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginService } from "../../service/AuthService";
import { auth_token } from "../../constants/AppConstants";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(auth_token);
    if (token) {
      navigate("/user/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? `${name} is required` : "",
    }));

    if (name === "email" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      toast.warn("Email is required");
      return;
    }
    if (!validateEmail(loginData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      toast.warn("Invalid email format");
      return;
    }
    if (!loginData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      toast.warn("Password is required");
      return;
    }

    dispatch(setLoading(true));
    const res = await loginService(loginData);

    if (res?.statusCode === 200 || res?.statusCode === 201) {
      toast.success(res?.message);
      navigate("/user/dashboard");
    } else {
      toast.error(res?.message);
    }

    dispatch(setLoading(false));
  };

  if (checkingAuth) return null;

  return (
    <section className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%] p-10 rounded-md flex flex-col gap-3 shadow-sm shadow-blue-500/50 ring ring-blue-200 bg-white"
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <h1 className="text-3xl font-semibold font-urbanist text-blue-700/80">
              Sign in
            </h1>
            <p className="flex justify-center items-center text-blue-700">
              <PiArrowCircleRightDuotone size={32} />
            </p>
          </div>
          <p className="font-BigShouldersStencil text-gray-800">
            Enter your credentials to log into your account.
          </p>
        </div>
        <div className="flex gap-5 py-4 w-full flex-col justify-center items-center">
          <div className="flex w-full flex-col gap-1">
            <label
              className="font-BigShouldersStencil text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              className={`w-full p-2 focus:outline-none focus:ring-2 rounded-md bg-gray-300/50 focus:ring-blue-500 ${
                errors.email ? "border border-red-500" : ""
              }`}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-1 relative">
            <label
              className="font-BigShouldersStencil text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className={`w-full p-2 pr-10 focus:outline-none focus:ring-2 rounded-md bg-gray-300/50 focus:ring-blue-500 ${
                  errors.password ? "border border-red-500" : ""
                }`}
                placeholder="Enter Password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex select-none -mt-5 text-blue-600 hover:text-blue-700 justify-end">
          <NavLink to="/forget">Forget Password</NavLink>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-8 py-2 w-full cursor-pointer rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>

        <div>
          <p className="text-center  text-gray-500 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/sign-up"
              className="text-blue-800 select-none font-medium"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};
