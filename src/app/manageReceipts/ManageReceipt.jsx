import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaFilePdf,
  FaHistory,
  FaSearch,
  FaSpinner,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";
import Card from "../../components/Card";
import { DefaultButton } from "../../components/buttons";
import {
  InputGroup,
  NumberInput,
  SearchTextInput,
  Select,
  TextArea,
  TextInput,
} from "../../components/inputs";
import {
  Table,
  TCol,
  THead,
  THeadCol,
  THeadRow,
  TRow,
} from "../../components/table";
import { useEffect, useState } from "react";
import { PopupContainer } from "../../components/popup";
import { months_th_mini } from "../../components/API.js";
import PropTypes from "prop-types";
import { months_th } from "../../components/API.js";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import clsx from "clsx";
import OverlaySpinner from "../../components/OverlaySpinner.jsx";
import { user } from "../config.js";
import { twMerge } from "tailwind-merge";
import { generatePdfReceipt } from "../../components/generatePdfReceipt.jsx";

function Popup({ setIsShowPopup, handleClickTogglePopupInstallment }) {
  return (
    <PopupContainer>
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
    </PopupContainer>
  );
}

function PopupInstallment({
  setIsShowPopupInstallment,
  handleClickTogglePopupInstallment,
  handleClickTogglePopupManageInstallment,
}) {
  return (
    <PopupContainer>
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
    </PopupContainer>
  );
}

function PopupManageInstallment({ handleClickTogglePopupManageInstallment }) {
  return (
    <PopupContainer>
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
    </PopupContainer>
  );
}

const handleCheck = (e) => {
  const checkAll = document.querySelector('[name="checkAll"]');
  if (!e.target.checked && checkAll.checked) checkAll.checked = false;
};
const Row = (props) => {
  return (
    <TRow className="text-center" index={0}>
      <TCol className="px-2">
        <input
          type="checkbox"
          name={`checkbox#${props.id}`}
          id={`checkbox#${props.id}`}
          value={props.id}
          onChange={handleCheck}
        />
      </TCol>
      <TCol className="px-2">{props.seat_number}</TCol>
      <TCol className="px-2">{props.student_id}</TCol>
      <TCol className="text-center px-2">{props.title}</TCol>
      <TCol className="text-start px-2 text-nowrap">
        <button
          className="text-cyan-700 hover:text-black"
          type="button"
          onClick={() => props.handleClickTogglePopup(true)}
        >
          {`${props.firstname} ${props.lastname}`}
        </button>
      </TCol>
      <TCol className="px-2">{`ม.${props.class}/${props.section}`}</TCol>
      <TCol className="px-2">{props.student_type}</TCol>
      <TCol className="px-2">
        {props.paymentDetail.length > 0
          ? parseFloat(props.paymentDetail[0].payment).toFixed(2)
          : "ยังไม่กำหนด"}
      </TCol>
      <TCol className="px-2"></TCol>
      <TCol className="px-2">
        <DefaultButton className="flex items-center justify-center mx-auto">
          <div className="animate-[spin_10s_linear_infinite]">
            <FaHistory className="w-5 h-5 text-gray-600 -scale-x-100" />
          </div>
        </DefaultButton>
      </TCol>
    </TRow>
  );
};

