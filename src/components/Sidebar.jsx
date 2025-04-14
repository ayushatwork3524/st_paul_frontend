import { CiImport } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { IoMdSpeedometer } from "react-icons/io";
import { IoPower, IoReceiptOutline } from "react-icons/io5";
import { LuUserRoundX, LuUsers } from "react-icons/lu";
import { MdAddCircleOutline, MdOutlineClass } from "react-icons/md";
import { TfiImport } from "react-icons/tfi";
import { TiExport } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router-dom";
import { auth_token } from "../constants/AppConstants";
import { LiaSchoolSolid } from "react-icons/lia";
import {
  clearUserCookie,
  getUserFromCookie,
} from "../security/cookies/UserCookie";
import { logoutService } from "../service/AuthService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/store/LoadingSlice";
import {
  HiOutlineCurrencyRupee,
  HiOutlineDocumentCurrencyRupee,
} from "react-icons/hi2";
import { useEffect, useState } from "react";
import { ROLE_ACCESS } from "../routes/RoleHierachy";
import { RiMailUnreadLine } from "react-icons/ri";
import { openPopup } from "../redux/store/PopupSlice";

export const Sidebar = () => {
  const navigate = useNavigate();
  const user = getUserFromCookie();
  const dispatch = useDispatch();
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.7);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight * 0.7);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navs = [
    {
      title: "Dashboard",
      icon: <IoMdSpeedometer size={22} />,
      link: "/user/dashboard",
    },
    {
      title: "Add Class",
      icon: <LiaSchoolSolid size={22} />,
      link: "/user/add-class",
    },
    {
      title: "Class Structure",
      icon: <MdOutlineClass size={22} />,
      link: "/user/class-structure",
    },
    // {
    //   title: "Pay Fees",
    //   icon: <HiOutlineCurrencyRupee size={22} />,
    //   link: "/user/pay-fees",
    // },
    {
      title: "Students",
      icon: <LuUsers size={22} />,
      link: "/user/students",
    },
    {
      title: "Failed Students",
      icon: <LuUserRoundX size={22} />,
      link: "/user/failed-students",
    },
    {
      title: "Admission",
      icon: <MdAddCircleOutline size={22} />,
      link: "/user/admission",
    },
    {
      title: "Pay Fees",
      icon: <HiOutlineCurrencyRupee size={22} />,
      link: "/user/pay-fees",
    },
    {
      title: "Pending Applications",
      icon: <RiMailUnreadLine size={22} />,
      link: "/user/pending-applications",
    },
    {
      title: "Export",
      icon: <TiExport size={22} />,
      link: "/user/export",
    },
    {
      title: "Import",
      icon: <FiDownload size={22} />,
      link: "/user/import",
    },
  ];

  const logout = async () => {
    dispatch(
      openPopup({
        title: "Logout Confirmation",
        message: "Are you sure you want to logout?",
        confirmText: "Yes, Logout",
        cancelText: "Cancel",
        functionKey: "logout",
        functionParams: [],
      })
    );
  };

  const allowedNavs = navs.filter((nav) =>
    ROLE_ACCESS[user?.role]?.includes(nav.title)
  );

  return (
    <section className="h-[calc(100vh-2%)] w-[10%] 2xl:w-[20%] rounded-lg fixed xl:mx-2 mt-2">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col 2xl:flex-row gap-5 rounded-md py-2 2xl:p-5 justify-between">
          <div className="flex justify-center items-center gap-4">
            <figure>
              <img
                title={user?.name}
                src="/profile.svg"
                alt="profile"
                className="rounded-lg bg-purple-400"
                width={55}
              />
            </figure>
            <div className="hidden 2xl:inline">
              <p className="font-medium capitalize">{user?.name}</p>
              <p>{user?.role}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              title="Logout"
              onClick={logout}
              className="bg-red-500 p-3 cursor-pointer text-white rounded-md flex justify-center items-center"
            >
              <IoPower size={20} />
            </button>
          </div>
        </div>
        <hr className="mx-4 -mt-5 text-gray-400" />
        <div
          className="px-4 md:px-6 py-2 overflow-auto flex flex-col gap-5"
          style={{ height: listHeight }}
        >
          {allowedNavs.map((nav, index) => (
            <NavLink
              to={nav.link}
              key={index}
              title={nav.title}
              className={({ isActive }) =>
                `flex gap-4 py-2 px-2 md:px-4 rounded-lg cursor-pointer ring hover:shadow-sm hover:bg-white hover:ring-blue-700 ${
                  isActive
                    ? "bg-white shadow-md ring-blue-700 font-bold"
                    : "ring-transparent"
                }`
              }
            >
              <p className="flex justify-center text-blue-700 items-center">
                {nav.icon}
              </p>
              <p className="hidden 2xl:inline font-medium font-urbanist text-lg select-none">
                {nav.title}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
