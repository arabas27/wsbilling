import Card from "../../components/Card";
import {
  ControlledNumberInput,
  InputGroup,
  NumberInput,
  Select,
  TextInput,
} from "../../components/inputs";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaPowerOff,
  FaPlusCircle,
  FaWindowClose,
  FaUnlock,
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

export default function Receipt() {
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [amountOfReceipt, setAmountOfReceipt] = useState("1000");

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ตั้งค่าใบเสร็จรับเงิน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน 0 รายการ</div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <label htmlFor="searchType">ประเภทใบเสร็จ</label>
              <TextInput
                className="w-full"
                name="searchType"
                placeholder="พิมพ์เลขที่ใบเสร็จรับเงิน"
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="search">คำค้นหา</label>
              <div className="flex items-center justify-center gap-3 w-full">
                <TextInput
                  className="w-full"
                  name="search"
                  placeholder="พิมพ์เลขที่ใบเสร็จรับเงิน"
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
      <div className="flex gap-1 mt-10 mb-3">
        <DefaultButton
          className="flex flex-row bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setIsShowPopUp(true);
          }}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">เพิ่ม</div>
        </DefaultButton>
        <DefaultButton className="flex flex-row bg-red-600 hover:bg-red-500 text-white">
          <FaTrashAlt className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">ลบ</div>
        </DefaultButton>
        <DefaultButton className="flex  flex-row bg-yellow-300 hover:bg-yellow-200">
          <FaPowerOff className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">ปิดสถานะ</div>
        </DefaultButton>
        <DefaultButton className="flex  flex-row bg-green-600 hover:bg-green-500 text-white">
          <FaPowerOff className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">เปิดสถานะ</div>
        </DefaultButton>
        <DefaultButton className="flex  flex-row bg-gray-600 hover:bg-gray-500 text-white">
          <FaUnlock className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">
            ล้างสถานะผูกห้องเรียน
          </div>
        </DefaultButton>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol>
                <input type="checkbox" name="checkAll" id="checkAll" />
              </THeadCol>
              <THeadCol>ที่</THeadCol>
              <THeadCol>เลขที่ใบเสร็จ</THeadCol>
              <THeadCol>จำนวนใบเสร็จต่อเล่ม</THeadCol>
              <THeadCol>เลขที่ใบเสร็จที่ใช้ล่าสุด</THeadCol>
              <THeadCol>ชั้น/ห้อง &nbsp; (เขียนมือ)</THeadCol>
              <THeadCol>ประเภทใบเสร็จ</THeadCol>
              <THeadCol>รูปแบบใบเสร็จ</THeadCol>
              <THeadCol>แสดง</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="checkAll1" id="checkAll1" />
              </TCol>
              <TCol className="px-2">1002</TCol>
              <TCol className="px-2">17668</TCol>
              <TCol className="px-2">1000</TCol>
              <TCol className="px-2">0001</TCol>
              <TCol className="px-2"></TCol>
              <TCol className="px-2">ใบเสร็จรับเงิน สพฐ.</TCol>
              <TCol className="px-2">ใบเสร็จต่อเนื่อง</TCol>
              <TCol className="px-2">
                <div className="flex items-center justify-center mx-auto">
                  <FaPowerOff className="w-5 h-5 text-green-600 mx-auto" />
                </div>
              </TCol>
              <TCol className="px-2">
                <button className="flex items-center justify-center mx-auto">
                  <FaEdit className="w-5 h-5 text-yellow-600" />
                </button>
              </TCol>
              <TCol className="px-2">
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
              <div className="text-xl font-bold">เพิ่มใบเสร็จรับเงิน</div>
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
                <label htmlFor="bookNo">เล่มที่</label>
                <NumberInput name="bookNo" />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="form">รูปแบบใบเสร็จ</label>
                <Select
                  name="form"
                  optionTexts={["ใบเสร็จต่อเนื่อง", "ใบเสร็จเขียนมือ"]}
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="amountOfReceipt">
                  จำนวนใบเสร็จทั้งหมดต่อเล่ม
                </label>
                <ControlledNumberInput
                  name="amountOfReceipt"
                  value={amountOfReceipt}
                  onChange={(event) => {
                    setAmountOfReceipt(event.currentTarget.value);
                  }}
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="lastReceiptIndex">
                  เลขที่ใบเสร็จที่ใช้ล่าสุด
                </label>
                <NumberInput name="lastReceiptIndex" />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="receiptType">ประเภทใบเสร็จ</label>
                <Select
                  name="receiptType"
                  optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
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
