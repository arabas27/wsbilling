import { FaHistory } from "react-icons/fa";
import Card from "../../components/Card";
import { DefaultButton } from "../../components/buttons";
import { InputGroup, Select, TextInput } from "../../components/inputs";
import {
  Table,
  TCol,
  THead,
  THeadCol,
  THeadRow,
  TRow,
} from "../../components/table";

export default function ExceptStudent() {
  return (
    <div className="flex flex-col gap-3 p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            เลือกนักเรียนยกเว้นการชำระค่าเทอม
          </div>
        </div>

        {/* ระบุรายละเอียดใบเสร็จ */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ระบุรายละเอียดใบเสร็จ</div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <label htmlFor="receiptType">ประเภท</label>
              <Select
                name="receiptType"
                optionTexts={["ใบเสร็จรับเงิน สพฐ.", "-"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <div className="flex gap-3 items-center">
                <label htmlFor="semester">เทอม</label>
                <span>/</span>
                <label htmlFor="academicYear">ปี</label>
              </div>
              <div className="flex gap-3 items-center w-full">
                <Select
                  className="grow"
                  name="semester"
                  optionTexts={["1", "2"]}
                />
                <span>/</span>
                <Select
                  className="grow"
                  name="academicYear"
                  optionTexts={["2567", "2568"]}
                />
              </div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="officer">ผู้ทำรายการ</label>
              <Select
                name="officer"
                optionTexts={["นายเอ เอ", "นางสาวบี บี"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="officerPosition">ตำแหน่ง</label>
              <TextInput
                className="w-full"
                name="officerPosition"
                placeholder="เจ้าหน้าที่การเงิน"
                defaultValue="เจ้าหน้าที่การเงิน"
              />
            </InputGroup>
          </div>
        </Card>

        {/* เลือกห้องเรียน */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">เลือกห้องเรียน</div>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <div className="flex gap-3 items-center">
                <label htmlFor="level">เลือกระดับชั้น</label>
                <span>/</span>
                <label htmlFor="section">ห้อง</label>
              </div>
              <div className="flex gap-3 items-center w-full">
                <Select
                  className="w-full"
                  name="level"
                  optionTexts={[
                    ...[...Array(6).keys()].map(
                      (value) => `มัธยมศึกษาปีที่ ${value + 1}`
                    ),
                    "มัธยมศึกษา จบการศึกษา",
                  ]}
                />
                <span>/</span>
                <Select
                  className="w-full"
                  name="academicYear"
                  optionTexts={[
                    "ทั้งหมด",
                    ...[...Array(8).keys()].map((value) => `ห้อง ${value + 1}`),
                  ]}
                />
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      <div className="flex">
        <DefaultButton className="bg-teal-600 hover:bg-teal-500 font-bold text-white">
          บันทึก
        </DefaultButton>
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
              <THeadCol className="w-16">ห้อง</THeadCol>
              <THeadCol>ประเภทนักเรียน</THeadCol>
              <THeadCol className="w-28">ยอดชำระ</THeadCol>
              <THeadCol className="w-28">ผ่อนชำระ</THeadCol>
              <THeadCol className="w-16">ประวัติชำระ</THeadCol>
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
              <TCol className="px-2">ม.1/1</TCol>
              <TCol className="px-2">ห้องเรัยนชั้น ม.1,4</TCol>
              <TCol className="px-2">ยังไม่กำหนด</TCol>
              <TCol className="px-2"></TCol>
              <TCol className="px-2">
                <DefaultButton className="flex items-center justify-center mx-auto">
                  <div className="animate-[spin_10s_linear_infinite]">
                    <FaHistory className="w-5 h-5 text-gray-600 -scale-x-100" />
                  </div>
                </DefaultButton>
              </TCol>
            </TRow>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
