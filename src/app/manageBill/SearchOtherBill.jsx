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

export default function SearchOtherBill() {
  return (
    <div className="flex flex-col gap-3 p-1 md:p-6">
      {/* ส่วน filter */}
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ค้นหาและจัดการใบเสร็จรับเงินอื่น ๆ
          </div>
        </div>

        {/* ต้นหาระบุรายละเอียดใบเสร็จ */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหาใบเสร็จรับเงิน</div>
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
                <label htmlFor="searchPayerType">ประเภทผู้จ่ายเงิน</label>
                <Select
                  name="searchPayerType"
                  optionTexts={["ทั้งหมด", "ร้านค้า", "สมาคมศิษย์เก่า วส."]}
                />
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
                optionTexts={["ทั้งหมด", "ชำระแล้ว", "ยกเลิกใบเสร็จ"]}
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
              <THeadCol className="w-20">ที่</THeadCol>
              <THeadCol className="w-20">สถานะ</THeadCol>
              <THeadCol className="w-36">ประเภท</THeadCol>
              <THeadCol className="w-16">เทอม/ปี</THeadCol>
              <THeadCol className="w-16">เล่มที่</THeadCol>
              <THeadCol className="w-16">เลขที่ใบเสร็จ</THeadCol>
              <THeadCol className="w-24">ลงวันที่</THeadCol>
              <THeadCol>ชื่อผู้จ่ายเงิน</THeadCol>
              <THeadCol className="w-36">จำนวนเงิน</THeadCol>
              <THeadCol className="w-16">ประวัติ</THeadCol>
              <THeadCol className="w-16">ยกเลิก</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="check_1" id="check_1" />
              </TCol>
              <TCol className="px-2">1002</TCol>
              <TCol className="px-2">ชำระแล้ว</TCol>
              <TCol className="text-center">ใบเสร็จรับเงินอื่น ๆ</TCol>
              <TCol className="text-center">1/2567</TCol>
              <TCol className="text-center">17668</TCol>
              <TCol className="text-center">0455</TCol>
              <TCol className="text-center">13/06/2567</TCol>
              <TCol className="text-start text-nowrap px-2">
                ก้องภพ ณุวงษ์ศรี
              </TCol>
              <TCol className="text-end px-2">100,000,000.00</TCol>
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
    </div>
  );
}
