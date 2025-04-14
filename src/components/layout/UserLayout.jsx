import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "../Sidebar";
import { useEffect, useState } from "react";
import {
  clearUserCookie,
  getUserFromCookie,
  setUserCookie,
} from "../../security/cookies/UserCookie";
import { auth_token } from "../../constants/AppConstants";
import { HomeLoader } from "../ui/loaders/HomeLoader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/store/LoadingSlice";
import { getUserProfileService } from "../../service/UserService";
import { ConfirmationPopup } from "../ui/ConfirmationPopup";

export const UserLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserFromCookie());
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  const showLoader = isLoading || navigation.state === "loading";

  useEffect(() => {
    const token = localStorage.getItem(auth_token);

    if (!token) {
      clearUserCookie();
      navigate("/sign-in");
      return;
    }

    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedUser = await getUserProfileService();
        if (fetchedUser) {
          setUser(fetchedUser);
          setUserCookie(fetchedUser);
        } else {
          throw new Error("Token expired or invalid");
        }
      } catch (error) {
        console.error("Token expired or invalid:", error);
        localStorage.removeItem(auth_token);
        clearUserCookie();
        navigate("/sign-in");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  if (showLoader) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <HomeLoader />
      </div>
    );
  }

  return (
    <>
      <section className="h-screen w-screen flex gap-2 bg-[#E7E6EB]">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          hideProgressBar
        />

        <div className="overflow-auto w-[10%] 2xl:w-[20%] h-full">
          <Sidebar />
        </div>

        <div className="overflow-auto shadow-md border border-gray-300 bg-white rounded-lg h-[calc(100vh-4%)] my-4 mx-4 w-[90%] 2xl:w-[80%] relative">
          {navigation.state === "loading" && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-50">
              <HomeLoader />
            </div>
          )}
          <Outlet />
          <ConfirmationPopup />
        </div>
      </section>
    </>
  );
};
