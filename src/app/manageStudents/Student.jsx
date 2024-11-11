import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaHistory,
  FaPowerOff,
  FaSearch,
  FaSpinner,
  FaTrashAlt,
  FaUserPlus,
  FaWindowClose,
} from "react-icons/fa";
import Card from "../../components/Card";
import {
  InputGroup,
  NumberInput,
  SearchTextInput,
  Select,
  TextInput,
} from "../../components/inputs";
import { DefaultButton } from "../../components/buttons";
import {
  Table,
  TCol,
  THead,
  THeadCol,
  THeadRow,
  TRow,
} from "../../components/table";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { PopupContainer } from "../../components/popup";
import clsx from "clsx";
import { twMerge, validators } from "tailwind-merge";
import OverlaySpinner from "../../components/OverlaySpinner";
import { user } from "../config";

const Popup = (props) => {
  const submit = useSubmit();
  const [validate, setValidate] = useState({
    academicYear: "",
    studentID: "",
    seatNumber: "",
    title: "",
    firstname: "",
    lastname: "",
    level: "",
    section: "",
    studentType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // ตรวจสอบข้อมูล
    let error = false;
    [
      "academicYear",
      "studentID",
      "seatNumber",
      "title",
      "firstname",
      "lastname",
      "level",
      "section",
      "studentType",
    ].forEach((name) => {
      if (!formData.get(name)) {
        setValidate((prev) => ({
          ...prev,
          [name]: "* จำเป็นต้องเลือกหรือพิมพ์ข้อมูล",
        }));
        error = true;
      }
    });

    if (error) return;

    formData.append("action", props.popupData.action);
    formData.append("creator", user);
    formData.append("class", /\d+/.exec(formData.get("level")));
    formData.append("id", props.popupData.id);

    submit(formData, {
      method: "POST",
    });

    props.setIsShowPopup(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    props.setPopupData((prev) => ({ ...prev, [name]: value }));
    // reset ห้องเรียนทุกครั้งเมื่อเปลี่ยนระดับชั้น
    if (name === "level")
      props.setPopupData((prev) => ({ ...prev, classroom: "" }));

    // ล้าง validate
    validate[name] && setValidate((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <PopupContainer>
      <Card
        className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3"
        style={{ marginTop: window.scrollY + window.innerHeight / 90 }}
      >
        <Form
          method="POST"
          role="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">เพิ่มข้อมูลนักเรียน</div>
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
              <label htmlFor="academicYear">ปีการศึกษา</label>
              <Select
                className="w-full"
                name="academicYear"
                optionTexts={[
                  "เลือก",
                  ...props.academic_year.map((el) => el.academic_year),
                ]}
                optionValues={[
                  "",
                  ...props.academic_year.map((el) => el.academic_year),
                ]}
                value={props.popupData.academicYear}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.academicYear}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="studentID">รหัสนักเรียน</label>
              <NumberInput
                className="w-full"
                name="studentID"
                placeholder="00000"
                value={props.popupData.studentID}
                onChange={handleChange}
                onClick={(e) => e.currentTarget.select()}
              />
              <div className="text-red-600">{validate.studentID}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="seatNumber">เลขที่</label>
              <NumberInput
                className="w-full"
                name="seatNumber"
                value={props.popupData.seatNumber}
                onChange={handleChange}
                onClick={(e) => e.currentTarget.select()}
              />
              <div className="text-red-600">{validate.seatNumber}</div>
            </InputGroup>
            <div className="flex gap-3 w-full">
              <InputGroup className="w-5/12">
                <label htmlFor="title">คำนำหน้า</label>
                <Select
                  className="w-full"
                  name="title"
                  optionTexts={[
                    "เลือก",
                    "เด็กชาย",
                    "เด็กหญิง",
                    "นาย",
                    "นางสาว",
                    "นาง",
                    "-",
                  ]}
                  optionValues={[
                    "",
                    "เด็กชาย",
                    "เด็กหญิง",
                    "นาย",
                    "นางสาว",
                    "นาง",
                    "-",
                  ]}
                  value={props.popupData.title}
                  onChange={handleChange}
                />
                <div className="text-red-600">{validate.title}</div>
              </InputGroup>
              <InputGroup className="w-7/12">
                <label htmlFor="firstname">ขื่อ</label>
                <TextInput
                  className="w-full"
                  name="firstname"
                  value={props.popupData.firstname}
                  onChange={handleChange}
                />
                <div className="text-red-600">{validate.firstname}</div>
              </InputGroup>
            </div>
            <InputGroup className="w-full">
              <label htmlFor="lastname">นามสกุล</label>
              <TextInput
                className="w-full"
                name="lastname"
                value={props.popupData.lastname}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.lastname}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="level">ระดับชั้น</label>
              <Select
                className="w-full"
                name="level"
                optionTexts={["เลือก", ...props.level.map((el) => el.level)]}
                optionValues={["", ...props.level.map((el) => el.level)]}
                value={props.popupData.level}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.level}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="section">ห้องเรียน</label>
              <Select
                className="w-full"
                name="section"
                optionTexts={[
                  "เลือก",
                  ...props.classroom
                    .filter((el) => el.level === props.popupData.level)
                    .map((el) => el.classroom),
                ]}
                optionValues={[
                  "",
                  ...props.classroom
                    .filter((el) => el.level === props.popupData.level)
                    .map((el) => el.section),
                ]}
                value={props.popupData.section}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.section}</div>
            </InputGroup>
            <InputGroup className="w-full">
              <label htmlFor="studentType">ประเภทนักเรียน</label>
              <Select
                className="w-full"
                name="studentType"
                optionTexts={[
                  "เลือก",
                  ...props.student_type.map((el) => el.student_type),
                ]}
                optionValues={[
                  "",
                  ...props.student_type.map((el) => el.student_type),
                ]}
                value={props.popupData.studentType}
                onChange={handleChange}
              />
              <div className="text-red-600">{validate.studentType}</div>
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

  // หยิบไปแก้ไข
  const handlePickToEdit = () => {
    props.setPopupData({
      action: "update",
      academicYear: props.academic_year,
      studentID: props.student_id,
      seatNumber: props.seat_number,
      title: props.title,
      firstname: props.firstname,
      lastname: props.lastname,
      level: props.level,
      section: props.section,
      studentType: props.student_type,
      id: props.id,
    });

    props.setIsShowPopup(true);
  };

  // ลบ
  const handleDelete = () => {
    const cf = confirm(
      `ยืนยันการลบรายการ ${props.title}${props.firstname} ${props.lastname}`
    );

    if (!cf) return;

    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", props.id);

    submit(formData, {
      method: "POST",
    });
  };

  // ปรับ status
  const handleToggleStatus = () => {
    const formData = new FormData();
    formData.append("action", "update-status");
    formData.append("id", props.id);
    formData.append("status", props.status === "ปกติ" ? "ปิด" : "ปกติ");
    formData.append("creator", user);

    submit(formData, {
      method: "POST",
    });
  };

  const handleCheck = (e) => {
    const checkAll = document.querySelector('[name="checkAll"]');
    if (!e.target.checked && checkAll.checked) {
      checkAll.checked = false;
    }
  };

  return (
    <TRow
      className={twMerge(
        clsx("text-center", {
          "bg-slate-50": props.index % 2 === 0,
        })
      )}
    >
      <TCol className="px-2">
        <input
          type="checkbox"
          name={`checkbox#${props.id}`}
          id={`checkbox#${props.id}`}
          onChange={handleCheck}
          value={props.id}
        />
      </TCol>
      <TCol className="px-2">{props.seat_number}</TCol>
      <TCol className="px-2">{props.student_id}</TCol>
      <TCol className="text-center px-2">{props.title}</TCol>
      <TCol className="text-start px-2 text-nowrap">{`${props.firstname} ${props.lastname}`}</TCol>
      <TCol className="px-2">
        <button className="flex items-center justify-center mx-auto">
          <FaHistory className="w-5 h-5 text-gray-600" />
        </button>
      </TCol>
      <TCol className="px-2">{props.student_type}</TCol>
      <TCol className="px-2">{props.academic_year}</TCol>
      <TCol className="px-2">{props.level}</TCol>
      <TCol className="px-2">{`ม.${props.class}/${props.section}`}</TCol>
      <TCol className="px-2">
        <DefaultButton
          className={twMerge(
            clsx("flex items-center justify-center mx-auto", {
              "text-gray-600": props.status === "ปิด",
              "text-green-600": props.status === "ปกติ",
            })
          )}
          onClick={handleToggleStatus}
        >
          <FaPowerOff className="w-5 h-5 mx-auto" />
        </DefaultButton>
      </TCol>
      <TCol className="px-2">
        <DefaultButton
          className="flex items-center justify-center mx-auto"
          onClick={handlePickToEdit}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </DefaultButton>
      </TCol>
      <TCol className="px-2">
        <DefaultButton
          className="flex items-center justify-center mx-auto"
          onClick={handleDelete}
        >
          <FaTrashAlt className="w-5 h-5 text-red-600" />
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

export default function Student() {
  const { state } = useNavigation();
  const submit = useSubmit();
  const { loaderData, p } = useLoaderData();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [popupData, setPopupData] = useState({
    action: "create",
    id: -1,
    academicYear: parseInt(new Date().getFullYear()) + 543,
    studentID: "",
    seatNumber: "",
    title: "",
    firstname: "",
    lastname: "",
    level: "",
    section: "",
    studentType: "",
  });
  const [search, setSearch] = useState({
    ay: parseInt(new Date().getFullYear()) + 543,
    st: "",
    lv: "",
    sect: "",
    s: "",
    q: "",
    p: 1,
    name: "",
  });
  const total = loaderData.total[0].total;
  const pageAmount = total !== 0 ? Math.ceil(parseInt(total) / 50) : 0;

  // submit ค้นหาข้อมูลเมื่อข้อมูลใน search เปลี่ยนแปลง
  let delay = null;
  useEffect(() => {
    const formData = new FormData();
    formData.append("ay", search.ay);
    formData.append("st", search.st);
    formData.append("lv", search.lv);
    formData.append("sect", search.sect);
    formData.append("s", search.s);
    formData.append("q", search.q);
    formData.append("p", search.p);

    if (search.name === "q") {
      delay = setTimeout(() => {
        submit(formData, {
          method: "GET",
        });
        setIsTyping(false);
      }, 1000);

      return () => {
        clearTimeout(delay);
      };
    } else {
      submit(formData, {
        method: "GET",
      });
    }
  }, [search]);

  // ปรับข้อมูลใน search
  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearch((prev) => {
      return { ...prev, [name]: value, name: name };
    });

    if (name === "q") {
      setSearch((prev) => ({ ...prev, p: 1 }));
      setIsTyping(true);
    }
  };
  // เรียก pop up เพิ่มรายการนักเรียน
  const handleShowAddItem = () => {
    // ค่า defaulit
    setPopupData({
      action: "create",
      id: -1,
      academicYear: parseInt(new Date().getFullYear()) + 543,
      studentID: "",
      seatNumber: "",
      title: "",
      firstname: "",
      lastname: "",
      level: "",
      classroom: "",
      studentType: "",
    });
    setIsShowPopup(true);
  };
  // ติ๊กถูกทั้งหมด
  const handleCheckAll = (e) => {
    const checkAll = e.target;
    const checkbox = document.querySelectorAll('[name^="checkbox#"]');

    checkbox.forEach((el) => (el.checked = checkAll.checked));
  };
  // ลบรายการที่เลือก
  const handleDeleteGroup = () => {
    const cf = confirm("ยืนยันการลบรายการที่เลือก");

    if (!cf) return;

    const checkbox = document.querySelectorAll('[name^="checkbox#"]');
    const array_selected = [];

    checkbox.forEach((el) => {
      if (el.checked) array_selected.push(el.value);
    });

    const formData = new FormData();
    formData.append("action", "delete-group");
    formData.append("id", JSON.stringify(array_selected));

    submit(formData, { method: "POST" });

    checkbox.forEach((el) => (el.checked = false));
  };
  // ปิด/เปิดสถานะรายการที่เลือก
  const handleToggleStatusGroup = (status) => {
    const cf = confirm("ยืนยันการเปลี่ยนสถานะรายการที่เลือก");

    if (!cf) return;

    const checkbox = document.querySelectorAll('[name^="checkbox#"]');
    const array_selected = [];

    checkbox.forEach((el) => {
      if (el.checked) array_selected.push(el.value);
    });

    const formData = new FormData();
    formData.append("action", "toggle-status-group");
    formData.append("status", status);
    formData.append("creator", user);
    formData.append("id", JSON.stringify(array_selected));

    submit(formData, { method: "POST" });

    checkbox.forEach((el) => (el.checked = false));
  };

  const popupProps = {
    setIsShowPopup,
    ...loaderData,
    popupData,
    setPopupData,
  };

  const paginationProps = {
    pageAmount,
    p,
    setSearch,
  };

  return (
    <div className="p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="flex justify-center w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ข้อมูลนักเรียน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <Form autoComplete="off">
            <div className="flex justify-between border-b-4 border-sky-300">
              <div className="text-lg font-bold">ค้นหา</div>
              <div>จำนวน {total} รายการ</div>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center my-3">
              <InputGroup className="w-10/12">
                <label htmlFor="ay">ปีการศึกษา</label>
                <Select
                  name="ay"
                  optionTexts={[
                    "ทั้งหมด",
                    ...loaderData.academic_year.map((el) => el.academic_year),
                  ]}
                  optionValues={[
                    "",
                    ...loaderData.academic_year.map((el) => el.academic_year),
                  ]}
                  value={search.ay}
                  onChange={handleSearch}
                />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="st">ประเภทนักเรียน</label>
                <Select
                  name="st"
                  optionTexts={[
                    "ทั้งหมด",
                    ...loaderData.student_type.map((el) => el.student_type),
                  ]}
                  optionValues={[
                    "",
                    ...loaderData.student_type.map((el) => el.student_type),
                  ]}
                  value={search.st}
                  onChange={handleSearch}
                />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="lv">ระดับชั้นเรียน</label>
                <Select
                  name="lv"
                  optionTexts={[
                    "ทั้งหมด",
                    ...loaderData.level.map((el) => el.level),
                  ]}
                  optionValues={["", ...loaderData.level.map((el) => el.level)]}
                  value={search.lv}
                  onChange={handleSearch}
                />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="c">ห้อง</label>
                <Select
                  name="c"
                  optionTexts={[
                    "ทั้งหมด",
                    ...loaderData.classroom
                      .filter((el) => el.level === search.lv)
                      .map((el) => el.classroom),
                  ]}
                  optionValues={[
                    "",
                    ...loaderData.classroom
                      .filter((el) => el.level === search.lv)
                      .map((el) => el.section),
                  ]}
                  value={search.c}
                  onChange={handleSearch}
                />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="s">สถานะ</label>
                <Select
                  name="s"
                  optionTexts={["ทั้งหมด", "ปกติ", "ปิดการใช้งาน"]}
                  optionValues={["", "ปกติ", "ปิดการใช้งาน"]}
                  value={search.s}
                  onChange={handleSearch}
                />
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
                    placeholder="พิมพ์ชื่อนักเรียนที่ต้องการค้นหา"
                    onChange={handleSearch}
                    defaultValue={loaderData.q}
                  />
                  <FaSpinner
                    className={clsx("animate-spin w-4 h-4", {
                      hidden: !isTyping,
                    })}
                  />
                </div>
              </InputGroup>
              <InputGroup className="w-10/12">
                <div>ส่งออกข้อมูล</div>
                <div className="flex flex-col gap-1 items-start">
                  <button
                    type="button"
                    className="bg-green-600 hover:bg-green-500 text-white font-bold p-3 text-start rounded w-full"
                  >
                    ส่งออกข้อมูล Excel
                  </button>
                  <button
                    type="button"
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold p-3 text-start rounded w-full"
                  >
                    ส่งออกข้อมูล Excel เพื่อเปลี่ยนรหัสประจำตัวใหม่
                  </button>
                </div>
              </InputGroup>
            </div>
          </Form>
        </Card>
      </div>

      {/* ปุ่มกด */}
      <div className="flex flex-col sm:flex-row gap-3 my-3">
        <DefaultButton
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
          onClick={handleShowAddItem}
        >
          <FaUserPlus className="w-5 h-5" />
          <div>เพิ่ม</div>
        </DefaultButton>
        <DefaultButton
          className="bg-red-600 hover:bg-red-500 text-white font-bold"
          onClick={handleDeleteGroup}
        >
          <FaTrashAlt className="w-5 h-5" />
          <div>ลบ</div>
        </DefaultButton>
        <DefaultButton
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold"
          onClick={() => handleToggleStatusGroup("ปิด")}
        >
          <FaPowerOff className="w-5 h-5" />
          <div>ปิดสถานะ</div>
        </DefaultButton>
        <DefaultButton
          className="bg-green-600 hover:bg-green-500 text-white font-bold"
          onClick={() => handleToggleStatusGroup("ปกติ")}
        >
          <FaPowerOff className="w-5 h-5" />
          <div>เปิดสถานะ</div>
        </DefaultButton>
      </div>

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
              <THeadCol className="w-16">ประวัติชำระ</THeadCol>
              <THeadCol>ประเภทนักเรียน</THeadCol>
              <THeadCol className="w-16">ปีการศึกษา</THeadCol>
              <THeadCol className="w-12">ระดับชั้น</THeadCol>
              <THeadCol className="w-16">ห้อง</THeadCol>
              <THeadCol className="w-16">สถานะ</THeadCol>
              <THeadCol className="w-16">แก้ไข</THeadCol>
              <THeadCol className="w-16">ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            {loaderData.students.length > 0 &&
              loaderData.students.map((element, index) => (
                <Row
                  {...{
                    ...element,
                    index: index,
                    setIsShowPopup,
                    setPopupData,
                  }}
                  key={index}
                />
              ))}
            {loaderData.students.length === 0 && (
              <tr>
                <td className="text-center p-3" colSpan={13}>
                  - ไม่พบรายการ -
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {/* pagination */}
      <Pagination {...paginationProps} />
      {/* pop up */}
      {isShowPopup && <Popup {...popupProps} />}
      {/* loading */}
      {state !== "idle" && <OverlaySpinner />}
    </div>
  );
}
