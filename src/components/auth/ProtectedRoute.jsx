import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // code ตัวกรอง

  return children;
}
