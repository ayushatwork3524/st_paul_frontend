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

export const NoSidebarLayout = () => {
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
      <section className="flex flex-col bg-[#E7E6EB]">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          hideProgressBar
        />

        <Outlet />
      </section>
    </>
  );
};
