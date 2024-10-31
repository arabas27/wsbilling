import { createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { apiPath } from "../../app/config";

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  // ตัว redirect
  const navigate = useNavigate();

  // login function
  const login = useCallback(async (formData) => {
    // login และจำค่า user ใน cookie
    try {
      const response = await fetch(`${apiPath}/read/read-login.php`, {
        body: formData,
        method: "post",
      })
        .then(async (data) => data.json())
        .catch((error) => ({ status: 400, message: error }));

      // ถ้าพบ user ให้ทำการบันทึก cookies
      if (response.status === 200) {
        // const expiredDate = new Date(2147483647 * 1000);
        const cookieApi = Cookies.withAttributes({ path: "", expires: 365 });
        cookieApi.set("username", response.data.username);
        cookieApi.set("auth", response.data.auth);
        cookieApi.set("token", response.data.token);
        cookieApi.set("title", response.data.title);
        cookieApi.set("firstname", response.data.firstname);
        cookieApi.set("lastname", response.data.lastname);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
    // redirect ไม่ยังหน้าแรก
  }, []);

  // call this function to sign out logged in user
  const logout = useCallback(async () => {
    // ล้างค่า user ใน cookie
    // redirect ไปยังหน้า login
  }, []);

  // จำค่า user ไว้ใน context
  const value = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
