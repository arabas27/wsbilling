import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./app/Layout";
import ErrorPage from "./components/error-page";
import AcademicYear from "./app/setting/AcademicYear";
import Payments from "./app/setting/Payments";
import ReceiptType from "./app/setting/ReceiptType";
import Receipt from "./app/setting/Receipt";
import PaymentDetail from "./app/setting/PaymentDetail";
import OtherPayments from "./app/setting/OtherPayments";
import Receiver from "./app/setting/Receiver";
import ClassRoom from "./app/manageStudents/ClassRoom";
import Level from "./app/manageStudents/Level";
import UploadStudent from "./app/manageStudents/UploadStudent";
import Student from "./app/manageStudents/Student";
import ManageReceipt from "./app/manageReceipts/ManageReceipt";
import Login from "./app/Login";
import { AuthProvider } from "./components/auth/AuthProvider";
import {
  academicYearLoader,
  paymentDetailLoader,
  paymentsLoader,
  receiptLoader,
  receiptTypeLoader,
  receiverLoader,
} from "./app/route/setting/loaders";
import {
  academicYearAction,
  paymentDetailAction,
  paymentsAction,
  receiptAction,
  receiverAction,
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
import { manageReceiptLoader } from "./app/route/manageReceipt/loaders";
import { manageReceiptAction } from "./app/route/manageReceipt/actions";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Dashboard from "./app/Dashboard";
import ReportTotalReceipt from "./app/reports/ReportTotalReceipt";
import { basename } from "./app/config";
// import { generatePdf } from "./components/generatePDF";

const cookiesExpiredDate = new Date(2147483647 * 1000);

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <AuthProvider>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </AuthProvider>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "receipts",
          children: [
            {
              path: "manage-receipt",
              element: <ManageReceipt />,
              loader: manageReceiptLoader,
              action: manageReceiptAction,
            },
          ],
        },

        {
          path: "students",
          children: [
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
          path: "setting",
          children: [
            {
              path: "academicyear",
              element: <AcademicYear />,
              loader: academicYearLoader,
              action: academicYearAction,
            },
            {
              path: "receipt-type",
              element: <ReceiptType />,
              loader: receiptTypeLoader,
            },
            {
              path: "receipt",
              element: <Receipt />,
              loader: receiptLoader,
              action: receiptAction,
            },
            {
              path: "payments",
              element: <Payments />,
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
              // ยังไม่เสร็จ
              path: "other-payment",
              element: <OtherPayments />,
              // loader: otherPay,
              // action: paymentDetailAction,
            },
            {
              // ยังไม่เสร็จ
              path: "other-payment-type",
              // element: <Receiver />,
              // loader: receiverLoader,
              // action: receiverAction,
            },
            {
              // ยังไม่เสร็จ
              path: "payer",
              // element: <Receiver />,
              // loader: receiverLoader,
              // action: receiverAction,
            },
            {
              path: "receiver",
              element: <Receiver />,
              loader: receiverLoader,
              action: receiverAction,
            },
          ],
        },
        {
          path: "reports",
          children: [
            {
              path: "total-receipt",
              element: <ReportTotalReceipt />,
              // loader: academicYearLoader,
              // action: academicYearAction,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: (
        <AuthProvider>
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        </AuthProvider>
      ),
    },
  ],
  {
    basename: basename,
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
