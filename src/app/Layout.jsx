import { Outlet } from "react-router-dom";
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

function NavBar() {
  return (
    <nav className="flex justify-between p-3 bg-sky-600 text-white">
      <div className="flex gap-3 items-center">
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
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xl font-bold">เจ้าหน้าที่การเงิน</div>
        <a href="#" className="flex items-center gap-2">
          <div>ออกจากระบบ</div>
          <FaPowerOff className="w-5 h-5 text-red-500" />
        </a>
      </div>
    </nav>
  );
}

function Navigator() {
  return (
    <div className="flex text-sm xl:text-xl font-bold items-center justify-center bg-slate-100">
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaRegChartBar className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">Dashboard</div>
        </div>
      </div>
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaFileInvoiceDollar className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">จัดการใบเสร็จ</div>
        </div>
        <div className="absolute z-10 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ยกเว้นการชำระ
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  เพิ่ม/พิมพ์ใบเสร็จค่าเทอม
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ค้นหา/จัดการใบเสร็จค่าเทอม
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ค้นหา/จัดการใบเสร็จค่าเทอม
                </a>
              </li>
              <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  จัดการข้อมูลพื้นฐาน
                </a>
              </li>
              <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  จัดการการผ่อนชำระ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaUsers className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">จัดการนักเรียน</div>
        </div>
        <div className="absolute z-10 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ข้อมูลนักเรียน
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  นำเข้าข้อมูล
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  แก้ไขข้อมูล
                </a>
              </li>
              <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  จัดการข้อมูลพื้นฐาน
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaPrint className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">พิมพ์ออกรายงาน</div>
        </div>
      </div>
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
        <div className="flex flex-col lg:flex-row items-center gap-1 px-5 sm:px-6 py-6">
          <FaCog className="sm:w-6 sm:h-6" />
          <div className="hidden md:block">ตั้งค่าข้อมูล</div>
        </div>
        <div className="absolute z-10 right-0 text-black font-normal text-base bg-white hidden group-hover:block">
          <div className="border-4 rounded px-3 py-2">
            <ul>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ปีการศึกษา
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ประเภทใบเสร็จ
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ใบเสร็จรับเงิน
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รายการรับ
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รายละเอียดรายการรับ
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  รายการรับอื่น
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ประเภทผู้จ่ายเงิน
                </a>
              </li>
              <li className="border-b py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ผู้จ่ายเงิน
                </a>
              </li>
              <li className="py-2 hover:text-sky-600">
                <a className="flex items-center gap-1" href="#">
                  <FaDotCircle className="w-3 h-3 text-sky-600" />
                  ผู้จ่ายเงิน
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative group rounded hover:bg-black hover:text-white text-nowrap cursor-pointer">
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
      </div>
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
