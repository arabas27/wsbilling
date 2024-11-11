import {
  FaEdit,
  FaHistory,
  FaSearch,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";
import Card from "../../components/Card.jsx";
import { DefaultButton } from "../../components/buttons.jsx";
import {
  InputGroup,
  NumberInput,
  Select,
  TextArea,
  TextInput,
} from "../../components/inputs.jsx";
import {
  Table,
  TCol,
  THead,
  THeadCol,
  THeadRow,
  TRow,
} from "../../components/table.jsx";
import { useState } from "react";
import { PopUpContainer } from "../../components/popup.jsx";
import { months_th_mini } from "../../components/API.js";
import PropTypes from "prop-types";

function Popup({ setIsShowPopup }) {
  return (
    <PopUpContainer>
      <Card
        className="bg-white w-full sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-6/12 p-3 "
        style={{ marginTop: window.scrollY + window.innerHeight / 30 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            กำหนดรายละเอียดของรายการชำระเงินอื่น ๆ
          </div>
          <DefaultButton
            className="text-xl font-bold rounded-full"
            onClick={() => setIsShowPopup(false)}
          >
            <FaWindowClose className="w-6 h-6" />
          </DefaultButton>
        </div>
        <hr className="border-b-4 border-sky-300" />

        <div className="md:w-9/12 mx-auto">
          <div className="flex gap-3 items-center mt-6 border border-sky-600 p-3 rounded text-cyan-700">
            <FaUser className="w-6 h-6" />
            <div className="text-lg font-bold">
              ครอบครัว &quot;เอี่ยมวรวุฒิกุล&quot;
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center my-3">
            <InputGroup className="w-full">
              <label htmlFor="paymentDetail">รายการ</label>
              <Select
                className="w-full"
                name="paymentDetail"
                optionTexts={["เลือก", "ค่าแผงอาหาร", "ค่าสนับสนุนการศึกษา"]}
              />
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="paymentDetail">รายละเอียดเพิ่มเติม</label>
              <TextArea className="w-full" name="paymentDetail" rows={3} />
            </InputGroup>
            <div className="flex gap-3 w-full">
              <InputGroup className="w-full">
                <label htmlFor="amount">จำนวน</label>
                <NumberInput className="w-full" name="amount" />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="cost">หน่วยละ</label>
                <NumberInput className="w-full" name="cost" />
              </InputGroup>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
              <DefaultButton className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                เพิ่มรายการ
              </DefaultButton>
            </div>
          </div>
        </div>

        {/* ตารางแสดงข้อมูล */}
        <div className="flex gap-3 mb-3">
          <DefaultButton className="bg-red-600 hover:bg-red-500 text-white font-bold">
            ลบรายการ
          </DefaultButton>
        </div>
        <div className="overflow-auto">
          <Table>
            <THead>
              <THeadRow>
                <THeadCol>
                  <input type="checkbox" name="checkAll" id="checkAll" />
                </THeadCol>
                <THeadCol>รายการ</THeadCol>
                <THeadCol className="w-16">จำนวน</THeadCol>
                <THeadCol className="w-16">หน่วยละ</THeadCol>
                <THeadCol className="w-16">จำนวนเงิน</THeadCol>
                <THeadCol className="w-16">แก้ไข</THeadCol>
              </THeadRow>
            </THead>
            <tbody>
              <TRow className="text-center" index={0}>
                <TCol className="px-2">
                  <input
                    type="checkbox"
                    name="popupCheck_1"
                    id="popupCheck_1"
                  />
                </TCol>
                <TCol className="text-start px-2">เงินสนับสนุนการศึกษา</TCol>
                <TCol className="text-end px-2">1</TCol>
                <TCol className="text-end px-2">500.00</TCol>
                <TCol className="text-end px-2">500.00</TCol>
                <TCol className="text-end px-2">
                  <button className="flex items-center justify-center mx-auto">
                    <FaEdit className="w-5 h-5 text-yellow-600" />
                  </button>
                </TCol>
              </TRow>
            </tbody>
          </Table>
        </div>

        <div className="flex gap-3 my-3 justify-end">
          <DefaultButton className="bg-green-600 hover:bg-green-500 font-bold text-white">
            บันทึก
          </DefaultButton>
          <DefaultButton className="bg-red-600 hover:bg-red-500 font-bold text-white">
            ยกเลิก
          </DefaultButton>
        </div>
      </Card>
    </PopUpContainer>
  );
}

Popup.propTypes = {
  setIsShowPopup: PropTypes.func,
  handleClickTogglePopupInstallment: PropTypes.func,
};

export default function ManageOtherReceipt() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  function handleClickTogglePopup(value) {
    setIsShowPopup(value);
  }

  function handleClickTogglePopupInstallment(value) {
    if (value) {
      setIsShowPopup(false);
    } else if (!value) {
      setIsShowPopup(true);
    }
  }

  const propForPopup = {
    setIsShowPopup: setIsShowPopup,
    handleClickTogglePopupInstallment: handleClickTogglePopupInstallment,
  };

  return (
    <div className="flex flex-col gap-3 p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            จัดการใบเสร็จรับเงินอื่น ๆ
          </div>
        </div>

        {/* ต้นหาระบุรายละเอียดใบเสร็จ */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">
              ระบุรายละเอียดใบเสร็จรับเงินอื่น ๆ
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiptType">ประเภท</label>
              <Select
                name="searchReceiptType"
                optionTexts={["ใบเสร็จรับเงิน สพฐ.", "-"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchBookNumber">เล่มที่</label>
              <Select
                name="searchBookNumber"
                optionTexts={["17669", "17670"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiptNumber">เลขที่</label>
              <NumberInput name="searchReceiptNumber" defaultValue="0007" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchDate">ลงวันที่</label>
              <div className="flex items-center gap-3">
                <Select
                  className="w-full"
                  name="searchDate"
                  optionTexts={[
                    "วันที่",
                    ...[...Array(31).keys()].map((value) => value + 1),
                  ]}
                  optionValues={[
                    "0",
                    ...[...Array(31).keys()].map((value) => value + 1),
                  ]}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="searchMonth"
                  optionTexts={["เดือน", ...[...months_th_mini]]}
                  optionValues={["0", ...[...months_th_mini]]}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="searchYear"
                  optionTexts={[
                    "ปี",
                    ...[...Array(10).keys()].map((value) => value + 2565),
                  ]}
                  optionValues={[
                    "0",
                    ...[...Array(10).keys()].map((value) => value + 2565),
                  ]}
                />
              </div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <div className="flex gap-3 items-center">
                <label htmlFor="searchSemester">เทอม</label>
                <span>/</span>
                <label htmlFor="searchAcademicYear">ปี</label>
              </div>
              <div className="flex gap-3 items-center w-full">
                <Select
                  className="grow"
                  name="searchSemester"
                  optionTexts={["1", "2"]}
                />
                <span>/</span>
                <Select
                  className="grow"
                  name="searchAcademicYear"
                  optionTexts={["2567", "2568"]}
                />
              </div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiver">ผู้รับเงิน</label>
              <Select
                name="searchReceiver"
                optionTexts={["นายเอ เอ", "นางสาวบี บี"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiverPosition">ตำแหน่ง</label>
              <TextInput
                className="w-full"
                name="searchReceiverPosition"
                placeholder="เจ้าหน้าที่การเงิน"
                defaultValue="เจ้าหน้าที่การเงิน"
              />
            </InputGroup>
          </div>
        </Card>

        {/* เลือกนักเรียน */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">เลือกผู้จ่ายเงิน</div>
            <div>
              จำนวนที่พบ <span>139</span> รายการ
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <label htmlFor="searchStudentType">ประเภทผู้จ่ายเงิน</label>
              <Select
                className="w-full"
                name="searchStudentType"
                optionTexts={["ทั้งหมด", "ร้านค้า", "สมาคมศิษย์เก่า วส."]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="search">คำค้นหา</label>
              <div className="flex items-center justify-center gap-3 w-full">
                <TextInput
                  className="w-full"
                  name="search"
                  placeholder="พิมพ์รายการรับชำระอื่น ๆ ที่ต้องการค้นหา"
                />
                <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2">
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      <div className="flex">
        <DefaultButton className="bg-teal-600 hover:bg-teal-500 font-bold text-white">
          บันทึก
        </DefaultButton>
      </div>

      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol className="w-8">
                <input type="checkbox" name="checkAll" id="checkAll" />
              </THeadCol>
              <THeadCol className="w-12">ที่</THeadCol>
              <THeadCol className="w-16">รหัส</THeadCol>
              <THeadCol>ชื่อผู้จ่ายเงิน</THeadCol>
              <THeadCol>ประเภทผู้จ่ายเงิน</THeadCol>
              <THeadCol className="w-16">ประวัติการจ่ายเงิน</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="check_1" id="check_1" />
              </TCol>
              <TCol className="px-2">2</TCol>
              <TCol className="px-2">27275</TCol>
              <TCol className="text-start px-2 text-nowrap">
                <button
                  className="text-cyan-700 hover:text-black"
                  type="button"
                  onClick={() => handleClickTogglePopup(true)}
                >
                  ครอบครัว &quot;เอี่ยมวรวุฒิกุล&quot;
                </button>
              </TCol>
              <TCol className="px-2">สมาคมศิษย์เก่า วส.</TCol>
              <TCol className="px-2">
                <DefaultButton className="flex items-center justify-center mx-auto">
                  <div className="animate-[spin_10s_linear_infinite]">
                    <FaHistory className="w-5 h-5 text-gray-600 -scale-x-100" />
                  </div>
                </DefaultButton>
              </TCol>
            </TRow>
          </tbody>
        </Table>
      </div>

      {/* แสดง pop up กำหนดรายละเอียดเพิ่มเติม */}
      {isShowPopup && <Popup {...propForPopup} />}
    </div>
  );
}
