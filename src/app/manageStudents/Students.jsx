import {
  FaEdit,
  FaHistory,
  FaPowerOff,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import Card from "../../components/Card";
import { InputGroup, Select, TextInput } from "../../components/inputs";
import { DefaultButton } from "../../components/buttons";
import {
  Table,
  TCol,
  THead,
  THeadCol,
  THeadRow,
  TRow,
} from "../../components/table";

export default function Students() {
  return (
    <div className="p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ข้อมูลนักเรียน
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
              <label htmlFor="searchAcademicYear">ปีการศึกษา</label>
              <Select
                name="searchAcademicYear"
                optionTexts={["2566", "2567"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchStudentType">ประเภทนักเรียน</label>
              <Select
                name="searchStudentType"
                optionTexts={["ชั้น ม.1,4", "ชั้น ม.2,3,5,6"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchLevel">ระดับชั้นเรียน</label>
              <Select
                name="searchLevel"
                optionTexts={["ม.1", "ม.2", "จบการศึกษา"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchSection">ห้อง</label>
              <Select
                name="searchSection"
                optionTexts={["1", "2", "ทั้งหมด"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchStatus">สถานะ</label>
              <Select
                name="searchStatus"
                optionTexts={["ทั้งหมด", "ปกติ", "ปิดการใช้งาน"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="search">คำค้นหา</label>
              <div className="flex items-center justify-center gap-3 w-full">
                <TextInput
                  className="w-full"
                  name="search"
                  placeholder="พิมพ์รายการรับชำระอื่น ๆ ที่ต้องการค้นหา"
                />
                <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2">
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <div>ส่งออกข้อมูล</div>
              <div className="flex flex-col gap-1">
                <DefaultButton className="bg-green-600 hover:bg-green-500 text-white font-bold">
                  ส่งออกข้อมูล Excel
                </DefaultButton>
                <DefaultButton className="bg-sky-600 hover:bg-sky-500 text-white font-bold">
                  ส่งออกข้อมูล Excel เพื่อเปลี่ยนรหัสประจำตัวใหม่
                </DefaultButton>
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol className="w-8">
                <input type="checkbox" name="checkAll" id="checkAll" />
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
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="check_1" id="check_1" />
              </TCol>
              <TCol className="px-2">2</TCol>
              <TCol className="px-2">27275</TCol>
              <TCol className="text-center px-2">เด็กชาย</TCol>
              <TCol className="text-start px-2 text-nowrap">
                ก้องภพ ณุวงษ์ศรี
              </TCol>
              <TCol className="px-2">
                <div className="flex items-center justify-center mx-auto">
                  <FaHistory className="w-5 h-5 text-gray-600" />
                </div>
              </TCol>
              <TCol className="px-2">ห้องเรัยนชั้น ม.1,4</TCol>
              <TCol className="px-2">2567</TCol>
              <TCol className="px-2">ม.6</TCol>
              <TCol className="px-2">ม.1/1</TCol>
              <TCol className="px-2">
                <div className="flex items-center justify-center mx-auto">
                  <FaPowerOff className="w-5 h-5 text-green-600 mx-auto" />
                </div>
              </TCol>
              <TCol className="px-2">
                <button className="flex items-center justify-center mx-auto">
                  <FaEdit className="w-5 h-5 text-yellow-600" />
                </button>
              </TCol>
              <TCol className="px-2">
                <button className="flex items-center justify-center mx-auto">
                  <FaTrashAlt className="w-5 h-5 text-red-600" />
                </button>
              </TCol>
            </TRow>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
