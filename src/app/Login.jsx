import { Form } from "react-router-dom";
import {
  FaEye,
  FaEyeDropper,
  FaEyeSlash,
  FaKey,
  FaSpinner,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../components/auth/useAuth";
import Cookies from "js-cookie";
import { TextInput } from "../components/inputs";
import { DefaultButton } from "../components/buttons";
import logo from "../assets/ws-logo.png";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await login(formData);

    if (response && response.status === 404) {
      setError("ไม่พบผู้ใช้งาน (username) นี้");
      setIsError(true);
    }

    if (response && response.status === 403) {
      setError("password (พาสเวิร์ด) ไม่ถูกต้อง");
      setIsError(true);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 border border-sky-600 shadow-md shadow-sky-600 px-5 py-3 rounded mt-20">
        <img src={logo} width={60} height={60} />
        <div className="text-3xl font-bold">ระบบจัดการใบเสร็จ</div>
      </div>
      <div className="flex flex-col mt-24 border border-sky-600 shadow-md shadow-sky-600 rounded w-64 text-sky-600 font-bold">
        <div className="text-xl text-center bg-sky-600 p-3 text-white rounded-t">
          เข้าสู่ระบบ
        </div>
        <Form
          className="flex flex-col gap-3 p-3"
          method="post"
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <label className="flex flex-col">
            username
            <div className="flex items-center gap-3 border border-gray-600 rounded px-3 py-1 focus-within:outline outline-1 outline-black">
              <div>
                <FaUser className="w-5 h-5" />
              </div>
              <TextInput
                className="border-none outline-none w-full"
                type="text"
                name="username"
                id="username"
                disabled={isLoading}
              />
            </div>
          </label>
          <label className="flex flex-col">
            password
            <div className="flex items-center gap-3 border border-gray-600 rounded px-3 py-1 focus-within:outline outline-1 outline-black">
              <div>
                <FaKey className="w-5 h-5" />
              </div>
              <TextInput
                className="border-none outline-none w-full"
                type={isShowPassword ? "password" : "text"}
                name="password"
                id="password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <FaEye className="w-5 h-5" />
                ) : (
                  <FaEyeSlash className="w-5 h-5" />
                )}
              </button>
            </div>
          </label>
          <DefaultButton
            className="flex items-center gap-1 bg-sky-600 hover:bg-sky-400 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <FaSpinner className="w-5 h-5 animate-spin" />}
            เข้าระบบ
          </DefaultButton>
        </Form>
      </div>
      {isError && (
        <div className="flex justify-between items-center mt-5 p-3 bg-red-300 text-red-950 rounded w-80">
          <div>{error}</div>

          <button
            type="button"
            onClick={(e) => {
              setError("");
              setIsError(false);
            }}
          >
            <FaWindowClose className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
