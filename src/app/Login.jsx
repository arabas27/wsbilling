import { Form } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../components/auth/useAuth";
import Cookies from "js-cookie";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await login(formData);

    setIsLoading(false);
  }

  console.log(Cookies.get("firstname"));

  return (
    <div>
      <form
        className="flex flex-col"
        method="post"
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <label className="flex flex-col">
          username
          <input
            className="border"
            type="text"
            name="username"
            id="username"
            disabled={isLoading}
          />
        </label>
        <label className="flex flex-col">
          password
          <input
            className="border"
            type="password"
            name="password"
            id="password"
            disabled={isLoading}
          />
        </label>
        <button
          className="flex items-center gap-1"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <FaSpinner className="w-5 h-5 animate-spin" />}
          เข้าระบบ
        </button>
      </form>
    </div>
  );
}
