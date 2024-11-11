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
    fullname: "",
    ordinalNumber: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    props.setPopupData((prev) => ({ ...prev, [name]: value }));

    validate[name] && setValidate((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // ตรวจข้อมูล
    let error = false;
    ["fullname", "ordinalNumber"].forEach((name) => {
      if (!formData.get(name)) {
        setValidate((prev) => ({ ...prev, [name]: "* จำเป็นต้องพิมพ์ข้อมูล" }));
        error = true;
      }
    });

    if (error) return;

    formData.append("action", props.popupData.action);
    formData.append("user", user);
    formData.append("id", props.popupData.id);

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
        <Form method="POST" autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">ผู้รับเงิน</div>
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
              <label htmlFor="fullname">ผู้รับเงิน</label>
              <TextInput
                className="w-full"
                name="fullname"
                placeholder="ผู้รับเงิน"
                value={props.popupData.fullname}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.fullname}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="ordinalNumber">ลำดับที่</label>
              <NumberInput
                className="w-full"
                name="ordinalNumber"
                placeholder="1"
                value={props.popupData.ordinalNumber}
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

  const handlePickDataToUpdate = () => {
    props.setPopupData({
      action: "update",
      id: props.id,
      fullname: props.fullname,
      ordinalNumber: props.ordinal_number,
    });

    props.setIsShowPopUp(true);
  };

  const handleDelete = () => {
    const cf = confirm(`ยืนยันการลบรายการ ${props.fullname}`);

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
      <TCol className="px-2">{props.ordinal_number}</TCol>
      <TCol className="text-start px-2">{props.fullname}</TCol>
      <TCol className="px-2">
        <button
          className="flex items-center justify-center mx-auto"
          onClick={handlePickDataToUpdate}
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

export default function Receiver() {
  const submit = useSubmit();
  const { state } = useNavigation();
  const loaderData = useLoaderData();
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [popupData, setPopupData] = useState();

  const handleOpenAddItemPopup = () => {
    setPopupData({
      action: "create",
      id: -1,
      fullname: "",
      ordinalNumber:
        loaderData.data.length > 0
          ? parseInt(
              loaderData.data[loaderData.data.length - 1].ordinal_number
            ) + 1
          : 1,
    });
    setIsShowPopUp(true);
  };

  // ค้นหา
  let delay = null;
  const handleSearch = (e) => {
    setIsTyping(true);

    if (delay) clearTimeout(delay);
    delay = setTimeout(() => {
      const formData = new FormData();
      formData.append("q", e.target.value);
      submit(formData, {
        method: "GET",
      });

      setIsTyping(false);
    }, 1000);
  };

  const rowProps = {
    setPopupData,
    setIsShowPopUp,
  };

  const popupProps = {
    popupData,
    setPopupData,
    setIsShowPopUp,
  };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ผู้รับเงิน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน 0 รายการ</div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
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
      <div className="flex gap-1 mt-10 mb-3">
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
              <THeadCol>ผู้รับเงิน</THeadCol>
              <THeadCol className="w-16">แก้ไข</THeadCol>
              <THeadCol className="w-16">ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {loaderData.data.length > 0 &&
              loaderData.data.map((el, index) => (
                <Row {...{ ...el, ...rowProps }} key={index} />
              ))}

            {loaderData.data.length === 0 && (
              <tr>
                <td className="text-center p-3" colSpan={4}>
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
