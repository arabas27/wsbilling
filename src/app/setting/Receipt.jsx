import Card from "../../components/Card";
import {
  ControlledNumberInput,
  InputGroup,
  NumberInput,
  SearchTextInput,
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
  FaSpinner,
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
import { useCallback, useEffect, useState } from "react";
import { PopupContainer } from "../../components/popup";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import OverlaySpinner from "../../components/OverlaySpinner";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { user } from "../config";

function Popup({ data, setIsShowPopUp, creator }) {
  const submit = useSubmit();
  const [validate, setValidate] = useState({
    bookNumber: "",
    receiptAmountPerBook: "",
    lastReceiptNumber: "",
  });

  function handleCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("id", data.id);
    formData.append("creator", creator);
    formData.append("updater", creator);
    formData.append("action", data.action);

    // ตรวจสอบข้อมูล
    let error = false;

    if (formData.get("bookNumber").trim() === "") {
      setValidate((prev) => ({
        ...prev,
        bookNumber: "พิมพ์เล่มที่",
      }));
      error = true;
    }

    if (formData.get("receiptAmountPerBook").trim() === "") {
      setValidate((prev) => ({
        ...prev,
        receiptAmountPerBook: "พิมพ์จำนวนใบเสร็จ",
      }));
      error = true;
    }

    if (formData.get("lastReceiptNumber").trim() === "") {
      setValidate((prev) => ({
        ...prev,
        lastReceiptNumber: "พิมพ์เลขที่ใบเสร็จที่ใช้ล่าสุด",
      }));
      error = true;
    }
    // ถ้าข้อมูลไม่ถูกต้อง error จะเป็น true ให้หยุดการดำเนินการตรงนี้
    if (error) {
      return;
    }

    submit(formData, {
      method: "POST",
    });

    // ปิดหน้า pop up
    setIsShowPopUp(false);
  }

  return (
    <PopupContainer>
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
        <Form
          className="flex flex-col gap-3 items-center my-3"
          method="POST"
          onSubmit={handleCreate}
          autoComplete="off"
        >
          <InputGroup className="w-full">
            <label htmlFor="bookNumber">เล่มที่</label>
            <NumberInput
              name="bookNumber"
              defaultValue={data.bookNumber}
              onClick={(event) => event.currentTarget.select()}
              onChange={() => {
                if (validate.bookNumber !== "")
                  setValidate((prev) => ({ ...prev, bookNumber: "" }));
              }}
            />
            <div className="text-red-600">{validate.bookNumber}</div>
          </InputGroup>
          <InputGroup className="w-full">
            <label htmlFor="form">รูปแบบใบเสร็จ</label>
            <Select
              name="form"
              defaultValue={data.form}
              optionTexts={["ใบเสร็จต่อเนื่อง", "ใบเสร็จเขียนมือ"]}
            />
          </InputGroup>
          <InputGroup className="w-full">
            <label htmlFor="receiptAmountPerBook">
              จำนวนใบเสร็จทั้งหมดต่อเล่ม
            </label>
            <NumberInput
              name="receiptAmountPerBook"
              defaultValue={data.receiptAmountPerBook}
              onClick={(event) => event.currentTarget.select()}
              onChange={() => {
                if (validate.receiptAmountPerBook !== "")
                  setValidate((prev) => ({
                    ...prev,
                    receiptAmountPerBook: "",
                  }));
              }}
            />
            <div className="text-red-600">{validate.receiptAmountPerBook}</div>
          </InputGroup>
          <InputGroup className="w-full">
            <label htmlFor="lastReceiptNumber">เลขที่ใบเสร็จที่ใช้ล่าสุด</label>
            <NumberInput
              name="lastReceiptNumber"
              defaultValue={data.lastReceiptNumber}
              onClick={(event) => event.currentTarget.select()}
              onChange={() => {
                if (validate.lastReceiptNumber !== "")
                  setValidate((prev) => ({ ...prev, lastReceiptNumber: "" }));
              }}
            />
            <div className="text-red-600">{validate.lastReceiptNumber}</div>
          </InputGroup>
          <InputGroup className="w-full">
            <label htmlFor="receiptType">ประเภทใบเสร็จ</label>
            <Select
              name="receiptType"
              defaultValue={data.receiptType}
              optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
            />
          </InputGroup>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
            <DefaultButton
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
            >
              บันทึก
            </DefaultButton>
            <DefaultButton
              className="bg-red-600 hover:bg-red-500 text-white font-bold"
              onClick={() => setIsShowPopUp(false)}
            >
              ยกเลิก
            </DefaultButton>
          </div>
        </Form>
      </Card>
    </PopupContainer>
  );
}

