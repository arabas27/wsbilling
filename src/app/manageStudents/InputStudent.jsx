import Card from "../../components/Card";
import EditExcelStudentID from "../../assets/EditExcelStudentID.pdf";
import ImportStudent from "../../assets/ImportStudent.xls";
import { FileInput, InputGroup, Select } from "../../components/inputs";
import {
  FaBook,
  FaFileDownload,
  FaFileUpload,
  FaQuestionCircle,
} from "react-icons/fa";
import { DefaultButton } from "../../components/buttons";

export default function InputStudent() {
  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-3 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12 my-6">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 mb-3">
            นำเข้าข้อมูลนักเรียนผ่าน Excel
          </div>

          {/* ส่วนช่วยเหลือ */}
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
                    className="flex items-center gap-1 hover:text-amber-600"
                    href={EditExcelStudentID}
                    target="_blank"
                  >
                    <FaBook />
                    วิธีทำให้รหัสมีสามเหลี่ยมสีเขียว Excel
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-1 hover:text-amber-600"
                    href="#"
                  >
                    <FaBook />
                    วิธีแยกคํานําหน้าออกจากชื่อ Excel วิธีที่ 1
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-1 hover:text-amber-600"
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
            <div className="flex flex-col gap-2 items-center justify-center my-3">
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
                <Select name="academicYear" optionTexts={["2566", "2567"]} />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="levelType">ประเภทระดับชั้น</label>
                <Select name="levelType" optionTexts={["มัธยมศึกษา"]} />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="studentType">ประเภทนักเรียน</label>
                <Select
                  name="studentType"
                  optionTexts={["ห้องเรียนชั้น ม.1,4"]}
                />
              </InputGroup>
              <InputGroup className="w-10/12">
                <label htmlFor="fileUpload">เลือกไฟล์นำเข้า</label>
                <FileInput name="fileUpload" />
              </InputGroup>
              <div className="flex items-center justify-end w-10/12">
                <DefaultButton className="bg-teal-600 font-bold text-white mt-3">
                  <FaFileUpload className="w-5 h-5" />
                  <div></div>นำเข้าข้อมูล
                </DefaultButton>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
