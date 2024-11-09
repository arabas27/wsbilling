import Card from "../../components/Card";
import {
  InputGroup,
  NumberInput,
  SearchTextInput,
  TextInput,
} from "../../components/inputs";
import {
  FaSearch,
  FaPlusCircle,
  FaWindowClose,
  FaEdit,
  FaTrashAlt,
  FaTimesCircle,
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
import { useState } from "react";
import { PopupContainer } from "../../components/popup";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { user } from "../config";
import OverlaySpinner from "../../components/OverlaySpinner";
import clsx from "clsx";

const Popup = (props) => {
  const submit = useSubmit();
  const [validate, setValidate] = useState({
    studentType: "",
    shortName: "",
    ordinalNumber: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    props.setPopupData((prev) => ({ ...prev, [name]: value }));
    if (validate[name]) setValidate((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("creator", user);
    formData.append("action", props.action);
    formData.append("id", props.id);

    // ตรวจสอบข้อมูล
    let error = false;
    ["studentType", "shortName", "ordinalNumber"].forEach((value) => {
      if (!formData.get(value)) {
        setValidate((prev) => ({
          ...prev,
          [value]: "* จำเป็นต้องเลือกหรือพิมพ์ข้อมูล",
        }));

        error = true;
      }
    });

    if (error) return;

    submit(formData, {
      method: "POST",
    });

    props.setIsShowPopUp(false);
  };

  return (
    <PopupContainer>
      <Card
        className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3"
        style={{ marginTop: window.scrollY + window.innerHeight / 7 }}
      >
        <Form
          method="POST"
          role="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">ประเภทนักเรียน</div>
            <DefaultButton
              className="text-xl font-bold rounded-full"
              onClick={() => props.setIsShowPopUp(false)}
            >
              <FaWindowClose className="w-6 h-6" />
            </DefaultButton>
          </div>
          <hr className="border-b-4 border-sky-300" />
          <div className="flex flex-col gap-3 items-center my-3">
            <InputGroup className="w-full">
              <label htmlFor="studentType">ประเภทนักเรียน</label>
              <TextInput
                className="w-full"
                name="studentType"
                placeholder="พิมพ์ประเภทนักเรียน"
                value={props.studentType}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.studentType}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="shortName">ชื่อย่อประเภทนักเรียน</label>
              <TextInput
                className="w-full"
                name="shortName"
                placeholder="ม.1,4"
                value={props.shortName}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.shortName}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="ordinalNumber">ชื่อย่อประเภทนักเรียน</label>
              <NumberInput
                className="w-full"
                name="ordinalNumber"
                placeholder="1"
                value={props.ordinalNumber}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.ordinalNumber}</div>
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
                onClick={() => props.setIsShowPopUp(false)}
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

const Row = (props) => {
  const submit = useSubmit();
  // หยิบไปแก้ไข
  const handlePickToEdit = () => {
    props.setPopupData({
      action: "update",
      id: props.id,
      studentType: props.student_type,
      shortName: props.short_name,
      ordinalNumber: props.ordinal_number,
    });

    props.setIsShowPopUp(true);
  };
  // ลบ
  const handleDelete = () => {
    const cf = confirm(`ยืนยันการลบราย ${props.level}`);

    if (!cf) return;

    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", props.id);

    submit(formData, {
      method: "POST",
    });
  };

  return (
    <TRow className="text-center">
      <TCol>{props.ordinal_number}</TCol>
      <TCol className="font-bold">{props.student_type}</TCol>
      <TCol>{props.short_name}</TCol>
      <TCol className="w-16">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handlePickToEdit}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </button>
      </TCol>
      <TCol className="w-16">
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

export default function StudentType() {
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const { state } = useNavigation();
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [popupData, setPopupData] = useState({
    action: "create",
    id: -1,
    studentType: "",
    shortName: "",
    ordinalNumber:
      loaderData.data.length > 0
        ? loaderData.data[loaderData.data.length - 1].ordinal_number + 1
        : 0,
  });

  // เปิด pop up
  const handleOpenAddItemPopup = () => {
    setPopupData({
      action: "create",
      id: -1,
      studentType: "",
      shortName: "",
      ordinalNumber:
        loaderData.data.length > 0
          ? loaderData.data[loaderData.data.length - 1].ordinal_number + 1
          : 0,
    });
    setIsShowPopUp(true);
  };

  // จัดการ search
  let delay = null;
  const handleSearch = (event) => {
    setIsTyping(true);
    const formData = new FormData(event.currentTarget.form);

    if (delay) clearTimeout(delay);
    delay = setTimeout(() => {
      submit(formData, {
        method: "GET",
      });
      setIsTyping(false);
    }, 1000);
  };

  const popupProps = {
    setIsShowPopUp,
    ...popupData,
    setPopupData,
  };

  const rowProps = { setPopupData, setIsShowPopUp };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="flex justify-center w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ประเภทนักเรียน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน {loaderData.data.length} รายการ</div>
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
                  placeholder="พิมพ์ประเภทนักเรียนที่ต้องการค้นหา"
                  onChange={handleSearch}
                  defaultValue={loaderData.q}
                />
                <FaSpinner
                  className={clsx("animate-spin w-4 h-4", {
                    hidden: !isTyping,
                  })}
                />
              </Form>
            </InputGroup>
          </div>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={handleOpenAddItemPopup}
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
              <THeadCol>ประเภทนักเรียน</THeadCol>
              <THeadCol>ชื่อย่อ</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {loaderData.data.length > 0 &&
              loaderData.data.map((element, index) => (
                <Row
                  {...element}
                  {...{ index: index, ...rowProps }}
                  key={index}
                />
              ))}
            {loaderData.data.length === 0 && (
              <tr>
                <td className="text-center p-3" colSpan={5}>
                  - ไม่พบรายการ -
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopUp && <Popup {...popupProps} />}

      {/* loading */}
      {state !== "idle" && <OverlaySpinner />}
    </div>
  );
}
