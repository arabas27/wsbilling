import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./app/Layout";
import ErrorPage from "./components/error-page";
import PaymentDetail from "./app/setting/PaymentDetail";
import Login from "./app/Login";
import { AuthProvider } from "./components/auth/AuthProvider";
import { paymentDetailLoader } from "./app/route/setting/loaders";

const cookiesExpiredDate = new Date(2147483647 * 1000);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PaymentDetail />,
        loader: paymentDetailLoader,
        // action: paymentsAction,
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
