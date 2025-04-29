import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { Login } from "../pages/auth/Login";
import { UserLayout } from "../components/layout/UserLayout";
import { Dashboard } from "../pages/common/dashboard/Dashboard";
import { Students } from "../pages/common/students/Students";
import { Import } from "../pages/common/import/Import";
import { Export } from "../pages/common/export/Export";
import { Register } from "../pages/auth/Register";
import { Admission } from "../pages/common/admission/Admission";
import { ForgotPassword } from "../pages/auth/ForgetPassword";
import { StudentDetail } from "../pages/common/studentDetail/StudentDetail";
import { Document } from "../pages/common/admission/Document";
import { FeesForm } from "../pages/accountant/FessForm";
import { FeesStructure } from "../pages/accountant/FeesStructure";
import { Payment } from "../pages/common/admission/Payment";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE_HIERARCHY } from "./RoleHierachy";
import { GlobalErrorPage } from "../pages/exception/GlobalErrorPage";
import { NotFoundPage } from "../pages/exception/NotFoundPage";
import { ReceiptDetail } from "../pages/accountant/ReceiptDetail";
import { StudentList } from "../pages/accountant/StudentList";
import { StudentAcademics } from "../pages/accountant/StudentAcademics";
import { PendingApplications } from "../pages/accountant/PendingApplications";
import { FailedStudents } from "../pages/common/students/FailedStudents";
import TcPdfPreviewEditable from "../uitl/TcPdfPreviewEditable";
import { NoSidebarLayout } from "../components/layout/NoSidebarLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/sign-in", element: <Login /> },
      { path: "/sign-up", element: <Register /> },
      { path: "/forget", element: <ForgotPassword /> },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      {
        element: <ProtectedRoute allowedRoles={ROLE_HIERARCHY.MANAGER} />,
        children: [
          { path: "students", element: <Students /> },
          { path: "failed-students", element: <FailedStudents /> },
          { path: "student/:studentId", element: <StudentDetail /> },
          { path: "admission", element: <Admission /> },
          { path: "student/:studentId/document", element: <Document /> },
          { path: "import", element: <Import /> },
          { path: "export", element: <Export /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={ROLE_HIERARCHY.SUPERADMIN} />,
        children: [
          { path: "add-class", element: <FeesForm /> },
          { path: "class-structure", element: <FeesStructure /> },
        ],
      },

      // {
      //   element: <ProtectedRoute allowedRoles={ROLE_HIERARCHY.ADMIN} />,
      //   children: [
      //     { path: "student/:studentId/tc", element: <TcPdfPreviewEditable /> },
      //   ],
      // },\

      {
        element: <ProtectedRoute allowedRoles={ROLE_HIERARCHY.ACOUNTANT} />,
        children: [
          { path: "student/:studentId/payment", element: <Payment /> },
          { path: "pay-fees", element: <StudentList /> },
          { path: "receipt/:receiptNo", element: <ReceiptDetail /> },
          {
            path: "student/:studentId/academics",
            element: <StudentAcademics />,
          },
          {
            path: "pending-applications",
            element: <PendingApplications />,
          },
        ],
      },
    ],
  },

  {
    path: "student",
    element: <NoSidebarLayout />,
    children: [
      {
        path: ":studentId/tc",
        element: <TcPdfPreviewEditable />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
