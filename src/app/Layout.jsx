import { Link, Outlet } from "react-router-dom";
import wsLogo from "../assets/ws-logo.png";
import {
  FaPowerOff,
  FaRegChartBar,
  FaFileInvoiceDollar,
  FaUsers,
  FaPrint,
  FaCog,
  FaInfoCircle,
  FaDotCircle,
} from "react-icons/fa";
import { useAuth } from "../components/auth/useAuth";
import Cookies from "js-cookie";

function NavBar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between p-3 bg-sky-600 text-white">
      <Link className="flex gap-3 items-center" to="/">
        <img
          className="bg-white rounded-full shadow shadow-gray-600"
          src={wsLogo}
          alt="logo"
          width={50}
          height={50}
        />
        <div className="text-3xl font-bold hidden md:block">
          โรงเรียนเบตง &quot;วีระราษฎร์ประสาน&quot;
        </div>
      </Link>
      <div className="flex flex-col items-end">
        <div className="text-xl font-bold">{`${Cookies.get(
          "firstname"
        )} ${Cookies.get("lastname")}`}</div>
        <button
          href="#"
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <div>ออกจากระบบ</div>
          <FaPowerOff className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </nav>
  );
}

function Navigator() {
  return (
    <div className="flex text-sm xl:text-xl font-bold items-center justify-center bg-slate-100">
      {/* Dashboard */}
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaRegChartBar className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">Dashboard</div>
        </div>
      </div>
      {/* จัดการใบเสร็จ */}
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaFileInvoiceDollar className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">จัดการใบเสร็จ</div>
        </div>
        <div className="absolute z-10 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              {/* <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ยกเว้นการชำระ
                </a>
              </li> */}
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="/receipts/manage-receipt"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  เพิ่ม/พิมพ์ใบเสร็จค่าเทอม
                </Link>
              </li>
              {/* <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ค้นหา/จัดการใบเสร็จค่าเทอม
                </a>
              </li> */}
              {/* <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  เพิ่ม/พิมพ์ใบเสร็จรับเงินอื่น ๆ
                </a>
              </li> */}
              {/* <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ค้นหาและจัดการใบเสร็จรับเงินอื่น ๆ
                </a>
              </li> */}
              {/* <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ค้นหาและจัดการใบเสร็จภาพรวม
                </a>
              </li> */}
              {/* <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  แก้ไขใบเสร็จผิดพลาด
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/* จัดการนักเรียน */}
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaUsers className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">จัดการนักเรียน</div>
        </div>
        <div className="absolute z-10 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <Link className="flex items-center gap-1" to="students/student">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ข้อมูลนักเรียน
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  href="#"
                  to="students/upload-student"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  นำเข้าข้อมูล
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="students/student-type"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  จัดการประเภทนักเรียน
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link className="flex items-center gap-1" to="students/level">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  จัดการระดับชั้น
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="students/classroom"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  จัดการห้องเรียน
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* พิมพ์รายงาน */}
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaPrint className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">พิมพ์ออกรายงาน</div>
        </div>
        {/* <div className="absolute z-10 right-0 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="reports/total-receipt"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รายงานสรุปใบเสร็จรับเงินค่าเทอม
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      {/* ตั้งค่า */}
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaCog className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">ตั้งค่าข้อมูล</div>
        </div>
        <div className="absolute z-10 right-0 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="setting/academicyear"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ปีการศึกษา
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="setting/receipt-type"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ประเภทใบเสร็จ
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link className="flex items-center gap-1" to="setting/receipt">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ใบเสร็จรับเงิน
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link className="flex items-center gap-1" to="setting/payments">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รายการชำระเงิน
                </Link>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="setting/payment-detail"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  กำหนดรายละเอียดการชำระเงิน
                </Link>
              </li>
              {/* <li className="border-b py-2 hover:text-sky-600">
                <Link
                  className="flex items-center gap-1"
                  to="setting/other-payment"
                >
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รายการชำระเงินอื่น ๆ
                </Link>
              </li> */}
              <li className="border-b py-2 hover:text-sky-600">
                <Link className="flex items-center gap-1" to="setting/receiver">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ผู้รับเงิน
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ช่วยเหลือ */}
      {/* <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaInfoCircle className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">ช่วยเหลือ</div>
        </div>
        <div className="absolute z-10 right-0 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รวมคู่มือ
                </a>
              </li>
              <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  เปลี่ยนรหัสผ่าน
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default function Layout() {
  return (
    <>
      <NavBar />
      <Navigator />
      <Outlet />
    </>
  );
}
