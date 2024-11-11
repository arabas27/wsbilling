import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { position } from "../../app/config";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = Cookies.get("auth");
  const isLoginPath = pathname === "/login";
  const isAdmin = auth === position[0];
  const isAccountant = auth === position[1];
  const isDirector = auth === position[2];

  useEffect(() => {
    // ตัวกรอง
    // ถ้าไม่ใช้ user ให้ดีดไปหน้า login
    if (!isLoginPath && !auth) {
      navigate("/login", {
        replace: true,
      });
    }

    if (isLoginPath && auth) {
      navigate("/", {
        replace: true,
      });
    }
  }, [navigate, auth]);

  return children;
}