function Row({ data, index, handleEdit, handleDelete, user }) {
  const submit = useSubmit();

  const handleEditStatus = () => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("action", "toggleStatus");
    formData.append("updater", user);
    formData.append("status", data.status === "เปิด" ? "ปิด" : "เปิด");

    submit(formData, { method: "POST" });
  };

  const handleChange = (event) => {
    const thisCheckbox = event.target;
    const checkAllCheckbox = document.querySelector('[name="checkAll"]');

    if (!thisCheckbox.checked) {
      if (checkAllCheckbox.checked) {
        checkAllCheckbox.checked = false;
      }
    }
  };

  return (
    <TRow className="text-center">
      <TCol className="px-2">
        <input
          type="checkbox"
          name={`checkbox#${data.id}`}
          id={`checkbox#${data.id}`}
          value={data.id}
          onChange={handleChange}
        />
      </TCol>
      <TCol className="px-2">{index + 1}</TCol>
      <TCol className="px-2">{data.book_number}</TCol>
      <TCol className="px-2">{data.receipt_amount_per_book}</TCol>
      <TCol className="px-2">{data.last_receipt_number}</TCol>
      <TCol className="px-2"></TCol>
      <TCol className="px-2">{data.receipt_type}</TCol>
      <TCol className="px-2">{data.form}</TCol>
      <TCol className="px-2">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handleEditStatus}
        >
          <FaPowerOff
            className={twMerge(
              clsx("w-5 h-5 mx-auto", {
                "text-green-600": data.status === "เปิด",
                "text-gray-600": data.status === "ปิด",
              })
            )}
          />
        </button>
      </TCol>
      <TCol className="px-2">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handleEdit}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </button>
      </TCol>
      <TCol className="px-2">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handleDelete}
        >
          <FaTrashAlt className="w-5 h-5 text-red-600" />
        </button>
      </TCol>
    </TRow>
  );
}

