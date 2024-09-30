import Card from "../../components/Card";
import { InputGroup, TextInput } from "../../components/inputs";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaLightbulb,
  FaPlusCircle,
  FaWindowClose,
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
import { PopUpContainer } from "../../components/popup";

export default function ReceiptType() {
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ประเภทใบเสร็จ
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
                placeholder="พิมพ์ประเภทใบเสร็จที่ต้องการค้นหา"
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
              <THeadCol>ประเภทใบเสร็จ</THeadCol>
              <THeadCol>ชื่อย่อ</THeadCol>
              <THeadCol>แบบฟอร์ม</THeadCol>
              <THeadCol>ขนาดกระดาษ</THeadCol>
              <THeadCol>โลโก้</THeadCol>
              <THeadCol>แนวกระดาษ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol>2</TCol>
              <TCol className="font-bold">2562</TCol>
              <TCol className="w-24"></TCol>
              <TCol className="w-24"></TCol>
              <TCol className="w-24"></TCol>
              <TCol className="w-24"></TCol>
              <TCol className="w-24"></TCol>
            </TRow>
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopUp && (
        <PopUpContainer>
          <Card className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">ประเภทใบเสร็จ</div>
              <DefaultButton
                className="text-xl font-bold rounded-full"
                onClick={() => setIsShowPopUp(false)}
              >
                <FaWindowClose className="w-6 h-6" />
              </DefaultButton>
            </div>
            <hr className="border-b-4 border-sky-300" />
            <div className="flex flex-col gap-3 items-center my-3">
              <InputGroup className="w-full">
                <label htmlFor="academicYear">ปีการศึกษา</label>
                <TextInput className="w-full" name="academicYear" />
              </InputGroup>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
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
        </PopUpContainer>
      )}
    </div>
  );
}
