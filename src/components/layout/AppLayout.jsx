import { Outlet, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HomeLoader } from "../ui/loaders/HomeLoader";
import { useSelector } from "react-redux";

export const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = useSelector((state) => state.loading.isLoading);

  const showLoader = isLoading || navigation.state === "loading";

  return (
    <section className="h-screen w-screen bg-fixed bg-no-repeat bg-cover bg-[url(/login1.jpg)] relative">
      {showLoader && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/20 z-50">
          <HomeLoader />
        </div>
      )}

      <div className="overflow-auto w-full h-full">
        <Outlet />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        hideProgressBar
      />
    </section>
  );
};
