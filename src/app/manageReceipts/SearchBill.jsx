import { FaHistory, FaSearch, FaWindowClose } from "react-icons/fa";
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
  InputGroup,
  NumberInput,
  Select,
  TextInput,
} from "../../components/inputs";
import Card from "../../components/Card";
import { months_th_mini } from "../../components/API";

export default function SearchBill() {
  return (
    <div className="flex flex-col gap-3 p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            จัดการใบเสร็จ
          </div>
        </div>

        {/* ต้นหาระบุรายละเอียดใบเสร็จ */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ระบุรายละเอียดใบเสร็จ</div>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center my-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-10/12">
              <InputGroup className="overflow-auto w-full">
                <label htmlFor="searchReceiptType">ประเภท</label>
                <Select
                  name="searchReceiptType"
                  optionTexts={["ใบเสร็จรับเงิน สพฐ.", "-"]}
                />
              </InputGroup>
              <InputGroup className="overflow-auto w-full">
                <label htmlFor="searchBookNumber">เล่มที่</label>
                <Select
                  name="searchBookNumber"
                  optionTexts={["ทั้งหมด", "17669", "17670"]}
                />
              </InputGroup>
              <InputGroup className="overflow-auto w-full">
                <label htmlFor="searchReceiptNumber">เลขที่</label>
                <NumberInput name="searchReceiptNumber" />
              </InputGroup>
            </div>
            <div className="flex gap-3 w-10/12">
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="searchSemester">เทอม</label>
                <Select name="searchSemester" optionTexts={["1", "2"]} />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="searchAcademicYear">ปีการศึกษา</label>
                <Select
                  name="searchAcademicYear"
                  optionTexts={["2567", "2568"]}
                />
              </InputGroup>
            </div>
            <div className="flex gap-3 w-10/12">
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="searchLevel">ระดับชั้น</label>
                <Select
                  name="searchLevel"
                  optionTexts={[
                    "ทั้งหมด",
                    "มัธยมศึกษาปีที่ 1",
                    "มัธยมศึกษาปีที่ 2",
                  ]}
                />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="searchClass">ห้องเรียน</label>
                <Select
                  name="searchClass"
                  optionTexts={["ทั้งหมด", "ม.1/1", "ม.1/2"]}
                />
              </InputGroup>
            </div>
            <div className="flex gap-3 w-10/12 shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isSearchReceiveNumber"
                    id="isSearchReceiveNumber"
                  />
                  ค้นหาจากเลขที่ใบเสร็จ
                </label>
                <div className="flex items-center gap-3">
                  <div className="text-sm">จาก</div>
                  <NumberInput
                    className="w-full disabled:bg-gray-300"
                    name="searchBeginReceiveNumber"
                    disabled={true}
                  />
                  <div className="text-sm">ถึง</div>
                  <NumberInput
                    className="w-full disabled:bg-gray-300"
                    name="searchLastReceiveNumber"
                    disabled={true}
                  />
                </div>
              </InputGroup>
            </div>
            <div className="flex flex-col items-center w-10/12 shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <div className="flex gap-3 w-full">
                <InputGroup className="w-full overflow-auto">
                  <label className="flex gap-1">
                    <input
                      type="checkbox"
                      name="isSearchDateOfReceive"
                      id="isSearchDateOfReceive"
                    />
                    ค้นหาจากวันที่ออกใบเสร็จ
                  </label>
                  <div className="flex items-center gap-3">
                    <Select
                      className="w-full disabled:bg-gray-300"
                      name="searchBeginDateOfReceive"
                      optionTexts={[...Array(31).keys()].map(
                        (value) => value + 1
                      )}
                      disabled={true}
                    />
                    <Select
                      className="w-full disabled:bg-gray-300"
                      name="searchBeginMonthOfReceive"
                      optionTexts={months_th_mini}
                      disabled={true}
                    />
                    <Select
                      className="w-full disabled:bg-gray-300"
                      name="searchBeginYearOfReceive"
                      optionTexts={[...Array(10).keys()].map(
                        (value) => value + 2565
                      )}
                      disabled={true}
                    />
                  </div>
                </InputGroup>
              </div>
              <div className="flex items-center justify-center bg-white border border-gray-600 w-8 h-8 rounded-full my-2">
                ถึง
              </div>
              <div className="flex gap-3 w-full">
                <InputGroup className="w-full overflow-auto">
                  <div className="flex items-center gap-3">
                    <Select
                      className="w-full disabled:bg-gray-300"
                      name="searchLastDateOfReceive"
                      optionTexts={[...Array(31).keys()].map(
                        (value) => value + 1
                      )}
                      disabled={true}
                    />
                    <Select
                      className="w-full disabled:bg-gray-300"
                      name="searchLastMonthOfReceive"
                      optionTexts={months_th_mini}
                      disabled={true}
                    />
                    <Select
                      className="w-full disabled:bg-gray-300"
                      name="searchLastYearOfReceive"
                      optionTexts={[...Array(10).keys()].map(
                        (value) => value + 2565
                      )}
                      disabled={true}
                    />
                  </div>
                </InputGroup>
              </div>
            </div>

            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiveStatus">สถานะใบเสร็จ</label>
              <Select
                name="searchReceiveStatus"
                optionTexts={[
                  "ทั้งหมด",
                  "ชำระแล้ว",
                  "ยกเลิกใบเสร็จ",
                  "ยกเว้นการชำระ",
                ]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiveType">ประเภทใบเสร็จ</label>
              <Select
                name="searchReceiveType"
                optionTexts={["ทั้งหมด", "ใบเสร็จปกติ", "ใบเสร็จผ่อนชำระ"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchPaymentMedthod">ประเภทการชำระ</label>
              <Select
                name="searchPaymentMedthod"
                optionTexts={["ทั้งหมด", "ผ่านธนาคาร", "เงินสด", "บัตรเครดิต"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchInstallmentType">รูปแบบการผ่อนชำระ</label>
              <Select
                name="searchInstallmentType"
                optionTexts={[
                  "ทั้งหมด",
                  "การผ่อนชำระแบบออกใบเสร็จ",
                  "การผ่อนชำระแบบไม่ออกใบเสร็จ",
                ]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="search">คำค้นหา</label>
              <div className="flex items-center justify-center gap-3 w-full">
                <TextInput
                  className="w-full"
                  name="search"
                  placeholder="พิมพ์ระดับชั้นที่ต้องการค้นหา"
                />
                <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2">
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </InputGroup>
            <InputGroup className="w-10/12 shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <div>พิมพ์รายงาน</div>
              <div className="flex gap-3">
                <DefaultButton className="bg-red-600 hover:bg-red-500 font-bold text-white">
                  PDF
                </DefaultButton>
                <DefaultButton className="bg-green-600 hover:bg-green-500 font-bold text-white">
                  Excel
                </DefaultButton>
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <DefaultButton className="bg-red-600 hover:bg-red-500 font-bold text-white">
          ยกเลิก
        </DefaultButton>
        <DefaultButton className="bg-gray-600 hover:bg-gray-500 font-bold text-white">
          ลบ
        </DefaultButton>
      </div>

      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol className="w-8">
                <input type="checkbox" name="checkAll" id="checkAll" />
              </THeadCol>
              <THeadCol className="w-12">ที่</THeadCol>
              <THeadCol className="w-20">สถานะ</THeadCol>
              <THeadCol className="w-20">ชำระ</THeadCol>
              <THeadCol className="w-24">ประเภท</THeadCol>
              <THeadCol className="w-16">เทอม/ปี</THeadCol>
              <THeadCol className="w-16">เล่มที่</THeadCol>
              <THeadCol className="w-16">เลขที่ใบเสร็จ</THeadCol>
              <THeadCol className="w-24">ลงวันที่</THeadCol>
              <THeadCol className="w-16">เลขประจำตัว</THeadCol>
              <THeadCol>ชื่อ-นามสกุล</THeadCol>
              <THeadCol className="w-36">ระดับชั้น</THeadCol>
              <THeadCol className="w-14">ห้อง</THeadCol>
              <THeadCol className="w-28">ประเภทนักเรียน</THeadCol>
              <THeadCol className="w-28">จำนวนเงิน</THeadCol>
              <THeadCol className="w-16">ประวัติ</THeadCol>
              <THeadCol className="w-16">ยกเลิก</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="check_1" id="check_1" />
              </TCol>
              <TCol className="px-2">2</TCol>
              <TCol className="px-2">ชำระแล้ว</TCol>
              <TCol className="text-center">เงินสด</TCol>
              <TCol className="text-center">ใบเสร็จปกติ</TCol>
              <TCol className="text-center">1/2567</TCol>
              <TCol className="text-center">17668</TCol>
              <TCol className="text-center">0455</TCol>
              <TCol className="text-center">13/06/2567</TCol>
              <TCol className="text-center">26965</TCol>
              <TCol className="text-start text-nowrap px-2">
                ก้องภพ ณุวงษ์ศรี
              </TCol>
              <TCol className="text-center px-2">มัธยมศึกษาปีที่ 3</TCol>
              <TCol className="text-center px-2">ม.3/1</TCol>
              <TCol className="text-center px-2">ห้องเรียนชั้น ม.2,3,5,6</TCol>
              <TCol className="text-end px-2">470.00</TCol>
              <TCol className="px-2">
                <DefaultButton className="flex items-center justify-center mx-auto">
                  <div className="animate-[spin_10s_linear_infinite]">
                    <FaHistory className="w-5 h-5 text-gray-600 -scale-x-100" />
                  </div>
                </DefaultButton>
              </TCol>
              <TCol className="px-2">
                <DefaultButton className="flex items-center justify-center mx-auto">
                  <FaWindowClose className="w-5 h-5 text-red-600" />
                </DefaultButton>
              </TCol>
            </TRow>
          </tbody>
        </Table>
      </div>

      {/* ส่วนแก้ไขข้อมูล */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        <Card className="w-full p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">แก้ไขข้อมูล</div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 content-normal place-items-center my-3">
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isEditBookNumber"
                    id="isEditBookNumber"
                  />
                  แก้ไขเล่มที่ใบเสร็จ
                </label>
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editฺBookNumberType">ประเภทใบเสร็จ</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editฺBookNumberType"
                  optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
                  disabled={true}
                />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editBookNumber">เล่มที่</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editBookNumber"
                  optionTexts={["เลือก", "17669", "17670"]}
                  disabled={true}
                />
              </InputGroup>
            </div>
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isEditReceiptNumber"
                    id="isEditReceiptNumber"
                  />
                  แก้ไขเลขที่ใบเสร็จ
                </label>
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editReceiptNumberAction">การดำเนินการ</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editReceiptNumberAction"
                  optionTexts={["ลดค่า", "เพิ่มค่า"]}
                  disabled={true}
                />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editReceiptNumberAmount">จำนวน</label>
                <NumberInput
                  className="w-full disabled:bg-gray-300"
                  name="editReceiptNumberAmount"
                  disabled={true}
                />
              </InputGroup>
            </div>
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isEditReceiptDate"
                    id="isEditReceiptDate"
                  />
                  แก้ไขวันที่ใบเสร็จ
                </label>
              </InputGroup>
              <div className="flex items-center gap-3">
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editDateOfReceipt"
                  optionTexts={[...Array(31).keys()].map((value) => value + 1)}
                  disabled={true}
                />
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editMonthOfReceipt"
                  optionTexts={months_th_mini}
                  disabled={true}
                />
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editYearOfReceipt"
                  optionTexts={[...Array(10).keys()].map(
                    (value) => value + 2565
                  )}
                  disabled={true}
                />
              </div>
            </div>
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isEditPaymentMethod"
                    id="isEditPaymentMethod"
                  />
                  แก้ไขประเภทการชำระ
                </label>
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editPaymentMethod">ประเภทการชำระ</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editPaymentMethod"
                  optionTexts={["ผ่านธนาคาร", "เงินสด", "บัตรเครดิต"]}
                  disabled={true}
                />
              </InputGroup>
            </div>
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isEditReceiver"
                    id="isEditReceiver"
                  />
                  แก้ไขผู้รับเงิน
                </label>
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editReceiver">ผู้รับเงิน</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editReceiver"
                  optionTexts={["นางสาวเอ บี", "เงินสด", "บัตรเครดิต"]}
                  disabled={true}
                />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editReceiverPosition">ตำแหน่งผู้รับเงิน</label>
                <TextInput
                  className="w-full disabled:bg-gray-300"
                  name="editReceiverPosition"
                  defaultValue="เจ้าหน้าที่การเงิน"
                  disabled={true}
                />
              </InputGroup>
            </div>
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input type="checkbox" name="isEditLevel" id="isEditLevel" />
                  แก้ไขระดับชั้น/ห้องเรียน
                </label>
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editLevel">ระดับชั้น</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editLevel"
                  optionTexts={[
                    "มัธยมศึกษาปีที่ 1",
                    "มัธยมศึกษาปีที่ 2",
                    "มัธยมศึกษาปีที่ 3",
                  ]}
                  disabled={true}
                />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editClass">ห้องเรียน</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editClass"
                  optionTexts={["เลือก", "ม.1/1", "ม.2/1", "ม.3/1"]}
                  disabled={true}
                />
              </InputGroup>
            </div>
            {/* ----------------- */}
            <div className="flex flex-col gap-3 w-full shadow shadow-gray-600 bg-slate-50 rounded p-3">
              <InputGroup className="w-full overflow-auto">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    name="isEditStudent"
                    id="isEditStudent"
                  />
                  แก้ไขนักเรียน
                </label>
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editAcademicYear">ปีการศึกษา</label>
                <Select
                  className="w-full disabled:bg-gray-300"
                  name="editAcademicYear"
                  optionTexts={["เลือก", "2566", "2567", "2568"]}
                  disabled={true}
                />
              </InputGroup>
              <InputGroup className="w-full overflow-auto">
                <label htmlFor="editStudentId">รหัสนักเรียน</label>
                <div className="flex gap-3">
                  <NumberInput
                    className="w-full disabled:bg-gray-300"
                    name="editStudentId"
                    disabled={true}
                  />
                  <button
                    className="bg-sky-600 hover:bg-sky-500 disabled:bg-gray-300 text-white rounded-full p-2"
                    disabled={true}
                  >
                    <FaSearch className="w-4 h-4" />
                  </button>
                </div>
              </InputGroup>
              <div>
                <div>รหัสนักเรียน : 11012 เลขที่ : 12</div>
                <div>ชื่อ : เด็กหญิงแก้วนภา แก้วประดิษฐ์</div>
                <div>ชั้น/ห้อง : ม.1/1</div>
                <div>ประเภทนักเรียน : ห้องเรียนชั้นม. 1,4</div>
              </div>
            </div>
            {/* ----------------- */}
            <div className="lg:col-span-2 flex gap-3">
              <DefaultButton className="bg-green-600 hover:bg-green-500 text-white font-bold">
                แก้ไข
              </DefaultButton>
              <DefaultButton className="bg-red-600 hover:bg-red-500 text-white font-bold">
                ยกเลิก
              </DefaultButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
