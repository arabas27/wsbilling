import Card from "../../components/Card";
import EditExcelStudentID from "../../assets/EditExcelStudentID.pdf";
import ImportStudent from "../../assets/ImportStudent.xls";
import { InputGroup, Select } from "../../components/inputs";
import {
  FaBook,
  FaFileDownload,
  FaFileUpload,
  FaQuestionCircle,
  FaWindowClose,
} from "react-icons/fa";
import { DefaultButton } from "../../components/buttons";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { user } from "../config";
import OverlaySpinner from "../../components/OverlaySpinner";

/* อัพโหลดไฟล์ */
const FileInput = (props) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    props.validate.data && props.setValidate((prev) => ({ ...prev, data: "" }));

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      props.setData(sheetData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <label htmlFor="data">เลือกไฟล์นำเข้า</label>
      <input
        type="file"
        className="border border-gray-600 rounded px-3 py-1"
        name="data"
        id="data"
        onChange={handleFileUpload}
      />
    </>
  );
};

export default function UploadStudent() {
  const { state } = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData();
  const loaderData = useLoaderData();
  const [input, setInput] = useState({
    academicYear: parseInt(new Date().getFullYear()) + 543,
    level: "มัธยมศึกษา",
    studentType: "",
  });
  const [validate, setValidate] = useState({
    academicYear: "",
    level: "",
    studentType: "",
    data: "",
  });
  const [data, setData] = useState(null);
  const [isAlert, setIsAlert] = useState(0);

  // แสดงแจ้งเตือนผลการอัพโหลด
  useEffect(() => {
    if (actionData) {
      if (actionData.status === 200) {
        setIsAlert(1);
      } else if (actionData.status === 400) {
        setIsAlert(2);
      }
    }
  }, [actionData]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput((prev) => ({ ...prev, [name]: value }));
    validate[name] && setValidate((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // file upload
    const file = document.querySelector('[name="data"]').files[0];

    let error = false;
    ["academicYear", "level", "studentType"].forEach((name) => {
      if (!input[name]) {
        setValidate((prev) => ({ ...prev, [name]: "* จำเป็นต้องเลือกข้อมูล" }));
        error = true;
      }
    });
    // ตรวจสอบการอัพโหลดไฟล์
    if (!data) {
      setValidate((prev) => ({
        ...prev,
        data: "* จำเป็นต้องอัพโหลดไฟล์",
      }));
      error = true;
    }

    // ตรวจสอบประเภทไฟล์
    const isExcel = file
      ? [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].filter((value) => value === file.type).length > 0
      : null;

    if (!isExcel) {
      setValidate((prev) => ({
        ...prev,
        data: "* ต้องเป็นไฟล์ Excel นามสกุล .xls หรือ .xlsx เท่านั้น",
      }));
      error = true;
    }
    // หยุด ถ้าไม่ผ่าน
    if (error) return;

    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("creator", user);
    formData.append("academicYear", input.academicYear);
    formData.append("level", `${input.level}ปีที่`);
    formData.append("studentType", input.studentType);
    formData.append("students", JSON.stringify(data));

    submit(formData, {
      method: "POST",
    });

    setInput({
      academicYear: parseInt(new Date().getFullYear()) + 543,
      level: "มัธยมศึกษา",
      studentType: "",
    });

    document.querySelector('[name="data"]').value = "";
  };

  const handleAlertClose = (event) => {
    setIsAlert(0);
  };

  const fileInputProps = {
    data,
    setData,
    validate,
    setValidate,
  };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-3 md:mx-16 py-6">
        {/* Title */}
        <div className="flex justify-center w-full md:w-9/12 lg:w-6/12 my-6">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 mb-3">
            นำเข้าข้อมูลนักเรียนผ่าน Excel
          </div>
        </div>
        {/* ส่วนช่วยเหลือ */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <ul>
            <li>
              <div className="flex items-center gap-1">
                <FaQuestionCircle />
                ช่วยเหลือ
              </div>
            </li>
            <li className="px-3 text-cyan-600 font-bold">
              <ul>
                <li>
                  <a
                    className="flex items-center gap-1 hover:text-amber-600 w-fit"
                    href={EditExcelStudentID}
                    target="_blank"
                  >
                    <FaBook />
                    วิธีทำให้รหัสมีสามเหลี่ยมสีเขียว Excel
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-1 hover:text-amber-600 w-fit"
                    href="#"
                  >
                    <FaBook />
                    วิธีแยกคํานําหน้าออกจากชื่อ Excel วิธีที่ 1
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-1 hover:text-amber-600 w-fit"
                    href="#"
                  >
                    <FaBook />
                    วิธีแยกคํานําหน้าออกจากชื่อ Excel วิธีที่ 2
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between border-b-4 border-sky-300">
              <div className="text-lg font-bold">นำเข้าข้อมูลนักเรียน</div>
            </div>
            <Form
              method="POST"
              className="flex flex-col gap-2 items-center justify-center my-3"
              autoComplete="off"
              role="form"
              onSubmit={handleSubmit}
            >
              {/* แจ้งเตือน */}
              {isAlert === 1 && (
                <div className="flex justify-between items-center bg-green-300 w-10/12 p-3 rounded text-green-950">
                  นำเข้าข้อมูลสำเร็จ
                  <button type="button">
                    <FaWindowClose
                      className="w-5 h-5"
                      onClick={handleAlertClose}
                    />
                  </button>
                </div>
              )}
              {isAlert === 2 && (
                <div className="flex justify-between items-center bg-red-300 w-10/12 p-3 rounded text-red-950">
                  เกิดข้อผิดพลาด นำเข้าข้อมูลไม่สำเร็จ
                  <button type="button">
                    <FaWindowClose
                      className="w-5 h-5"
                      onClick={handleAlertClose}
                    />
                  </button>
                </div>
              )}
              <div className="flex gap-6 w-10/12">
                <div>Download ต้นฉบับ</div>
                <a
                  className="flex gap-1 text-cyan-600 font-bold"
                  href={ImportStudent}
                >
                  <FaFileDownload className="w-5 h-5" />
                  <div>Download</div>
                </a>
              </div>
              <InputGroup className="w-10/12">
                <label htmlFor="academicYear">ปีการศึกษา</label>
                <Select
                  name="academicYear"
                  optionTexts={[
                    "เลือก",
                    ...loaderData.academic_year.map(
                      (element) => element.academic_year
                    ),
                  ]}
                  optionValues={[
                    "",
                    ...loaderData.academic_year.map(
                      (element) => element.academic_year
                    ),
                  ]}
                  value={input.academicYear}
                  onChange={handleChange}
                />
                <div className="text-red-600">{validate.academicYear}</div>
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="level">ประเภทระดับชั้น</label>
                <Select
                  name="level"
                  optionTexts={["เลือก", "มัธยมศึกษา"]}
                  optionValues={["", "มัธยมศึกษา"]}
                  value={input.level}
                  onChange={handleChange}
                />
                <div className="text-red-600">{validate.level}</div>
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="studentType">ประเภทนักเรียน</label>
                <Select
                  name="studentType"
                  optionTexts={[
                    "เลือก",
                    ...loaderData.student_type.map(
                      (element) => element.student_type
                    ),
                  ]}
                  optionValues={[
                    "",
                    ...loaderData.student_type.map(
                      (element) => element.student_type
                    ),
                  ]}
                  value={input.studentType}
                  onChange={handleChange}
                />
                <div className="text-red-600">{validate.studentType}</div>
              </InputGroup>
              <div className="flex flex-col w-10/12">
                <FileInput {...fileInputProps} />
                <div className="text-red-600">{validate.data}</div>
              </div>
              <div className="flex items-center justify-end w-10/12">
                <DefaultButton
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 font-bold text-white mt-3"
                >
                  <FaFileUpload className="w-5 h-5" />
                  <div>นำเข้าข้อมูล</div>
                </DefaultButton>
              </div>
            </Form>
          </div>
        </Card>
      </div>

      {/* loading */}
      {state !== "idle" && <OverlaySpinner />}
    </div>
  );
}
