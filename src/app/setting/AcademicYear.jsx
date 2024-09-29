import Card from "../../components/Card";
import { TextInput } from "../../components/inputs";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaLightbulb,
  FaPlusCircle,
} from "react-icons/fa";
import {
  Table,
  THead,
  THeadRow,
  THeadCol,
  TRow,
  TCol,
} from "../../components/table";
import { DefaultButton } from "../../components/buttons";
import { useState } from "react";

export default function AcademicYear() {
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  return (
    <div className="p-3">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ตั้งค่าปีการศึกษา
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน 0 รายการ</div>
          </div>
          <div className="flex items-center justify-center mt-9 mb-6">
            <div className="flex items-center justify-center gap-3 w-full">
              <TextInput
                className="w-full md:w-4/6"
                name="search"
                placeholder="พิมพ์ปีการศึกษาที่ต้องการค้นหา"
              />
              <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2">
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* ปุ่มเพิ่มรายการ */}
      <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setIsShowPopUp(true);
          }}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold">เพิ่มรายการ</div>
        </DefaultButton>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol>ที่</THeadCol>
              <THeadCol>ปีการศึกษา</THeadCol>
              <THeadCol>สถานะ</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol>2</TCol>
              <TCol className="font-bold">2562</TCol>
              <TCol className="w-24">
                <div className="flex items-center justify-center mx-auto">
                  <FaLightbulb className="w-5 h-5 text-green-600 mx-auto" />
                </div>
              </TCol>
              <TCol className="w-24">
                <button className="flex items-center justify-center mx-auto">
                  <FaEdit className="w-5 h-5 text-yellow-600" />
                </button>
              </TCol>
              <TCol className="w-24">
                <button className="flex items-center justify-center mx-auto">
                  <FaTrashAlt className="w-5 h-5 text-red-600" />
                </button>
              </TCol>
            </TRow>
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopUp && (
        <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50">
          <Card className="bg-white w-6/12 p-3">
            <div className="flex justify-between items-center py-3">
              <div className="text-xl font-bold">เพิ่มปีการศึกษา</div>
              <DefaultButton
                className="text-xl font-bold rounded-full px-6"
                onClick={() => setIsShowPopUp(false)}
              >
                X
              </DefaultButton>
            </div>
            <hr className="border-b-4 border-sky-300" />
            <div className="flex flex-col items-center">
              <div className="flex gap-3 items-center my-6">
                <div>ปีการศึกษา</div>
                <TextInput name="academicYear" />
              </div>
              <div className="flex gap-6">
                <DefaultButton className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                  บันทึก
                </DefaultButton>
                <DefaultButton
                  className="bg-red-600 hover:bg-red-500 text-white font-bold"
                  onClick={() => setIsShowPopUp(false)}
                >
                  ยกเลิก
                </DefaultButton>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
