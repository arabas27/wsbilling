import Card from "../../components/Card";
import {
  InputGroup,
  NumberInput,
  SearchTextInput,
  TextInput,
} from "../../components/inputs";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaWindowClose,
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
import { useEffect, useState } from "react";
import { PopupContainer } from "../../components/popup";
import { user } from "../config";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import OverlaySpinner from "../../components/OverlaySpinner";
import clsx from "clsx";

const Popup = (props) => {
  const submit = useSubmit();
  const [validate, setValidate] = useState({
    paymentList: "",
    shortName: "",
    ordinalNumber: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("creator", user);

    // ตรวจสอบ input
    let error = false;
    if (formData.get("paymentList").trim() === "") {
      setValidate((prev) => ({ ...prev, paymentList: "* พิมพ์รายการชำระ" }));
      error = true;
    }

    if (formData.get("shortName").trim() === "") {
      setValidate((prev) => ({ ...prev, shortName: "* พิมพ์ชื่อย่อ" }));
      error = true;
    }

    if (formData.get("ordinalNumber").trim() === "") {
      setValidate((prev) => ({ ...prev, ordinalNumber: "* พิมพ์ลำดับที่" }));
      error = true;
    }

    //ถ้า error ให้หยุดดำเนินการ
    if (error) return;

    submit(formData, {
      method: "POST",
    });

    props.setIsShowPopup(false);
  };

  const clearValidate = (name) => {
    if (validate[name] !== "") setValidate((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <PopupContainer>
      <Card
        className="bg-white w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-4/12 p-3"
        style={{ marginTop: window.scrollY + window.innerHeight / 7 }}
      >
        <Form method="POST" onSubmit={handleSubmit} autoComplete="off">
          <input
            className="hidden"
            type="text"
            name="action"
            defaultValue={props.action}
          />
          <input
            className="hidden"
            type="text"
            name="id"
            defaultValue={props.id}
          />
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">เพิ่มรายการรับชำระ</div>
            <DefaultButton
              className="text-xl font-bold rounded-full"
              onClick={() => props.setIsShowPopup(false)}
            >
              <FaWindowClose className="w-6 h-6" />
            </DefaultButton>
          </div>
          <hr className="border-b-4 border-sky-300" />
          <div className="flex flex-col gap-3 items-center my-3">
            <InputGroup className="w-full">
              <label htmlFor="paymentList">รายการรับชำระ</label>
              <TextInput
                name="paymentList"
                placeholder="ชื่อเต็มรายการรับชำระ"
                onChange={() => clearValidate("paymentList")}
                defaultValue={props.paymentList}
              />
              <div className="text-red-600">{validate.paymentList}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="shortName">ชื่อย่อ</label>
              <TextInput
                name="shortName"
                placeholder="ชื่อย่อรายการรับชำระ"
                onChange={() => clearValidate("shortName")}
                defaultValue={props.shortName}
              />
              <div className="text-red-600">{validate.shortName}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="ordinalNumber">ลำดับที่</label>
              <NumberInput
                name="ordinalNumber"
                defaultValue={
                  props.action === "create"
                    ? props.ordinalNumber + 1
                    : props.ordinalNumber
                }
                onChange={() => clearValidate("ordinalNumber")}
              />
              <div className="text-red-600">{validate.ordinalNumber}</div>
            </InputGroup>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
              <DefaultButton
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
                type="submit"
              >
                บันทึก
              </DefaultButton>
              <DefaultButton
                className="bg-red-600 hover:bg-red-500 text-white font-bold"
                onClick={() => props.setIsShowPopup(false)}
              >
                ยกเลิก
              </DefaultButton>
            </div>
          </div>
        </Form>
      </Card>
    </PopupContainer>
  );
};

const Row = ({ props }) => {
  const submit = useSubmit();

  const handleEdit = () => {
    props.setPopupProps({
      action: "update",
      id: props.id,
      ordinalNumber: props.ordinal_number,
      paymentList: props.payment_list,
      shortName: props.short_name,
      setIsShowPopup: props.setIsShowPopup,
    });
    props.setIsShowPopup(true);
  };

  const handleDelete = () => {
    const cf = confirm(`ยืนยันการลบรายการ ${props.payment_list}`);

    if (!cf) return;

    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", props.id);

    submit(formData, { method: "POST" });
  };

  return (
    <TRow className="text-center">
      <TCol className="px-2">{props.ordinal_number}</TCol>
      <TCol className="text-start font-bold px-2">{props.payment_list}</TCol>
      <TCol className="px-2">{props.short_name}</TCol>
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
};

export default function Payments() {
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const { data, q } = loaderData;
  const { state } = useNavigation();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  let delay = null;

  const [popupProps, setPopupProps] = useState({
    action: "create",
    id: 0,
    ordinalNumber:
      data.length > 0
        ? data.reduce((preEl, currEl) => {
            return preEl.ordinal_number > currEl.ordinal_number
              ? preEl.ordinal_number
              : currEl.ordinal_number;
          })
        : 0,

    paymentList: "",
    shortName: "",
    setIsShowPopup: setIsShowPopup,
  });

  useEffect(() => {
    if (state === "idle") setIsLoading(false);
    if (state !== "idle") setIsLoading(true);
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
      setIsTyping(false);
    }, 1000);
  }

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="flex justify-center w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ตั้งค่ารายการรับชำระ
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน 0 รายการ</div>
          </div>
          <Form
            className="flex items-center justify-center my-3"
            autoComplete="off"
          >
            <div
              className="flex items-center justify-center gap-3 w-full border border-gray-600 px-3 py-1 rounded focus-within:outline outline-2 -outline-offset-1 outline-black"
              autoComplete="off"
            >
              <SearchTextInput
                className="peer w-full"
                name="q"
                placeholder="พิมพ์รายการรับชำระที่ต้องการค้นหา"
                onChange={handleChange}
                defaultValue={q}
              />
              <FaSpinner
                className={clsx("animate-spin w-4 h-4", {
                  hidden: !isTyping,
                })}
              />
            </div>
          </Form>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => setIsShowPopup(true)}
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
              <THeadCol>รายการรับชำระ</THeadCol>
              <THeadCol>ชื่อย่อ</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((d, index) => (
                <Row
                  props={{ ...d, setPopupProps, setIsShowPopup }}
                  key={index}
                />
              ))}

            {!data && (
              <tr>
                <td colSpan={5} className="py-3 text-center">
                  - ข้อมูลผิดพลาด -
                </td>
              </tr>
            )}

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-3 text-center">
                  - ไม่พบรายการรับชำระ -
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopup && <Popup {...popupProps} />}

      {/* Loading display */}
      {isLoading && <OverlaySpinner />}
    </div>
  );
}
