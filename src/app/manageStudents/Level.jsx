import Card from "../../components/Card";
import { InputGroup, Select, TextInput } from "../../components/inputs";
import {
  FaSearch,
  FaPlusCircle,
  FaWindowClose,
  FaEdit,
  FaTrashAlt,
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

export default function Level() {
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ระดับชั้นเรียน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน 0 รายการ</div>
          </div>
          <div className="flex items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <label htmlFor="search">คำค้นหา</label>
              <div className="flex items-center justify-center gap-3 w-full">
                <TextInput
                  className="w-full"
                  name="search"
                  placeholder="พิมพ์ระดับชั้นที่ต้องการค้นหา"
                />
                <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2">
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setIsShowPopUp(true);
          }}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold">เพิ่ม</div>
        </DefaultButton>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol>ที่</THeadCol>
              <THeadCol>ระดับชั้นเรียน</THeadCol>
              <THeadCol>ชื่อย่อ</THeadCol>
              <THeadCol>ประเภทระดับชั้น</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol>1</TCol>
              <TCol className="font-bold">มัธยมศึกษาปีที่ 1</TCol>
              <TCol>ม.1</TCol>
              <TCol>มัธยมศึกษา</TCol>
              <TCol className="w-16">
                <button className="flex items-center justify-center mx-auto">
                  <FaEdit className="w-5 h-5 text-yellow-600" />
                </button>
              </TCol>
              <TCol className="w-16">
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
        <PopUpContainer>
          <Card
            className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3"
            style={{ marginTop: window.scrollY + window.innerHeight / 7 }}
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">ระดับชั้นเรียน</div>
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
                <label htmlFor="studentType">ระดับชั้นเรียน</label>
                <TextInput
                  className="w-full"
                  name="studentType"
                  placeholder="พิมพ์ระดับชั้นเรียน"
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="shortTermReceipt">ชื่อย่อระดับชั้นเรียน</label>
                <TextInput
                  className="w-full"
                  name="shortTermReceipt"
                  placeholder="ม.1"
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="levelType">ชื่อย่อระดับชั้นเรียน</label>
                <Select
                  className="w-full"
                  name="levelType"
                  optionTexts={["เลือก", "มัธยมศึกษา"]}
                />
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
