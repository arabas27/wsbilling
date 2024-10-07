import Card from "../../components/Card";
import UpdateStudentIDCard from "../../assets/UpdateStudentIDCard.xls";
import { FileInput, InputGroup } from "../../components/inputs";
import { FaFileDownload, FaFileUpload } from "react-icons/fa";
import { DefaultButton } from "../../components/buttons";

export default function UpdateIDCard() {
  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-3 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12 my-6">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 mb-3">
            นำเข้าข้อมูลนักเรียนผ่าน Excel
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between border-b-4 border-sky-300">
              <div className="text-lg font-bold">
                แก้ไขเลขประจำตัวประชาชนเป็นรหัสนักเรียน (เด็กใหม่)
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center my-3">
              <div className="flex gap-6 w-10/12">
                <div>Download ต้นฉบับ</div>
                <a
                  className="flex gap-1 text-cyan-600 font-bold"
                  href={UpdateStudentIDCard}
                >
                  <FaFileDownload className="w-5 h-5" />
                  <div>Download</div>
                </a>
              </div>
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
