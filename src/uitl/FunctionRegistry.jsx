import {
  deleteDocumentByIdService,
  deleteStudentService,
  deleteStudentsService,
} from "../service/ManagerService";
import { setLoading } from "../redux/store/LoadingSlice";
import { deleteFeesService } from "../service/SuperAdminService";
import { logoutService } from "../service/AuthService";
import { auth_token } from "../constants/AppConstants";
import { clearUserCookie } from "../security/cookies/UserCookie";

export const functionRegistry = {
  deleteStudent: async (id, { dispatch, navigate, toast }) => {
    dispatch(setLoading(true));
    const res = await deleteStudentService(id);
    dispatch(setLoading(false));

    if (res?.statusCode === 200) {
      navigate(`/user/students`);
      setTimeout(() => toast.success(res?.message), 1000);
    } else {
      setTimeout(() => toast.error(res?.message), 1000);
    }
  },

  deleteStudents: async (ids, { dispatch, toast }) => {
    dispatch(setLoading(true));
    const res = await deleteStudentsService(ids);
    dispatch(setLoading(false));

    if (res?.statusCode === 200) {
      setTimeout(() => toast.success(res?.message), 1000);
    } else {
      setTimeout(() => toast.error(res?.message), 1000);
    }
  },

  deleteFees: async (selectedId, { dispatch, toast }) => {
    dispatch(setLoading(true));
    const res = await deleteFeesService(selectedId);

    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.success(res?.message);
      }, 1000);
    } else {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.error(res?.message);
      }, 1000);
    }
  },

  deleteDocument: async (docId, { dispatch, toast }) => {
    dispatch(setLoading(true));
    const res = await deleteDocumentByIdService(docId);

    if (res?.statusCode === 200) {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.success(res?.message);
      }, 1000);
    } else {
      dispatch(setLoading(false));
      setTimeout(() => {
        toast.error(res?.message);
      }, 1000);
    }
  },

  logout: async ({ dispatch, toast, navigate }) => {
    dispatch(setLoading(true));
    const res = await logoutService();
    if (res?.statusCode === 200) {
      localStorage.removeItem(auth_token);
      clearUserCookie();
      navigate("/sign-in");
    } else {
      toast.error(res?.message);
    }
    dispatch(setLoading(false));
  },
};
