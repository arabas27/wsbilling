import Card from "../../components/Card";
import { InputGroup, SearchTextInput } from "../../components/inputs";
import { FaSpinner } from "react-icons/fa";
import {
  Table,
  THead,
  THeadRow,
  THeadCol,
  TRow,
  TCol,
} from "../../components/table";
import { useEffect, useState } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import OverlaySpinner from "../../components/OverlaySpinner";

function SearchForm({ totalData }) {
  const { q } = useLoaderData();
  const { state } = useNavigation();
  const [isTyping, setIsTyping] = useState(false);
  const submit = useSubmit();
  let delay = null;

  useEffect(() => {
    state === "idle" && setIsTyping(false);
  }, [state]);

  // ฟังชั้นรับค้าที่เปลี่ยนแปลง
  function handleChange(event) {
    event.preventDefault();
    // เรียกสปินเนอร์ในช่องค้นหา
    setIsTyping(true);

    const formData = new FormData(event.currentTarget.form);

    // รอ 1 วิ เพื่อขอข้อมูลจาก api
    if (delay) clearTimeout(delay);
    delay = setTimeout(() => {
      submit(formData, { method: "GET" });
    }, 1000);
  }

  return (
    <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
      <div className="flex justify-between border-b-4 border-sky-300">
        <div className="text-lg font-bold">ค้นหา</div>
        <div>จำนวน {totalData} รายการ</div>
      </div>
      <div className="flex items-center justify-center my-3">
        <InputGroup className="w-10/12">
          <label htmlFor="q">คำค้นหา</label>
          <Form
            className="flex items-center justify-center gap-3 w-full border border-gray-600 px-3 py-1 rounded focus-within:outline outline-2 -outline-offset-1 outline-black"
            autoComplete="off"
          >
            <SearchTextInput
              className="peer w-full"
              name="q"
              placeholder="พิมพ์ปีการศึกษาที่ต้องการค้นหา"
              onChange={handleChange}
              defaultValue={q}
            />
            <FaSpinner
              className={clsx("animate-spin w-4 h-4", { hidden: !isTyping })}
            />
          </Form>
        </InputGroup>
      </div>
    </Card>
  );
}

function Row({ data, index }) {
  return (
    <TRow className="text-center">
      <TCol>{index + 1}</TCol>
      <TCol className="text-start font-bold px-2">{data.full_name}</TCol>
      <TCol className="text-start px-2">{data.short_name}</TCol>
      <TCol className="text-start px-2">{data.form}</TCol>
      <TCol></TCol>
      <TCol></TCol>
      <TCol>{data.logo === "" ? "ไม่ใช้โลโก้" : "ใช้โลโก้"}</TCol>
      <TCol></TCol>
    </TRow>
  );
}

export default function ReceiptType() {
  const { data } = useLoaderData();
  /* const [isShowPopUp, setIsShowPopUp] = useState(false); */
  // ตรวจสอบสถานะ loading
  // ตรวจสอบสถานะ page loading
  const { state } = useNavigation();
  // const [cookies] = useCookies("title");
  const [isLoading, setIsLoading] = useState(state !== "idle");

  // ปรับสถานะ loading ของ page
  useEffect(() => {
    setIsLoading(state !== "idle");
  }, [state]);

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
        <SearchForm totalData={data.length} />
      </div>

      {/* ปุ่มรายการ */}
      {/* <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setIsShowPopUp(true);
          }}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold">เพิ่ม</div>
        </DefaultButton>
      </div> */}

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol>ที่</THeadCol>
              <THeadCol>ประเภทใบเสร็จ</THeadCol>
              <THeadCol>ชื่อย่อ</THeadCol>
              <THeadCol>แบบฟอร์ม</THeadCol>
              <THeadCol>ชื่อรายงาน</THeadCol>
              <THeadCol>ขนาดกระดาษ</THeadCol>
              <THeadCol>โลโก้</THeadCol>
              <THeadCol>แนวกระดาษ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {!data || data.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-3">
                  - ไม่พบรายการ -
                </td>
              </tr>
            ) : (
              data.map((value, index) => (
                <Row data={value} index={index} key={index} />
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {/*  {isShowPopUp && (
        <PopupContainer>
          <Card
            className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3"
            style={{ marginTop: window.scrollY + window.innerHeight / 7 }}
          >
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
                <label htmlFor="receipt">ประเภทใบเสร็จ</label>
                <TextInput
                  className="w-full"
                  name="receipt"
                  placeholder="ใบเสร็จรับเงิน สพฐ."
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="shortTermReceipt">ชื่อย่อประเภทใบเสร็จ</label>
                <TextInput
                  className="w-full"
                  name="shortTermReceipt"
                  placeholder="ค่าบำรุงการศึกษา"
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="form">แบบฟอร์ม</label>
                <Select
                  className="w-full"
                  name="form"
                  optionTexts={[
                    "ใบเสร็จ สพฐ. กระดาษต่อเนื่อง",
                    "ใบเสร็จ ออกแบบเอง กระดาษ A4",
                    "ใบเสร็จ หน้าเปล่า กระดาษต่อเนื่อง",
                    "ใบเสร็จ ออกแบบเองตามฟอร์มของโรงเรียน",
                  ]}
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="receiptId">ลำดับที่</label>
                <NumberInput className="w-full" name="receiptId" />
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
        </PopupContainer>
      )} */}

      {/* แสดงสถานะโหลด */}
      {isLoading && <OverlaySpinner />}
    </div>
  );
}
