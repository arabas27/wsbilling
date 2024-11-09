import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./app/Layout";
import ErrorPage from "./components/error-page";
import Payments from "./app/setting/Payments";
import PaymentDetail from "./app/setting/PaymentDetail";
import ClassRoom from "./app/manageStudents/ClassRoom";
import Level from "./app/manageStudents/Level";
import UploadStudent from "./app/manageStudents/UploadStudent";
import Student from "./app/manageStudents/Student";
import Login from "./app/Login";
import { AuthProvider } from "./components/auth/AuthProvider";
import {
  paymentDetailLoader,
  paymentsLoader,
} from "./app/route/setting/loaders";
import {
  paymentDetailAction,
  paymentsAction,
} from "./app/route/setting/actons";
import {
  classroomLoader,
  levelLoader,
  studentLoader,
  studentTypeLoader,
  uploadStudentLoader,
} from "./app/route/manageStudents/loaders";
import {
  classroomAction,
  levelAction,
  studentAction,
  studentTypeAction,
  uploadStudentAction,
} from "./app/route/manageStudents/actions";
import StudentType from "./app/manageStudents/StudentType";

const cookiesExpiredDate = new Date(2147483647 * 1000);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        loader: paymentsLoader,
        action: paymentsAction,
      },
      {
        path: "payment-detail",
        element: <PaymentDetail />,
        loader: paymentDetailLoader,
        action: paymentDetailAction,
      },
      {
        path: "student-type",
        element: <StudentType />,
        loader: studentTypeLoader,
        action: studentTypeAction,
      },
      {
        path: "student",
        element: <Student />,
        loader: studentLoader,
        action: studentAction,
      },
      {
        path: "upload-student",
        element: <UploadStudent />,
        loader: uploadStudentLoader,
        action: uploadStudentAction,
      },
      {
        path: "level",
        element: <Level />,
        loader: levelLoader,
        action: levelAction,
      },
      {
        path: "classroom",
        element: <ClassRoom />,
        loader: classroomLoader,
        action: classroomAction,
      },
    ],
  },
  {
    path: "login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