const Pagination = (props) => {
  const displayedAmount = 5;
  /* item component */
  const Item = (props) => {
    const handleChangePage = () => {
      if (!props.value) {
        return;
      } else if (props.value === "moveOne") {
        // ถ้าเกินหน้าสูงสุด หยุดทำงาน
        if (parseInt(props.p) + 1 > parseInt(props.pageAmount)) return;
        props.setSearch((prev) => ({
          ...prev,
          p: parseInt(props.p) + 1,
          name: "p",
        }));
      } else if (props.value === "backOne") {
        // ถ้าน้อยกว่า 1 หยุดทำงาน
        if (parseInt(props.p) - 1 < 1) return;
        props.setSearch((prev) => ({
          ...prev,
          p: parseInt(props.p) - 1,
          name: "p",
        }));
      } else if (props.value === "moveTen") {
        // ข้ามไปข้างหน้า 10 หน้า แต่ไม่เกินจำนวนหน้าสูงสุด
        props.setSearch((prev) => ({
          ...prev,
          p:
            parseInt(props.p) + 10 > parseInt(props.pageAmount)
              ? parseInt(props.pageAmount)
              : parseInt(props.p) + 10,
          name: "p",
        }));
      } else if (props.value === "backTen") {
        props.setSearch((prev) => ({
          ...prev,
          p: parseInt(props.p) - 10 < 1 ? 1 : parseInt(props.p) - 10,
          name: "p",
        }));
      } else {
        props.setSearch((prev) => ({ ...prev, p: props.value, name: "p" }));
      }
    };
    /* item rendering */
    return (
      <button
        className={twMerge(
          clsx(
            "flex items-center border border-gray-300 rounded p-2 font-bold",
            props.className,
            {
              "text-teal-600": parseInt(props.value) === parseInt(props.p),
            }
          )
        )}
        name="p"
        onClick={handleChangePage}
        value={props.value}
      >
        {props.children}
      </button>
    );
  };

  /* rendering */
  return (
    <div className="flex justify-end my-3 text-sm sm:text-base">
      {/* items เสริม */}
      <Item
        className="text-slate-500"
        {...{
          children: <FaAngleDoubleLeft />,
          value: "backTen",
          setSearch: props.setSearch,
          pageAmount: props.pageAmount,
          p: props.p,
        }}
      />
      <Item
        className="text-slate-500"
        {...{
          children: <FaChevronLeft />,
          value: "backOne",
          setSearch: props.setSearch,
          pageAmount: props.pageAmount,
          p: props.p,
        }}
      />
      {/*       <Item className="text-slate-500" {...{ children: "...", value: null }} /> */}
      {/* loop item component */}
      {[...Array(props.pageAmount).keys()].map((value, index) => {
        if (
          value >= parseInt(props.p) - displayedAmount &&
          value <= parseInt(props.p) + (displayedAmount - 2)
        ) {
          return (
            <Item
              {...{
                children: value + 1,
                value: value + 1,
                p: props.p,
                setSearch: props.setSearch,
                pageAmount: props.pageAmount,
              }}
              key={index}
            />
          );
        } else {
          return null;
        }
      })}
      {/* item เสริม */}
      {/*  <Item className="text-slate-500" {...{ children: "...", value: null }} /> */}
      <Item
        className="text-slate-500"
        {...{
          children: <FaChevronRight />,
          value: "moveOne",
          setSearch: props.setSearch,
          pageAmount: props.pageAmount,
          p: props.p,
        }}
      />
      <Item
        className="text-slate-500"
        {...{
          children: <FaAngleDoubleRight />,
          value: "moveTen",
          setSearch: props.setSearch,
          pageAmount: props.pageAmount,
          p: props.p,
        }}
      />
    </div>
  );
};

