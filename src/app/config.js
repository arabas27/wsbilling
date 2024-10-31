import Cookies from "js-cookie";

export const apiPath = "http://localhost:8000/ws-school-billing";
export const user = `${Cookies.get("title")}${Cookies.get(
  "firstname"
)} ${Cookies.get("lastname")}`;
