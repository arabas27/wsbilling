import Card from "../../components/Card";
import {
  InputGroup,
  NumberInput,
  SearchTextInput,
  Select,
  TextInput,
} from "../../components/inputs";
import {
  FaSearch,
  FaPlusCircle,
  FaWindowClose,
  FaEdit,
  FaTrashAlt,
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
    level: "",
    classroom: "",
    section: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // ตรวจสอบข้อมูล
    let error = false;
    ["level", "classroom", "section"].forEach((value) => {
      if (!formData.get(value)) {
        setValidate((prev) => ({
          ...prev,
          [value]: "* จำเป็นต้องเลือกหรือพิมพ์ข้อมูล",
        }));

        error = true;
      }
    });

    if (error) return;

    formData.append("action", props.action);
    formData.append("id", props.id);
    formData.append("creator", user);
    formData.append("class", props.level.split(" ")[1]);

    submit(formData, {
      method: "POST",
    });

    props.setIsShowPopup(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    props.setPopupData((prev) => ({ ...prev, [name]: value }));

    if (validate[name]) setValidate((prev) => ({ ...prev, [name]: "" }));
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
            <div className="text-xl font-bold">ห้องเรียน</div>
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
              <label htmlFor="level">ระดับชั้นเรียน</label>
              <Select
                name="level"
                optionTexts={["เลือก", ...props.levels]}
                optionValues={["", ...props.levels]}
                value={props.level}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.level}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="classroom">ชื่อห้องเรียน</label>
              <TextInput
                className="w-full"
                name="classroom"
                placeholder="ม.1/1"
                value={props.classroom}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.classroom}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="section">ห้องที่</label>
              <NumberInput
                className="w-full"
                name="section"
                onClick={(event) => event.target.select()}
                placeholder="1"
                value={props.section}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.section}</div>
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

const Row = (props) => {
  const submit = useSubmit();
  const handleEdit = () => {
    props.setPopupData({
      action: "update",
      id: props.id,
      classroom: props.classroom,
      level: props.level,
      section: props.section,
    });

    props.setIsShowPopup(true);
  };

  const handleDelete = () => {
    const cf = confirm(`ยืนยันการลบรายการ ${props.classroom}`);

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
      <TCol>{props.index + 1}</TCol>
      <TCol>{props.classroom}</TCol>
      <TCol>{props.level}</TCol>
      <TCol className="w-16">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handleEdit}
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

export default function ClassRoom() {
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const { state } = useNavigation();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [popupData, setPopupData] = useState({
    action: "create",
    id: -1,
    level: "",
    classroom: "",
    section: 1,
  });

  const levels =
    loaderData.level.length > 0
      ? loaderData.level.map((element) => element.level)
      : [];

  const handleGetAddItemPopup = () => {
    setPopupData({
      action: "create",
      id: -1,
      level: "",
      classroom: "",
      section: 1,
    });
    setIsShowPopup(true);
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
    setIsShowPopup,
    levels,
    ...popupData,
    setPopupData,
  };

  const rowProps = {
    setPopupData,
    setIsShowPopup,
  };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="flex justify-center w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ห้องเรียน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน {loaderData.classroom.length} รายการ</div>
          </div>
          <Form
            className="flex flex-col items-center justify-center my-3"
            method="POST"
            role="form"
            autoComplete="off"
          >
            <InputGroup className="w-10/12">
              <label htmlFor="lv">ระดับชั้นเรียน</label>
              <Select
                name="lv"
                optionTexts={["ทั้งหมด", ...levels]}
                optionValues={["", ...levels]}
                onChange={handleSearch}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="cr">คำค้นหา</label>
              <div
                className="flex items-center justify-center gap-3 w-full border border-gray-600 px-3 py-1 rounded focus-within:outline outline-2 -outline-offset-1 outline-black"
                autoComplete="off"
              >
                <SearchTextInput
                  className="peer w-full"
                  name="cr"
                  placeholder="พิมพ์ระดับชั้นเรียนที่ต้องการค้นหา"
                  onChange={handleSearch}
                  defaultValue={loaderData.cr}
                />
                <FaSpinner
                  className={clsx("animate-spin w-4 h-4", {
                    hidden: !isTyping,
                  })}
                />
              </div>
            </InputGroup>
          </Form>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="mt-10 mb-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white"
          onClick={handleGetAddItemPopup}
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
              <THeadCol>ห้องเรียน</THeadCol>
              <THeadCol>ระดับชั้น</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {loaderData.classroom.length > 0 &&
              loaderData.classroom.map((element, index) => (
                <Row
                  {...{ ...element, ...rowProps, ...{ index: index } }}
                  key={index}
                />
              ))}

            {loaderData.classroom.length === 0 && (
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
      {isShowPopup && <Popup {...popupProps} />}

      {/* Loading */}
      {state !== "idle" && <OverlaySpinner />}
    </div>
  );
}