export default function ManageReceipt() {
  const { state } = useNavigation();
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isShowPopupInstallment, setIsShowPopupInstallment] = useState(false);
  const [isShowPopupManageInstallment, setIsShowPopupManageInstallment] =
    useState(false);
  // const [search, setSearch] = useState({
  //   receiptType: "ใบเสร็จรับเงิน สพฐ.",
  //   bookNumber:
  //     loaderData.book_number.length > 0
  //       ? loaderData.book_number[0].book_number
  //       : "",
  //   receiptNumber:
  //     (
  //       parseInt(
  //         loaderData.book_number
  //           .filter(
  //             (el) =>
  //               el.book_number.toString() ===
  //               loaderData.book_number[0].book_number.toString()
  //           )
  //           .map((el) => el.last_receipt_number)[0]
  //       ) + 1
  //     )
  //       .toString()
  //       .padStart(5, "0") || "00001",
  //   date: parseInt(new Date().getDate()),
  //   month: parseInt(new Date().getMonth()) + 1,
  //   year: loaderData.academic_year
  //     .map((el) => el.academic_year)
  //     .includes(parseInt(new Date().getFullYear()) + 543)
  //     ? parseInt(new Date().getFullYear()) + 543
  //     : loaderData.academic_year[0].academic_year || "",
  //   semester: loaderData.s || "1",
  //   academicYear:
  //     loaderData.ay ||
  //     loaderData.academic_year
  //       .map((el) => el.academic_year)
  //       .includes(parseInt(new Date().getFullYear()) + 543)
  //       ? parseInt(new Date().getFullYear()) + 543
  //       : loaderData.academic_year[0].academic_year || "",
  //   receiver:
  //     loaderData.receiver.length > 0 ? loaderData.receiver[0].fullname : "",
  //   position: "เจ้าหน้าที่การเงิน",
  //   level: loaderData.lv || "",
  //   class: "",
  //   section: loaderData.sect || "",
  //   studentType: loaderData.st || "",
  //   p: loaderData.p || "1",
  //   q: loaderData.q || "",
  //   paymentMethod: "เงินสด",
  //   name: "",
  // });
  const [search, setSearch] = useState({
    receiptType: "ใบเสร็จรับเงิน สพฐ.",
    bookNumber: "",
    receiptNumber: "",
    date: "",
    month: "",
    year: "",
    semester: "1",
    academicYear: "",
    receiver: "",
    position: "เจ้าหน้าที่การเงิน",
    level: "",
    class: "",
    section: "",
    studentType: "",
    p: "1",
    q: "",
    paymentMethod: "เงินสด",
    name: "",
  });
  const [validate, setValidate] = useState({});
  const [total, setTotal] = useState(0);
  const [pageAmount, setPageAmount] = useState(0);
  // const pageAmount = total !== 0 ? Math.ceil(parseInt(total) / 50) : 0;
  const navigate = useNavigate();
  const [fetchFirstTime, setFetchFirstTime] = useState(true);
  const [rowProps, setRowProps] = useState({});
  const [paginationProps, setPaginationProps] = useState({});
  // load data by fetcher
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("./");
    }

    if (fetcher.state === "idle" && fetcher.data && fetchFirstTime) {
      setSearch({
        receiptType: "ใบเสร็จรับเงิน สพฐ.",
        bookNumber:
          fetcher.data.book_number.length > 0
            ? fetcher.data.book_number[0].book_number
            : "",
        receiptNumber:
          (
            parseInt(
              fetcher.data.book_number
                .filter(
                  (el) =>
                    el.book_number.toString() ===
                    fetcher.data.book_number[0].book_number.toString()
                )
                .map((el) => el.last_receipt_number)[0]
            ) + 1
          )
            .toString()
            .padStart(5, "0") || "00001",
        date: parseInt(new Date().getDate()),
        month: parseInt(new Date().getMonth()) + 1,
        year: fetcher.data.academic_year
          .map((el) => el.academic_year)
          .includes(parseInt(new Date().getFullYear()) + 543)
          ? parseInt(new Date().getFullYear()) + 543
          : fetcher.data.academic_year[0].academic_year || "",
        semester: fetcher.data.s || "1",
        academicYear:
          fetcher.data.ay ||
          fetcher.data.academic_year
            .map((el) => el.academic_year)
            .includes(parseInt(new Date().getFullYear()) + 543)
            ? parseInt(new Date().getFullYear()) + 543
            : fetcher.data.academic_year[0].academic_year || "",
        receiver:
          fetcher.data.receiver.length > 0
            ? fetcher.data.receiver[0].fullname
            : "",
        position: "เจ้าหน้าที่การเงิน",
        level: fetcher.data.lv || "",
        class: "",
        section: fetcher.data.sect || "",
        studentType: fetcher.data.st || "",
        p: fetcher.data.p || "1",
        q: fetcher.data.q || "",
        paymentMethod: "เงินสด",
        name: "",
      });

      setFetchFirstTime(false);
    }

    if (fetcher.state === "idle" && fetcher.data) {
      setTotal(fetcher.data.counter[0].counter);

      setRowProps({
        handleClickTogglePopup,
        paymentDetail: fetcher.data.payment_detail,
      });

      setPaginationProps({
        pageAmount,
        setSearch,
        p: fetcher.data.p,
      });
    }
  }, [fetcher, pageAmount]);

  // set page amount
  useEffect(() => {
    setPageAmount(total !== 0 && Math.ceil(parseInt(total) / 50));
  }, [total]);

  // submit ค้นหา
  useEffect(() => {
    if (
      [
        "academicYear",
        "studentType",
        "level",
        "section",
        "semester",
        "q",
        "p",
      ].includes(search.name)
    ) {
      // navigate(
      //   `./?ay=${search.academicYear}&st=${search.studentType}&lv=${search.level}&sect=${search.section}&q=${search.q}&s=${search.semester}&bn=${search.bookNumber}&p=${search.p}`
      // );
      fetcher.load(
        `./?ay=${search.academicYear}&st=${search.studentType}&lv=${search.level}&sect=${search.section}&q=${search.q}&s=${search.semester}&bn=${search.bookNumber}&p=${search.p}`
      );
    }
  }, [search]);

  // เปิด pop up เมื่อกดปุ่ม ชื่อ
  const handleClickTogglePopup = (value) => {
    setIsShowPopup(value);
  };
  // pop up ชั้น 2
  const handleClickTogglePopupInstallment = (value) => {
    if (value) {
      setIsShowPopup(false);
      setIsShowPopupInstallment(true);
    } else if (!value) {
      setIsShowPopup(true);
      setIsShowPopupInstallment(false);
    }
  };
  // pop up ขั้น 3
  const handleClickTogglePopupManageInstallment = (value) => {
    if (value) {
      setIsShowPopupInstallment(false);
      setIsShowPopupManageInstallment(true);
    } else if (!value) {
      setIsShowPopupManageInstallment(false);
    }
  };

  // ค้นหา
  let delay = null;
  const handleGetSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "q") {
      setIsTyping(true);
      if (delay) clearTimeout(delay);
      delay = setTimeout(() => {
        setSearch((prev) => ({ ...prev, [name]: value, name: name }));
        setIsTyping(false);
      }, 1000);
    } else {
      setSearch((prev) => ({ ...prev, [name]: value, name: name }));

      if (name === "level") {
        setSearch((prev) => ({
          ...prev,
          section: "",
          class: value ? /\d+/.exec(value)[0] : "",
        }));
      }

      if (name === "bookNumber") {
        setSearch((prev) => ({
          ...prev,
          receiptNumber: value
            ? (
                parseInt(
                  fetcher.data.book_number
                    .filter(
                      (el) => el.book_number.toString() === value.toString()
                    )
                    .map((el) => el.last_receipt_number)[0]
                ) + 1
              )
                .toString()
                .padStart(5, "0")
            : "00001",
        }));
      }
    }
    validate[name] && setValidate((prev) => ({ ...prev, [name]: "" }));
  };
  // check all
  const handleCheckAll = (e) => {
    const checkAll = e.target;
    const checkbox = document.querySelectorAll('[name^="checkbox#"]');

    checkbox.forEach((el) => (el.checked = checkAll.checked));
  };

  // บันทึกข้อมูล และสร้าง pdf
  const handleSaveRecord = () => {
    // เก็บ id ของข้อมูลที่เลือกจาก checkbox value
    const checkAll = document.querySelector('[name="checkAll"]');
    const checkbox = document.querySelectorAll('[name^="checkbox#"]');
    const selectedID = [];
    checkbox.forEach((el) => {
      if (el.checked) selectedID.push(parseInt(el.value));
    });

    // filter เอาเฉพาะข้อมูลที่เลือกมาเก็บไว้
    const students = fetcher.data.students
      .filter((el) => selectedID.includes(parseInt(el.id)))
      .map((el) => ({
        id: el.id,
        studentID: el.student_id,
        fullname: `${el.title}${el.firstname} ${el.lastname}`,
        level: el.level,
        class: /\d+/.exec(el.level)[0],
        section: el.section,
      }));

    // ตรวจข้อมูล
    let error = false;
    for (const key of Object.keys(search)) {
      if (
        !search[key] &&
        !["level", "section", "q", "class", "name"].includes(key)
      ) {
        setValidate((prev) => ({
          ...prev,
          [key]: "* จำเป็นต้องเลือกหรือพิมพ์ข้อมูล",
        }));

        error = true;
      }
    }

    if (selectedID.length === 0) {
      error = true;
      setValidate((prev) => ({
        ...prev,
        selectedID: "* เลือกนักเรียนเพื่อดำเนินการ",
      }));
    }

    if (error) return;

    // สร้างข้อมูลสำหรับสร้าง pdf
    const pdfProps = [];
    let i = 0;
    students.forEach((el) => {
      pdfProps.push({
        bookNumber: search.bookNumber,
        receiptNumber: (parseInt(search.receiptNumber) + i)
          .toString()
          .padStart(5, "0"),
        date: `${search.date} ${months_th[parseInt(search.month) - 1]} ${
          search.year
        }`,
        academicYear: search.academicYear,
        semester: search.semester,
        payer: `${el.fullname} ม.${el.class}/${el.section} รหัสประจำตัว ${el.studentID}`,
        items: loaderData.payment_detail.map((el) => ({
          did: el.did,
          diid: el.diid,
          payment_list: el.payment_list,
          unit: el.unit,
          price_per_unit: el.price_per_unit,
          total: el.total,
        })),
        payment: loaderData.payment_detail[0].payment,
        receiver: search.receiver,
        position: search.position,
      });

      i += 1;
    });

    const formData = new FormData();

    formData.append("action", "create-record");
    formData.append("status", "ชำระแล้ว");
    // วิธีชำระ
    formData.append("method", search.paymentMethod);
    formData.append("receiptType", search.receiptType);
    formData.append("semester", search.semester);
    formData.append("academicYear", search.academicYear);
    formData.append("bookNumber", search.bookNumber);
    formData.append("receiptNumber", search.receiptNumber);
    formData.append("date", search.date);
    formData.append("month", search.month);
    formData.append("year", search.year);
    // formData.append("studentID");
    formData.append("students", JSON.stringify(students));
    // formData.append("level", search.level);
    // formData.append("class", search.class);
    // formData.append("section", search.section);
    formData.append("studentType", search.studentType);
    formData.append(
      "detail",
      fetcher.data.payment_detail.length > 0
        ? fetcher.data.payment_detail.map((el) =>
            JSON.stringify({
              did: el.did,
              diid: el.diid,
              payment_list: el.payment_list,
              unit: el.unit,
              price_per_unit: el.price_per_unit,
              total: el.total,
            })
          )
        : ""
    );
    formData.append("payment", fetcher.data.payment_detail[0].payment);
    formData.append("user", user);

    setSearch((prev) => ({
      ...prev,
      receiptNumber: (parseInt(search.receiptNumber) + students.length)
        .toString()
        .padStart(5, "0"),
    }));

    checkbox.forEach((el) => (el.checked = false));
    checkAll.checked = false;

    // สร้าง pdf
    generatePdfReceipt({ ...pdfProps });

    submit(formData, {
      method: "POST",
    });
  };

  // const rowProps = {
  //   handleClickTogglePopup,
  //   paymentDetail: loaderData.payment_detail,
  // };

  // const paginationProps = {
  //   pageAmount,
  //   setSearch,
  //   p: loaderData.p,
  // };

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
            จัดการใบเสร็จ
          </div>
        </div>

        {/* ต้นหาระบุรายละเอียดใบเสร็จ */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ระบุรายละเอียดใบเสร็จ</div>
            <div>จำนวน {loaderData.counter[0].counter} รายการ</div>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <label htmlFor="receiptType">ประเภท</label>
              <Select
                name="receiptType"
                optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
                value={search.receiptType}
                onChange={handleGetSearch}
              />
              <div className="text-red-600">{validate.receiptType}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="bookNumber">เล่มที่</label>
              <Select
                name="bookNumber"
                optionTexts={[
                  "เลือก",
                  ...loaderData.book_number.map((el) => el.book_number),
                ]}
                optionValues={[
                  "",
                  ...loaderData.book_number.map((el) => el.book_number),
                ]}
                value={search.bookNumber}
                onChange={handleGetSearch}
              />
              <div className="text-red-600">{validate.bookNumber}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="receiptNumber">เลขที่</label>
              <NumberInput
                name="receiptNumber"
                placeholder="00000"
                value={search.receiptNumber}
                onChange={handleGetSearch}
              />
              <div className="text-red-600">{validate.receiptNumber}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="date">ลงวันที่</label>
              <div className="flex items-center gap-3">
                <Select
                  className="w-full"
                  name="date"
                  optionTexts={[
                    ...[...Array(31).keys()].map((value) => value + 1),
                  ]}
                  optionValues={[
                    ...[...Array(31).keys()].map((value) => value + 1),
                  ]}
                  value={search.date}
                  onChange={handleGetSearch}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="month"
                  optionTexts={[...[...months_th_mini]]}
                  optionValues={[
                    ...[...Array(12).keys()].map((value) => value + 1),
                  ]}
                  value={search.month}
                  onChange={handleGetSearch}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="year"
                  optionTexts={[
                    ...(loaderData.academic_year.length > 0
                      ? loaderData.academic_year.map((el) => el.academic_year)
                      : ["ไม่พบรายการ"]),
                  ]}
                  optionValues={[
                    ...(loaderData.academic_year.length > 0
                      ? loaderData.academic_year.map((el) => el.academic_year)
                      : [""]),
                  ]}
                  value={search.year}
                  onChange={handleGetSearch}
                />
              </div>
              <div className="text-red-600">{validate.date}</div>
              <div className="text-red-600">{validate.month}</div>
              <div className="text-red-600">{validate.year}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <div className="flex gap-3 items-center">
                <label htmlFor="semester">เทอม</label>
                <span>/</span>
                <label htmlFor="academicYear">ปี</label>
              </div>
              <div className="flex gap-3 items-center w-full">
                <Select
                  className="grow"
                  name="semester"
                  optionTexts={["1", "2"]}
                  value={search.semester}
                  onChange={handleGetSearch}
                />
                <span>/</span>
                <Select
                  className="grow"
                  name="academicYear"
                  optionTexts={[
                    ...(loaderData.academic_year.length > 0
                      ? loaderData.academic_year.map((el) => el.academic_year)
                      : "ไม่พบรายการ"),
                  ]}
                  optionValues={[
                    ...(loaderData.academic_year.length > 0
                      ? loaderData.academic_year.map((el) => el.academic_year)
                      : ""),
                  ]}
                  value={search.academicYear}
                  onChange={handleGetSearch}
                />
              </div>
              <div className="text-red-600">{validate.semester}</div>
              <div className="text-red-600">{validate.academicYear}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="receiver">ผู้รับเงิน</label>
              <Select
                name="receiver"
                optionTexts={[
                  ...(loaderData.receiver.length > 0
                    ? loaderData.receiver.map((el) => el.fullname)
                    : ["ไม่พบรายการ"]),
                ]}
                optionValues={[
                  ...(loaderData.receiver.length > 0
                    ? loaderData.receiver.map((el) => el.fullname)
                    : [""]),
                ]}
                value={search.receiver}
                onChange={handleGetSearch}
              />
              <div className="text-red-600">{validate.receiver}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="position">ตำแหน่ง</label>
              <TextInput
                className="w-full"
                name="position"
                placeholder="เจ้าหน้าที่การเงิน"
                value={search.position}
                onChange={handleGetSearch}
              />
              <div className="text-red-600">{validate.position}</div>
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
                <label htmlFor="level">เลือกระดับชั้น</label>
                <span>/</span>
                <label htmlFor="section">ห้อง</label>
              </div>
              <div className="flex gap-3 items-center w-full">
                <Select
                  className="w-full"
                  name="level"
                  optionTexts={[
                    "ทั้งหมด",
                    ...loaderData.level.map((el) => el.level),
                  ]}
                  optionValues={["", ...loaderData.level.map((el) => el.level)]}
                  value={search.level}
                  onChange={handleGetSearch}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="section"
                  optionTexts={[
                    "ทั้งหมด",
                    ...loaderData.classroom
                      .filter((el) => el.level === search.level)
                      .map((el) => el.classroom),
                  ]}
                  optionValues={[
                    "",
                    ...loaderData.classroom
                      .filter((el) => el.level === search.level)
                      .map((el) => el.section),
                  ]}
                  value={search.section}
                  onChange={handleGetSearch}
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
              <label htmlFor="studentType">ประเภทนักเรียน</label>
              <Select
                className="w-full"
                name="studentType"
                optionTexts={[
                  "เลือก",
                  ...loaderData.student_type.map((el) => el.student_type),
                ]}
                optionValues={[
                  "",
                  ...loaderData.student_type.map((el) => el.student_type),
                ]}
                value={search.studentType}
                onChange={handleGetSearch}
              />
              <div className="text-red-600">{validate.studentType}</div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="q">คำค้นหา</label>
              <div
                className="flex items-center justify-center gap-3 w-full border border-gray-600 px-3 py-1 rounded focus-within:outline outline-2 -outline-offset-1 outline-black"
                autoComplete="off"
              >
                <SearchTextInput
                  className="peer w-full"
                  name="q"
                  placeholder="พิมพ์ปีการศึกษาที่ต้องการค้นหา"
                  value={search.q}
                  onChange={handleGetSearch}
                />
                <FaSpinner
                  className={clsx("animate-spin w-4 h-4", {
                    hidden: !isTyping,
                  })}
                />
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      {/* ปุ่มบันทึก */}
      <div className="flex items-stretch gap-3">
        <InputGroup>
          <label htmlFor="paymentMethod">วิธีการชำระ</label>
          <Select
            className="w-full"
            name="paymentMethod"
            optionTexts={["เงินสด", "ผ่านธนาคาร", "บัตรเครดิต"]}
            value={search.paymentMethod}
            onChange={handleGetSearch}
          />
        </InputGroup>
        <div className="flex flex-col justify-end">
          <DefaultButton
            className="bg-teal-600 hover:bg-teal-500 font-bold text-white"
            onClick={handleSaveRecord}
          >
            บันทึก
          </DefaultButton>
        </div>
      </div>
      {/* alert */}
      {validate.hasOwnProperty("selectedID") && (
        <div className="flex justify-between items-center bg-red-300 text-red-950 p-3 rounded">
          <div>{validate.selectedID}</div>
          <button
            type="button"
            onClick={(e) => e.currentTarget.parentNode.remove()}
          >
            <FaWindowClose />
          </button>
        </div>
      )}
      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol className="w-8">
                <input
                  type="checkbox"
                  name="checkAll"
                  id="checkAll"
                  onChange={handleCheckAll}
                />
              </THeadCol>
              <THeadCol className="w-12">เลขที่</THeadCol>
              <THeadCol className="w-16">รหัสประจำตัว</THeadCol>
              <THeadCol className="w-20">คำนำหน้า</THeadCol>
              <THeadCol>ชื่อ-นามสกุล</THeadCol>
              <THeadCol className="w-16">ห้อง</THeadCol>
              <THeadCol>ประเภทนักเรียน</THeadCol>
              <THeadCol className="w-28">ยอดชำระ</THeadCol>
              <THeadCol className="w-28">ผ่อนชำระ</THeadCol>
              <THeadCol className="w-16">ประวัติชำระ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {fetcher.data &&
              fetcher.data.students.length > 0 &&
              fetcher.data.students.map((el, index) => (
                <Row {...{ ...el, ...rowProps }} key={index} />
              ))}

            {fetcher.data && fetcher.data.students.length === 0 && (
              <tr>
                <td className="text-center p-3" colSpan={10}>
                  - ไม่พบรายการ -
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Pagination {...paginationProps} />

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

      {/* loading */}
      {state !== "idle" && <OverlaySpinner />}
    </div>
  );
}
