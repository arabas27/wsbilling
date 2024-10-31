import { useEffect, useState } from "react";
import Card from "../../components/Card";
import {
  InputGroup,
  SearchTextInput,
  TextInput,
} from "../../components/inputs";
import {
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaWindowClose,
  FaSpinner,
  FaPowerOff,
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
import { PopupContainer } from "../../components/popup";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import OverlaySpinner from "../../components/OverlaySpinner";
import { user } from "../config";

function SearchForm({ totalData }) {
  const { q } = useLoaderData();
  // เรียก state เพื่อตรวจสอบสถานะ page เพื่อแสดง loading spinner
  const { state } = useNavigation();
  // ตรวจสอบการพิมพ์ในกล่องค้นหา
  const [isTyping, setIsTyping] = useState(false);
  const submit = useSubmit();
  // ตัวแปร delay สำหรับ delay เวลา submit ระหว่างพิมพ์ค้นหา
  let delay = null;

  useEffect(() => {
    state === "idle" && setIsTyping(false);
  }, [state]);

  // ฟังชั้นรับค่าการพิมพ์ที่เปลี่ยนแปลง
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

function Popup({ data, setIsShowPopup, creator }) {
  const submit = useSubmit();

  // focus กล่องข้อความ เมื่อเรียก pop up
  useEffect(() => {
    const input = document.getElementById("academicYear");
    input.focus();
    return () => {
      input.focus();
    };
  }, []);

  // functionn ส่งข้อความ
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const academicYear = formData.get("academicYear");

    formData.append("id", data.id);
    formData.append("action", data.action);
    formData.append("creator", creator);
    formData.append("updater", creator);

    const cf = confirm(
      `ต้องการ${
        data.action === "create"
          ? "เพิ่ม"
          : data.action === "update"
          ? "แก้ไขเป็น"
          : " - "
      }รายการ ${formData.get("academicYear")}`
    );

    if (cf) {
      if (academicYear.length !== 4) {
        alert("ปีการศึกษาต้องมีความยาว 4 ตัวเลข");
        return;
      } else {
        setIsShowPopup(false);
        submit(formData, {
          method: "post",
        });
      }
    }
  }

  return (
    <PopupContainer>
      <Card
        className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3"
        style={{ marginTop: window.scrollY + window.innerHeight / 7 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">เพิ่มปีการศึกษา</div>
          <DefaultButton
            className="text-xl font-bold rounded-full px-0"
            onClick={() => setIsShowPopup(false)}
          >
            <FaWindowClose className="w-6 h-6" />
          </DefaultButton>
        </div>
        <hr className="border-b-4 border-sky-300" />
        <form method="post" autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 items-center my-3">
            <InputGroup className="w-full">
              <label htmlFor="academicYear">ปีการศึกษา</label>
              <TextInput
                className="text-end"
                name="academicYear"
                defaultValue={data ? data.academicYear : ""}
              />
            </InputGroup>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 self-end">
              <DefaultButton
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
              >
                บันทึก
              </DefaultButton>
              <DefaultButton
                className="bg-red-600 hover:bg-red-500 text-white font-bold"
                onClick={(event) => {
                  event.preventDefault();
                  setIsShowPopup(false);
                }}
              >
                ยกเลิก
              </DefaultButton>
            </div>
          </div>
        </form>
      </Card>
    </PopupContainer>
  );
}

function Row({ data, index, editor, handleUpdate }) {
  const submit = useSubmit();

  function handleToggleStatus(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("action", "toggleStatus");
    formData.append("id", data.id);
    formData.append("status", data.status === "ใช้งาน" ? "ยกเลิก" : "ใช้งาน");
    formData.append("editor", editor);

    submit(formData, {
      body: formData,
      method: "POST",
    });
  }

  function handleDelete(event) {
    event.preventDefault();
    const cf = confirm(`ต้องการลบรายการ ${data.academic_year} หรือไม่?`);

    if (cf) {
      const formData = new FormData(event.currentTarget);
      formData.append("action", "delete");
      formData.append("id", data.id);

      submit(formData, {
        body: formData,
        method: "POST",
      });
    }
  }

  return (
    <TRow className="text-center">
      <TCol className="px-2 w-12">{index + 1}</TCol>
      <TCol className="px-2 font-bold">{data.academic_year}</TCol>
      <TCol className="w-16">
        <Form method="post" onSubmit={handleToggleStatus}>
          <button className="flex items-center justify-center mx-auto">
            <FaPowerOff
              className={clsx("w-5 h-5 mx-auto", {
                "text-green-600": data.status === "ใช้งาน",
                "text-red-600": data.status === "ยกเลิก",
              })}
            />
          </button>
        </Form>
      </TCol>
      <TCol className="w-16">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handleUpdate}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </button>
      </TCol>
      <TCol className="w-16">
        <Form method="post" onSubmit={handleDelete}>
          <button className="flex items-center justify-center mx-auto">
            <FaTrashAlt className="w-5 h-5 text-red-600" />
          </button>
        </Form>
      </TCol>
    </TRow>
  );
}

export default function AcademicYear() {
  const { data } = useLoaderData();
  // const data = loaderData ? loaderData.data : null;
  // ตรวจสอบสถานะ page loading
  const { state } = useNavigation();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    id: "",
    action: "",
    academicYear: "",
  });
  // ตรวจสอบสถานะ loading
  const [isLoading, setIsLoading] = useState(state !== "idle");

  // ปรับสถานะ loading ของ page
  useEffect(() => {
    setIsLoading(state !== "idle");
  }, [state]);

  // ฟังชั้นอัพเดตข้อมูล
  function handleUpdate(data) {
    // ตั้งค่าให้ข้อมูลใน pop up
    setPopupData({
      id: data.id.toString(),
      action: "update",
      academicYear: data.academic_year.toString(),
    });
    // เปิด pop up
    setIsShowPopup(true);
  }

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ตั้งค่าปีการศึกษา
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <SearchForm totalData={data.length} />
      </div>

      {/* ปุ่มรายการ */}
      <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setPopupData({ id: "", action: "create", academicYear: "" });
            setIsShowPopup(true);
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
              <THeadCol>ปีการศึกษา</THeadCol>
              <THeadCol>สถานะ</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {!data ? (
              <tr>
                <td className="text-center p-3" colSpan={5}>
                  เกิดข้อผิดพลาด
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className="text-center p-3" colSpan={5}>
                  ไม่พบรายการค้นหา
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <Row
                  data={data}
                  index={index}
                  key={index}
                  editor={user}
                  handleUpdate={() => handleUpdate(data)}
                />
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopup && (
        <Popup
          data={popupData}
          setIsShowPopup={setIsShowPopup}
          creator={user}
        />
      )}

      {/* แสดงสถานะโหลด */}
      {isLoading && <OverlaySpinner />}
    </div>
  );
}
