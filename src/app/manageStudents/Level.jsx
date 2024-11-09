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
    level: "",
    shortName: "",
    type: "",
    ordinalNumber: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // validate
    let error = false;
    ["level", "shortName", "type", "ordinalNumber"].forEach((value) => {
      if (!formData.get(value)) {
        setValidate((prev) => ({
          ...prev,
          [value]: "* จำเป็นต้องเลือกหรือพิมพ์ข้อมูล",
        }));
        error = true;
      }
    });

    // ถ้า error ให้หยุดดำเนินการตรงนี้
    if (error) return;
    formData.append("action", props.popupData.action);
    formData.append("id", props.popupData.id);
    formData.append("creator", user);

    submit(formData, {
      method: "POST",
    });

    props.setIsShowPopUp(false);
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
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">ระดับชั้นเรียน</div>
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
              <label htmlFor="level">ระดับชั้นเรียน</label>
              <TextInput
                className="w-full"
                name="level"
                placeholder="มัธยมศึกษาปีที่ 1"
                value={props.popupData.level}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.level}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="shortName">ชื่อย่อระดับชั้นเรียน</label>
              <TextInput
                className="w-full"
                name="shortName"
                placeholder="ม.1"
                value={props.popupData.shortName}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.shortName}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="type">ประเภทระดับชั้น</label>
              <Select
                className="w-full"
                name="type"
                optionTexts={["เลือก", "มัธยมศึกษา"]}
                optionValues={["", "มัธยมศึกษา"]}
                value={props.popupData.type}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.type}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="ordinalNumber">ลำดับ</label>
              <NumberInput
                className="w-full"
                name="ordinalNumber"
                placeholder="1"
                value={props.popupData.ordinalNumber}
                onChange={handleChange}
                onClick={(event) => event.target.select()}
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
      level: props.level,
      shortName: props.short_name,
      type: props.type,
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
      <TCol className="font-bold">{props.level}</TCol>
      <TCol>{props.short_name}</TCol>
      <TCol>{props.type}</TCol>
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

export default function Level() {
  const loaderData = useLoaderData();
  const submit = useSubmit();
  const { state } = useNavigation();
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [popupData, setPopupData] = useState({
    action: "create",
    id: -1,
    level: "",
    shortName: "",
    type: "มัธยมศึกษา",
    ordinalNumber:
      loaderData && loaderData.data.length > 0
        ? loaderData.data[loaderData.data.length - 1].ordinal_number + 1
        : 0,
  });

  const handleOpenAddItemPopup = () => {
    setPopupData({
      action: "create",
      id: -1,
      level: "",
      shortName: "",
      type: "มัธยมศึกษา",
      ordinalNumber: loaderData
        ? loaderData.data[loaderData.data.length - 1].ordinal_number + 1
        : "0",
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

  // props ของ pop up
  const popupProps = {
    setIsShowPopUp,
    ...loaderData,
    popupData,
    setPopupData,
  };

  const rowProps = {
    setPopupData,
    setIsShowPopUp,
  };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ระดับชั้นเรียน
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
                  placeholder="พิมพ์ระดับชั้นเรียนที่ต้องการค้นหา"
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
              <THeadCol>ระดับชั้นเรียน</THeadCol>
              <THeadCol>ชื่อย่อ</THeadCol>
              <THeadCol>ประเภทระดับชั้น</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {loaderData &&
              loaderData.data.length > 0 &&
              loaderData.data.map((element, index) => (
                <Row
                  {...element}
                  {...{ index: index, ...rowProps }}
                  key={index}
                />
              ))}
            {loaderData.data.length === 0 && (
              <tr>
                <td className="text-center p-3" colSpan={6}>
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
