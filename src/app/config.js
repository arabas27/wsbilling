import Cookies from "js-cookie";

// API path
export const apiPath = "http://localhost:8000/ws-school-billing";
// export const apiPath = "https://www.wirarat.ac.th/api/wsbilling";
export const basename = "/wsbilling/";

// ค่า user
export const user = `${Cookies.get("title")}${Cookies.get(
  "firstname"
)} ${Cookies.get("lastname")}`;

// ค่าสถานะการจ่ายเงินของนักเรียนในแต่ละเทอม
// manageReceipt
export const semesterStatus = ["ยังไม่จ่าย", "จ่ายแล้ว", "ผ่อนชำระ", "ยกเว้น"];

// ค่าสถานะการใช้งานข้อมูลของนักเรียน
// students
export const studentStatus = ["ปกติ", "ปิด"];

// สถานะเล่มที่ใบเสร็จ
export const bookNumberStatus = ["เปิด", "ปิด"];

// สถานะปีการศึกษา
export const academicYearStatus = ["เปิด", "ปิด"];

// ตำแหน่ง auth
export const position = ["ผู้ดูแลระบบ", "เจ้าหน้าที่การเงิน", "ผู้อำนวยการ"];

// ตำแหน่ง auth
export const receiptType = ["ใบเสร็จรับเงิน สพฐ."];