export default function Receipt() {
  const { data, q } = useLoaderData();
  const { state } = useNavigation();
  const submit = useSubmit();
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // const [checkAll, setCheckAll] = useState(false);
  const [popupData, setPopupData] = useState({
    id: -1,
    bookNumber: "",
    form: "ใบเสร็จต่อเนื่อง",
    receiptAmountPerBook: "1000",
    lastReceiptNumber: "0001",
    receiptType: "ใบเสร็จรับเงิน สพฐ.",
    action: "",
  });
  // ตัวแปร delay สำหรับ delay เวลา submit ระหว่างพิมพ์ค้นหา
  let delay = null;

  // ล้างข้อมูล
  useEffect(() => {
    // reset ข้อมูล pop up เป็นค่าเริ่มต้น เมื่อบันทึกข้อมูลเสร็จแล้ว
    setPopupData({
      id: -1,
      bookNumber: "",
      form: "ใบเสร็จต่อเนื่อง",
      receiptAmountPerBook: "1000",
      lastReceiptNumber: "0001",
      receiptType: "ใบเสร็จรับเงิน สพฐ.",
      action: "",
    });

    // ตรวจสอบสถานะ page เพื่อแสดงสถานะ loading
    state !== "idle" && setIsLoading(true);
    state === "idle" && setIsLoading(false);
  }, [state]);

  // หยุด spinner ในช่องค้นหา
  useEffect(() => {
    state === "idle" && setIsTyping(false);
  }, [state]);

  // ติ๊กทั้งหมด
  const handleCheckAll = (event) => {
    const checked = event.target.checked;
    // checkbox ทั้งหมด
    const allCheckBox = document.querySelectorAll('[name^="checkbox#"]');

    allCheckBox.forEach((element) => {
      if (checked) {
        element.checked = true;
      } else if (!checked) {
        element.checked = false;
      }
    });
  };

  // แก้ไขข้อมูล
  const handleEdit = (data) => {
    setPopupData({
      id: data.id,
      bookNumber: data.book_number,
      form: data.form,
      receiptAmountPerBook: data.receipt_amount_per_book,
      lastReceiptNumber: data.last_receipt_number,
      receiptType: data.receipt_type,
      action: "update",
    });
    setIsShowPopUp(true);
  };

  // ลบข้อมูล
  const handleDelete = (event, id, bookNumber) => {
    event.preventDefault();

    const cf = confirm(`ยืนยันการลบใบเสร็จเล่มที่ ${bookNumber}`);

    // ถ้าตอบไม่ หยุดการดำเนินการ
    if (!cf) return;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("action", "delete");

    submit(formData, {
      method: "POST",
    });
  };

  // เปลี่ยนสถานะเล่มที่เลือก
  const handleToggleStatusSelected = (status) => {
    const checkBox = document.querySelectorAll('[name^="checkbox#"]');
    const selectedId = [];
    checkBox.forEach((element) => {
      if (element.checked) {
        selectedId.push(element.value);
        document
          .querySelector(`[name="${element.name}"]`)
          .setAttribute("checked", false);
      }
    });

    const formData = new FormData();
    formData.append("status", status);
    formData.append("id", JSON.stringify(selectedId));
    formData.append("action", "toggleSelectedStatus");
    formData.append("updater", user);

    submit(formData, {
      method: "POST",
    });
  };

  // ลบเล่มที่เลือก
  const handleDeleteSelected = () => {
    const checkBox = document.querySelectorAll('[name^="checkbox#"]');
    const selectedId = [];
    checkBox.forEach((element) => {
      if (element.checked) {
        selectedId.push(element.value);
        element.checked = false;
      }
    });

    const formData = new FormData();
    formData.append("id", JSON.stringify(selectedId));
    formData.append("action", "deleteSelected");

    submit(formData, {
      method: "POST",
    });
  };

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
          <Form autoComplete="off">
            <div className="flex justify-between border-b-4 border-sky-300">
              <div className="text-lg font-bold">ค้นหา</div>
              <div>จำนวน {data.length} รายการ</div>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center my-3">
              <InputGroup className="w-10/12">
                <label htmlFor="searchType">ประเภทใบเสร็จ</label>
                <Select
                  className="w-full"
                  name="searchType"
                  optionTexts={["ทั้งหมด", "ใบเสร็จรับเงิน สพฐ."]}
                  optionValues={["0", "ใบเสร็จรับเงิน สพฐ."]}
                  defaultValue={"ใบเสร็จรับเงิน สพฐ."}
                />
              </InputGroup>
              <InputGroup className="w-10/12">
                <div
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
                    className={clsx("animate-spin w-4 h-4", {
                      hidden: !isTyping,
                    })}
                  />
                </div>
              </InputGroup>
            </div>
          </Form>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="flex gap-1 mt-10 mb-3">
        <DefaultButton
          className="flex flex-row bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setPopupData((prev) => ({ ...prev, action: "create" }));
            setIsShowPopUp(true);
          }}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">เพิ่ม</div>
        </DefaultButton>
        <DefaultButton
          className="flex flex-row bg-red-600 hover:bg-red-500 text-white"
          onClick={handleDeleteSelected}
        >
          <FaTrashAlt className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">ลบ</div>
        </DefaultButton>
        <DefaultButton
          className="flex  flex-row bg-yellow-300 hover:bg-yellow-200"
          onClick={() => handleToggleStatusSelected("ปิด")}
        >
          <FaPowerOff className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">ปิดสถานะ</div>
        </DefaultButton>
        <DefaultButton
          className="flex  flex-row bg-green-600 hover:bg-green-500 text-white"
          onClick={() => handleToggleStatusSelected("เปิด")}
        >
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
                <input
                  type="checkbox"
                  name="checkAll"
                  onChange={handleCheckAll}
                />
              </THeadCol>
              <THeadCol>ที่</THeadCol>
              <THeadCol>เล่มที่</THeadCol>
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
            {!data || data.length === 0 ? (
              <tr>
                <td className="text-center py-3" colSpan={11}>
                  ไม่พบรายการ
                </td>
              </tr>
            ) : (
              data.map((value, index) => (
                <Row
                  user={user}
                  index={index}
                  data={value}
                  handleEdit={() => handleEdit(value)}
                  handleDelete={(event) =>
                    handleDelete(event, value.id, value.book_number)
                  }
                  key={index}
                />
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopUp && (
        <Popup
          data={popupData}
          setIsShowPopUp={setIsShowPopUp}
          creator={user}
        />
      )}

      {isLoading && <OverlaySpinner />}
    </div>
  );
}
