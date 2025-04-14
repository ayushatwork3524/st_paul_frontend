import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { registerService } from "../../service/AuthService";
import { auth_token } from "../../constants/AppConstants";
import { HomeLoader } from "../../components/ui/loaders/HomeLoader";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(auth_token);
    if (token) {
      navigate("/user/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem(auth_token);
    if (token) {
      navigate("/user/dashboard");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!registerData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!registerData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(registerData.contact)) {
      newErrors.contact = "Enter a valid 10-digit contact number";
    }

    if (!registerData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.warn("Fill the requried details");
      return;
    }
    dispatch(setLoading(true));
    const res = await registerService(registerData);

    if (res?.statusCode === 200 || res?.statusCode === 201) {
      toast.success(res?.message);
      navigate("/sign-in");
    } else {
      toast.error(res?.message);
    }
    dispatch(setLoading(false));
  };

  if (checkingAuth) return null;

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-[90%] bg-white md:p-8 h-auto md:h-[90%] rounded-lg flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="px-10 xl:px-40 py-5 md:py-10 w-full flex flex-col justify-center items-center gap-10">
            <h1 className="font-Lato font-semibold text-2xl 2xl:text-3xl text-blue-950">
              Create Account
            </h1>

            <div className="flex flex-col gap-4 w-full">
              {/* Name Input */}
              <div>
                <input
                  name="name"
                  type="text"
                  value={registerData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className={`px-4 py-2 rounded-md focus:outline-none ring ${
                    errors.name
                      ? "ring-red-500"
                      : "ring-gray-200 focus:ring-blue-700"
                  } bg-gray-200/80 w-full h-10`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <input
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className={`px-4 py-2 rounded-md focus:outline-none ring ${
                    errors.email
                      ? "ring-red-500"
                      : "ring-gray-200 focus:ring-blue-700"
                  } bg-gray-200/80 w-full h-10`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  name="contact"
                  type="text"
                  value={registerData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter Contact"
                  className={`px-4 py-2 rounded-md focus:outline-none ring ${
                    errors.contact
                      ? "ring-red-500"
                      : "ring-gray-200 focus:ring-blue-700"
                  } bg-gray-200/80 w-full h-10`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">{errors.contact}</p>
                )}
              </div>

              <div className="relative w-full">
                <input
                  name="password"
                  value={registerData.password}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`px-4 py-2 rounded-md focus:outline-none ring ${
                    errors.password
                      ? "ring-red-500"
                      : "ring-gray-200 focus:ring-blue-700"
                  } bg-gray-200/80 w-full h-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 cursor-pointer right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm -mt-2">{errors.password}</p>
              )}
            </div>

            <div className="w-full h-full">
              <button
                type="submit"
                className="block py-2 px-6 w-full h-full rounded-md cursor-pointer bg-blue-700 hover:bg-blue-800 text-center text-white"
              >
                Sign Up
              </button>
            </div>

            <div className="-mt-5">
              <p className="text-center text-gray-500 text-sm">
                Already have an account?{" "}
                <NavLink to="/sign-in" className="text-blue-800 font-medium">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </form>

        <div className="hidden md:inline w-1/2 bg-cover h-full bg-[url('/register.jpg')]"></div>
      </div>
    </section>
  );
};
