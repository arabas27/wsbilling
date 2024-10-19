import {
  FaClock,
  FaEdit,
  FaFilePdf,
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
import PropTypes from "prop-types";
import { months_th } from "../../components/API.js";

function Popup({ setIsShowPopup, handleClickTogglePopupInstallment }) {
  return (
    <PopUpContainer>
      <Card
        className="bg-white w-full sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-6/12 p-3 "
        style={{ marginTop: window.scrollY + window.innerHeight / 30 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            กำหนดรายละเอียดของรายการชำระเพิ่มเติม
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
            <div className="text-lg font-bold">เด็กชายกันตภณ ลุยะพันธุ์</div>
          </div>

          <div className="flex flex-col gap-3 items-center my-3">
            <InputGroup className="w-full">
              <label htmlFor="paymentDetail">รายการชำระ</label>
              <Select
                className="w-full"
                name="paymentDetail"
                optionTexts={["เลือก", "ค่าจ้างบุคลากร"]}
              />
            </InputGroup>
            <div className="flex gap-3 w-full">
              <InputGroup className="w-full">
                <label htmlFor="amount">จำนวน</label>
                <NumberInput
                  className="w-full"
                  name="amount"
                  placeholder="ม.1,4"
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="cost">หน่วยละ</label>
                <NumberInput
                  className="w-full"
                  name="cost"
                  placeholder="1000"
                />
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
          <DefaultButton
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold"
            onClick={() => handleClickTogglePopupInstallment(true)}
          >
            ผ่อนชำระ
          </DefaultButton>
        </div>
        <div className="overflow-auto">
          <Table>
            <THead>
              <THeadRow>
                <THeadCol>
                  <input
                    type="checkbox"
                    name="popupCheckAll"
                    id="popupCheckAll"
                  />
                </THeadCol>
                <THeadCol>ผู้รับเงิน</THeadCol>
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
                <TCol className="text-start px-2">
                  ค่าจ้างบุคลากรที่ปฏิบัติหน้าที่ในสถานศึกษา
                </TCol>
                <TCol className="text-end px-2">1</TCol>
                <TCol className="text-end px-2">200.00</TCol>
                <TCol className="text-end px-2">200.00</TCol>
                <TCol className="text-end px-2">
                  <button className="flex items-center justify-center mx-auto">
                    <FaEdit className="w-5 h-5 text-yellow-600" />
                  </button>
                </TCol>
              </TRow>
            </tbody>
          </Table>
        </div>
      </Card>
    </PopUpContainer>
  );
}

Popup.propTypes = {
  setIsShowPopup: PropTypes.func,
  handleClickTogglePopupInstallment: PropTypes.func,
};

function PopupInstallment({
  setIsShowPopupInstallment,
  handleClickTogglePopupInstallment,
  handleClickTogglePopupManageInstallment,
}) {
  return (
    <PopUpContainer>
      <Card
        className="bg-white w-full sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-6/12 p-3 "
        style={{ marginTop: window.scrollY + window.innerHeight / 30 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">กำหนดรายการผ่อนชำระ</div>
          <DefaultButton
            className="text-xl font-bold rounded-full"
            onClick={() => setIsShowPopupInstallment(false)}
          >
            <FaWindowClose className="w-6 h-6" />
          </DefaultButton>
        </div>
        <hr className="border-b-4 border-sky-300" />

        <div className="flex flex-col gap-3 items-center mt-6 border border-sky-600 p-3 rounded md:w-9/12 mx-auto">
          <div className="flex gap-1 items-center w-full text-cyan-700 ">
            <FaUser className="w-6 h-6" />
            <div className="text-lg font-bold">เด็กชายกันตภณ ลุยะพันธุ์</div>
          </div>
          <div className="flex gap-3 items-start w-full">
            <div className="w-6/12 font-bold">จำนวนเงินที่ต้องชำระทั้งหมด</div>
            <div className="w-6/12">870.00 บาท</div>
          </div>
          <div className="flex gap-3 items-start w-full">
            <div className="w-6/12 font-bold">จำนวนเงินที่ชำระแล้ว</div>
            <div className="w-6/12">250.00 บาท</div>
          </div>
          <div className="flex gap-3 items-start w-full">
            <div className="w-6/12 font-bold">จำนวนเงินคงเหลือ</div>
            <div className="w-6/12">620.00 บาท</div>
          </div>
          <div className="flex w-full">
            <label className="w-6/12 font-bold" htmlFor="paymentDetail">
              สถานะใบเสร็จ
            </label>
            <Select
              className="w-6/12"
              name="paymentDetail"
              optionTexts={["ชำระแล้ว", "ยกเลิกใบเสร็จ"]}
            />
          </div>
        </div>

        {/* ตารางแสดงข้อมูล */}
        <div className="flex gap-3 my-3">
          <DefaultButton
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
            onClick={() => handleClickTogglePopupManageInstallment(true)}
          >
            เพิ่มรายการผ่อนชำระ
          </DefaultButton>
          <DefaultButton
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold"
            onClick={() => handleClickTogglePopupInstallment(false)}
          >
            ย้อนกลับ
          </DefaultButton>
        </div>
        <div className="overflow-auto">
          <Table>
            <THead>
              <THeadRow>
                <THeadCol>วันที่</THeadCol>
                <THeadCol>ครั้งที่</THeadCol>
                <THeadCol>จำนวนที่ชำระ</THeadCol>
                <THeadCol>เล่มที่</THeadCol>
                <THeadCol>เลขที่ใบเสร็จ</THeadCol>
                <THeadCol>รายละเอียด</THeadCol>
                <THeadCol className="w-16">พิมพ์ใบเสร็จ/ใบแทนใบเสร็จ</THeadCol>
                <THeadCol className="w-16">ยกเลิก</THeadCol>
              </THeadRow>
            </THead>
            <tbody>
              <TRow className="text-center" index={0}>
                <TCol className="px-2">13/10/2567</TCol>
                <TCol className="text-center px-2">1</TCol>
                <TCol className="text-end px-2">250.00</TCol>
                <TCol className="text-end px-2">17668</TCol>
                <TCol className="text-end px-2">0002</TCol>
                <TCol className="text-start px-2">ผ่อนชำระงวดที่ 1</TCol>
                <TCol className="px-2">
                  <button className="mx-auto text-red-600" type="button">
                    <FaFilePdf className="w-5 h-5" />
                  </button>
                </TCol>
                <TCol className="px-2">
                  <button className="mx-auto text-red-600" type="button">
                    <FaWindowClose className="w-5 h-5" />
                  </button>
                </TCol>
              </TRow>
            </tbody>
          </Table>
        </div>
      </Card>
    </PopUpContainer>
  );
}

PopupInstallment.propTypes = {
  setIsShowPopupInstallment: PropTypes.func,
  handleClickTogglePopupInstallment: PropTypes.func,
  handleClickTogglePopupManageInstallment: PropTypes.func,
};

function PopupManageInstallment({ handleClickTogglePopupManageInstallment }) {
  return (
    <PopUpContainer>
      <Card
        className="bg-white w-full sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-6/12 p-3 "
        style={{ marginTop: window.scrollY + window.innerHeight / 30 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">รายการชำระเงิน</div>
          <DefaultButton
            className="text-xl font-bold rounded-full"
            onClick={() => handleClickTogglePopupManageInstallment(false)}
          >
            <FaWindowClose className="w-6 h-6" />
          </DefaultButton>
        </div>
        <hr className="border-b-4 border-sky-300" />

        <div className="flex flex-col gap-3 items-center mt-6 border border-sky-600 p-3 rounded md:w-9/12 mx-auto">
          <div className="flex gap-1 items-center w-full text-cyan-700 ">
            <FaUser className="w-6 h-6" />
            <div className="text-lg font-bold">เด็กชายกันตภณ ลุยะพันธุ์</div>
          </div>
        </div>

        <div className="md:w-9/12 mx-auto">
          <div className="flex flex-col gap-3 items-center my-3">
            <InputGroup className="w-full">
              <label htmlFor="paidDate">วันที่ชำระ</label>
              <div className="flex gap-3">
                <Select
                  className="w-full"
                  name="paidDate"
                  optionTexts={[...Array(31).keys()].map((value) => value + 1)}
                />
                <div>/</div>
                <Select
                  className="w-full"
                  name="paidMonth"
                  optionTexts={months_th}
                />
                <div>/</div>
                <Select
                  className="w-full"
                  name="paidYear"
                  optionTexts={[...Array(10).keys()].map(
                    (value) => value + 2565
                  )}
                />
              </div>
            </InputGroup>
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <InputGroup className="w-full">
                <label htmlFor="recieveType">ประเภทใบเสร็จ</label>
                <Select
                  className="w-full"
                  name="recieveType"
                  optionTexts={["ใบเสร็จ สพฐ."]}
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="bookNumber">เล่มที่</label>
                <Select
                  className="w-full"
                  name="bookNumber"
                  optionTexts={["17668", "17669"]}
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="receiveNumber">เลขที่</label>
                <TextInput
                  className="w-full"
                  name="receiveNumber"
                  placeholder="0001"
                />
              </InputGroup>
            </div>
            <InputGroup className="w-full">
              <label htmlFor="paidTime">ผ่อนชำระครั้งที่</label>
              <NumberInput
                className="w-full"
                name="paidTime"
                defaultValue="2"
                disabled={true}
              />
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="paidDetail">รายละเอียด</label>
              <TextArea className="w-full" name="paidDetail" />
            </InputGroup>
          </div>
        </div>

        {/* ตารางแสดงข้อมูล */}

        <div className="text-lg font-bold my-1">รายการชำระ</div>

        <div className="overflow-auto">
          <Table>
            <THead>
              <THeadRow>
                <THeadCol>ชื่อรายการชำระ</THeadCol>
                <THeadCol>จำนวน</THeadCol>
                <THeadCol>หน่วยละ</THeadCol>
                <THeadCol>รวม</THeadCol>
                <THeadCol>ชำระแล้ว</THeadCol>
                <THeadCol>คงเหลือ</THeadCol>
                <THeadCol>ชำระครั้งนี้</THeadCol>
              </THeadRow>
            </THead>
            <tbody>
              <TRow className="text-start" index={0}>
                <TCol className="px-2">
                  จ้างบุคลากรที่ปฏิบัติหน้าที่ในสถานศึกษา
                </TCol>
                <TCol className="text-center px-2">1</TCol>
                <TCol className="text-end px-2">200.00</TCol>
                <TCol className="text-end px-2">200.00</TCol>
                <TCol className="text-end px-2">150.00</TCol>
                <TCol className="text-start px-2">50.00</TCol>
                <TCol className="px-2">
                  <NumberInput name="paid#itemid" />
                </TCol>
              </TRow>
              <TRow className="text-center" index={0}>
                <TCol className="px-2 font-bold" colSpan={3}>
                  รวม
                </TCol>
                <TCol className="text-end px-2">200.00</TCol>
                <TCol className="text-end px-2">150.00</TCol>
                <TCol className="text-end px-2">50.00</TCol>
                <TCol className="text-start px-2 text-end">0.00</TCol>
              </TRow>
            </tbody>
          </Table>
        </div>

        <div className="md:w-9/12 mx-auto">
          <div className="flex flex-col items-center my-3">
            <div className="flex gap-3 w-full">
              <div className="w-6/12 text-end">ยอดที่ต้องชำระทั้งหมด</div>
              <div className="w-3/12 font-bold text-end">870.00</div>
              <div className="w-3/12">บาท</div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="w-6/12 text-end">ยอดที่ชำระแล้ว</div>
              <div className="w-3/12 font-bold text-end">250.00</div>
              <div className="w-3/12">บาท</div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="w-6/12 text-end">ยอดที่ชำระครั้งนี้</div>
              <div className="w-3/12 font-bold text-end">0.00</div>
              <div className="w-3/12">บาท</div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="w-6/12 text-end">ยอดคงเหลือ</div>
              <div className="w-3/12 font-bold text-end">620.00</div>
              <div className="w-3/12">บาท</div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-9/12 border border-gray-300 shadow shadow-gray-600 p-3 rounded my-3">
              <InputGroup className="w-full">
                <label htmlFor="officer">ผู้รับเงิน</label>
                <Select
                  className="w-full"
                  optionTexts={["นางเอบี ซีดีดี"]}
                  name="officer"
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="officerPosition">ตำแหน่งผู้รับเงิน</label>
                <TextInput
                  className="w-full"
                  defaultValue="เจ้าหน้าที่การเงิน"
                  name="officerPosition"
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="payer">ผู้ชำระเงิน</label>
                <TextInput className="w-full" name="payer" />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="paymentMethod">วิธีชำระ</label>
                <Select
                  className="w-full"
                  optionTexts={["ผ่านธนาคาร", "เงินสด", "บัตรเครดิต"]}
                  name="paymentMethod"
                />
              </InputGroup>

              <label className="flex gap-1">
                <input
                  type="checkbox"
                  name="printReceive"
                  defaultChecked={true}
                />
                พิมพ์ใบเสร็จ
              </label>
            </div>

            <DefaultButton className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
              บันทึกรายการ
            </DefaultButton>
          </div>
        </div>
      </Card>
    </PopUpContainer>
  );
}

PopupManageInstallment.propTypes = {
  handleClickTogglePopupManageInstallment: PropTypes.func,
};

export default function ManageInstallment() {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowPopupInstallment, setIsShowPopupInstallment] = useState(false);
  const [isShowPopupManageInstallment, setIsShowPopupManageInstallment] =
    useState(false);

  function handleClickTogglePopup(value) {
    setIsShowPopup(value);
  }

  function handleClickTogglePopupInstallment(value) {
    if (value) {
      setIsShowPopup(false);
      setIsShowPopupInstallment(true);
    } else if (!value) {
      setIsShowPopup(true);
      setIsShowPopupInstallment(false);
    }
  }

  function handleClickTogglePopupManageInstallment(value) {
    if (value) {
      setIsShowPopupInstallment(false);
      setIsShowPopupManageInstallment(true);
    } else if (!value) {
      setIsShowPopupManageInstallment(false);
    }
  }

  const propForPopup = {
    setIsShowPopup: setIsShowPopup,
    handleClickTogglePopupInstallment: handleClickTogglePopupInstallment,
  };

  const propForPopupInstallment = {
    setIsShowPopupInstallment: setIsShowPopupInstallment,
    handleClickTogglePopupInstallment: handleClickTogglePopupInstallment,
    handleClickTogglePopupManageInstallment:
      handleClickTogglePopupManageInstallment,
  };

  const propForPopupManageInstallment = {
    handleClickTogglePopupManageInstallment:
      handleClickTogglePopupManageInstallment,
  };

  return (
    <div className="flex flex-col gap-3 p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            จัดการนักเรียนผ่อนชำระ
          </div>
        </div>

        {/* ต้นหาระบุรายละเอียดใบเสร็จ */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ระบุรายละเอียดใบเสร็จ</div>
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
              <label htmlFor="searchReceiver">ผู้ทำรายการ</label>
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

        {/* เลือกห้องเรียน */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">เลือกห้องเรียน</div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <div className="flex gap-3 items-center">
                <label htmlFor="searchLevel">เลือกระดับชั้น</label>
                <span>/</span>
                <label htmlFor="searchSection">ห้อง</label>
              </div>
              <div className="flex gap-3 items-center w-full">
                <Select
                  className="w-full"
                  name="searchLevel"
                  optionTexts={[
                    ...[...Array(6).keys()].map(
                      (value) => `มัธยมศึกษาปีที่ ${value + 1}`
                    ),
                    "มัธยมศึกษา จบการศึกษา",
                  ]}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="searchSection"
                  optionTexts={[
                    "ทั้งหมด",
                    ...[...Array(8).keys()].map((value) => `ห้อง ${value + 1}`),
                  ]}
                />
              </div>
            </InputGroup>
          </div>
        </Card>

        {/* เลือกนักเรียน */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">เลือกนักเรียน</div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
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
            <div className="w-10/12">
              <label className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name="isOnlyFullyPaid"
                  id="isOnlyFullyPaid"
                />
                เฉพาะคนที่ผ่อนชำระครบแล้ว
              </label>
            </div>
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
              <THeadCol className="w-12">เลขที่</THeadCol>
              <THeadCol className="w-16">รหัสประจำตัว</THeadCol>
              <THeadCol className="w-20">คำนำหน้า</THeadCol>
              <THeadCol>ชื่อ-นามสกุล</THeadCol>
              <THeadCol className="w-16">ห้อง</THeadCol>
              <THeadCol>ประเภทนักเรียน</THeadCol>
              <THeadCol className="w-28">ยอดต้องชำระ</THeadCol>
              <THeadCol className="w-28">ยอดชำระ</THeadCol>
              <THeadCol className="w-28">ยอดค้างชำระ</THeadCol>
              <THeadCol className="w-28">ผ่อนชำระ</THeadCol>
              <THeadCol className="w-16">ประวัติชำระ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="check_1" id="check_1" />
              </TCol>
              <TCol className="px-2">2</TCol>
              <TCol className="px-2">27275</TCol>
              <TCol className="text-center px-2">เด็กชาย</TCol>
              <TCol className="text-start px-2 text-nowrap">
                <button
                  className="text-cyan-700 hover:text-black"
                  type="button"
                  onClick={() => handleClickTogglePopup(true)}
                >
                  ก้องภพ ณุวงษ์ศรี
                </button>
              </TCol>
              <TCol className="px-2">ม.1/1</TCol>
              <TCol className="px-2">ห้องเรัยนชั้น ม.1,4</TCol>
              <TCol className="px-2 text-blue-600">870.00</TCol>
              <TCol className="px-2 text-green-600">200.00</TCol>
              <TCol className="px-2 text-red-600">670.00</TCol>
              <TCol className="px-2">
                <DefaultButton className="flex items-center justify-center mx-auto">
                  <FaClock className="w-5 h-5 text-blue-600" />
                </DefaultButton>
              </TCol>
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

      {/* แสดง pop up สร้างรายการผ่อนชำระ */}
      {isShowPopupInstallment && (
        <PopupInstallment {...propForPopupInstallment} />
      )}

      {/* แสดง pop up เพิ่มรายการผ่อนชำระ */}
      {isShowPopupManageInstallment && (
        <PopupManageInstallment {...propForPopupManageInstallment} />
      )}
    </div>
  );
}
