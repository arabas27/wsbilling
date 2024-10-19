import Card from "../../components/Card";
import {
  FileInput,
  InputGroup,
  Select,
  TextInput,
} from "../../components/inputs";

import { DefaultButton } from "../../components/buttons";
import { provinces } from "../../components/API";
import previewIcon1 from "../../assets/preview-icon-1.png";
import ktbLogo from "../../assets/bankLogo/KTB.jpg";
import kbLogo from "../../assets/bankLogo/KB.jpg";
import bblLogo from "../../assets/bankLogo/BBL.jpg";
import scbLogo from "../../assets/bankLogo/SCB.jpg";
import ttbLogo from "../../assets/bankLogo/TTB.jpg";
import boaLogo from "../../assets/bankLogo/BOA.jpg";
import gsbLogo from "../../assets/bankLogo/GSB.jpg";

export default function SchoolInfo() {
  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ข้อมูลโรงเรียน
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex flex-col items-center gap-3">
            <InputGroup className="w-10/12">
              <label htmlFor="schoolCode">รหัสโรงเรียน</label>
              <TextInput name="schoolCode" placeholder="0001" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="schoolName">ชื่อโรงเรียน</label>
              <TextInput
                name="schoolName"
                placeholder="เบตง &#34;วีระราษฎร์ประสาน&#34;"
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="address">ที่อยู่</label>
              <TextInput
                name="address"
                placeholder="19 ถนนรวมวิทย์ ตำบลเบตง อำเภอเบตง จังหวัดยะลา 95110"
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="province">จังหวัด</label>
              <Select name="province" optionTexts={provinces} />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="officer">หน่วยงานติดต่อ</label>
              <TextInput name="officer" placeholder="ฝ่ายการเงิน" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="phone">เบอร์ติตต่อ</label>
              <TextInput name="phone" placeholder="073-230449" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="fax">โทรสาร (FAX)</label>
              <TextInput name="fax" placeholder="073-230449" />
            </InputGroup>
            <InputGroup className="w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div>ระดับการศึกษาที่เปิดสอน</div>
              <label className="flex gap-3">
                <input type="checkbox" name="classType_0" id="classType_0" />
                อนุบาล
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="classType_1" id="classType_1" />
                ประถมศึกษา
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="classType_2" id="classType_2" />
                มัธยมศึกษา
              </label>
            </InputGroup>
            <InputGroup className="w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div>คำนำหน้านักเรียน</div>
              <label className="flex gap-3">
                <input type="radio" name="titleDisplay" id="titleDisplay_0" />
                ใช้แบบย่อ
              </label>
              <label className="flex gap-3">
                <input type="radio" name="titleDisplay" id="titleDisplay_1" />
                ใช้แบบเต็ม
              </label>
            </InputGroup>
            <InputGroup className="gap-1 w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div className="flex flex-col">
                <label htmlFor="directorName">ชื่อผู้อำนวยการโรงเรียน</label>
                <TextInput
                  name="directorName"
                  placeholder="นายสุทธานนท์ ทองนุ่น"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="directorPosition">ตำแหน่ง</label>
                <TextInput
                  name="directorPosition"
                  placeholder="ผู้อำนวยการโรงเรียน"
                />
              </div>
            </InputGroup>
            <InputGroup className="gap-1 w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div className="flex flex-col">
                <label htmlFor="recieverName">ชื่อผู้รับเงิน</label>
                <Select
                  name="recieverName"
                  optionTexts={[
                    "นางกรองทอง  เจริญวัฒนวิโรจน์",
                    "นางสาวบุญสิตา พงศ์เลขา",
                  ]}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="recieverPosition">ตำแหน่ง</label>
                <TextInput
                  name="recieverPosition"
                  placeholder="เจ้าหน้าที่การเงิน"
                />
              </div>
            </InputGroup>
            <InputGroup className="gap-1 w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div className="flex flex-col items-center">
                <label htmlFor="schoolLogo">ตัวอย่างตราโรงเรียน</label>
                <img
                  name="schoolLogo"
                  src={previewIcon1}
                  width={100}
                  height={100}
                />
                <div className="text-sm text-gray-600">
                  ขนาดไฟล์ภาพที่ 100px X 100px
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="schoolLogoUpload">แนบภาพตราโรงเรียน</label>
                <FileInput name="schoolLogoUpload" />
              </div>
            </InputGroup>
            <InputGroup className="gap-1 w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div className="flex flex-col items-center">
                <label htmlFor="associationLogo">ตัวอย่างตราสมาคม</label>
                <img
                  name="associationLogo"
                  src={previewIcon1}
                  width={100}
                  height={100}
                />
                <div className="text-sm text-gray-600">
                  ขนาดไฟล์ภาพที่ 100px X 100px
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="associationLogoUpload">แนบภาพตราสมาคม</label>
                <FileInput name="associationLogoUpload" />
              </div>
            </InputGroup>
            <InputGroup className="gap-1 w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div className="flex flex-col items-center">
                <label htmlFor="associationLogo">
                  ตัวอย่างลายเซ็นผู้อำนวยการ
                </label>
                <img
                  name="associationLogo"
                  src={previewIcon1}
                  width={100}
                  height={100}
                />
                <div className="text-sm text-gray-600">
                  ขนาดไฟล์ภาพที่ 100px X 100px
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="associationLogoUpload">
                  แนบภาพลายเซ็นผู้อำนวยการ
                </label>
                <FileInput name="associationLogoUpload" />
              </div>
            </InputGroup>
          </div>
        </Card>

        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            ตั้งค่าส่วนของธนาคาร
          </div>
        </div>

        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex flex-col gap-3">
            <InputGroup className="w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div>เลือกธนาคาร</div>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_0" />
                <img src={ktbLogo} />
                <div className="text-sky-400 font-bold">กรุงไทย</div>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_1" />
                <img src={kbLogo} />
                <div className="text-green-500 font-bold">กสิกรไทย</div>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_2" />
                <img src={bblLogo} />
                <div className="text-blue-800 font-bold">กรุงเทพ</div>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_3" />
                <img src={scbLogo} />
                <div className="text-blue-800 font-bold">ไทยพาณิชย์</div>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_4" />
                <img src={ttbLogo} />
                <div className="text-blue-900 font-bold">ทีเอ็มบีธนชาต</div>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_5" />
                <img src={boaLogo} />
                <div className="text-yellow-600 font-bold">กรุงศรีอยุธยา</div>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="bank" id="bank_5" />
                <img src={gsbLogo} />
                <div className="text-pink-500 font-bold">ออมสิน</div>
              </label>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="productCode">Product Code</label>
              <TextInput name="productCode" placeholder="xxxxx" />
              <label className="flex gap-2" htmlFor="useRef">
                <input type="checkbox" name="useRef" id="useRef" />
                เลือกเพื่อใช้ ref เทอมปีการศึกษา
              </label>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="taxID">เลขประจำตัวผู้เสียภาษีอากร (Tax ID)</label>
              <TextInput name="taxID" placeholder="xxxxxxxxxxxxx" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="suffix">Suffix</label>
              <TextInput name="suffix" placeholder="00" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <div>หมายเหตุ</div>
              <ul>
                <ol>- ยอดเงินรวมข้างต้น ยังไม่รวมอัตราค่าธรรมเนียมของธนาคาร</ol>
                <ol>
                  - ผู้ชำระเงินเป็นผู้รับผิดชอบค่าธรรมเนียมธนาคารในอัตรา 10 บาท
                  อัตราเดียวทั่วประเทศ
                </ol>
                <ol>
                  - สามารนำไปชำระเงินได้ที่ธนาคารกรุงไทย จำกัด (มหาชน)
                  ทุกสาขาทั่วประเทศ
                </ol>
                <ol>
                  - กรณีมีเหตุขัดข้องไม่สามารถชำระเงินได้ กรุณาติดต่อที่ Call
                  Center ธ. กรุงไทย โทร. 1551
                </ol>
                <ol>
                  - หากเกินกำหนดวันรับชำระเงิน
                  ให้นักเรียนไปติดต่อที่งานทะเบียนของโรงเรียน
                </ol>
              </ul>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="deadLine">กำหนดวันชำระเงิน PayIn</label>
              <TextInput name="deadLine" placeholder="xx - xx มิถุนายน 2567" />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label className="flex gap-2">
                <input type="checkbox" name="crossBank" id="crossBank" />
                เลือกเพื่อใช้ระบบ Cross Bank โอนเงินข้ามธนาคารได้
              </label>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label className="flex gap-2">
                <input type="checkbox" name="payIn" id="payIn" />
                เลือกเพื่อเปิดให้นักเรียนพิมพ์ใบ Pay In จากระบบได้
              </label>
            </InputGroup>

            <InputGroup className="w-10/12 border p-3 rounded shadow shadow-gray-600">
              <div>กำหนดพิมพ์ใบแจ้งชำระเงิน Pay In รายระดับชั้น</div>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_0"
                  id="levelToPrint_0"
                />
                เลือกทั้งหมด
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_1"
                  id="levelToPrint_1"
                />
                มัธยมศึกษาปีที่ 1
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_2"
                  id="levelToPrint_2"
                />
                มัธยมศึกษาปีที่ 2
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_3"
                  id="levelToPrint_3"
                />
                มัธยมศึกษาปีที่ 3
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_4"
                  id="levelToPrint_4"
                />
                มัธยมศึกษาปีที่ 4
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_5"
                  id="levelToPrint_5"
                />
                มัธยมศึกษาปีที่ 5
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="levelToPrint_6"
                  id="levelToPrint_6"
                />
                มัธยมศึกษาปีที่ 6
              </label>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="deptNotify">
                กำหนดวันชำระเงิน (ใบแจ้งค้างชำระ)
              </label>
              <TextInput name="deptNotify" placeholder="xx - xx กรกฎาคม 2566" />
            </InputGroup>
          </div>
        </Card>

        <div className="flex flex-col">
          <div className="flex">
            <span className="w-3/12 text-nowrap font-bold">ผู้สร้าง</span>
            <span className="w-9/12 text-nowrap">
              ผู้ดูแลระบบ - 21/1/2553 10:43:33
            </span>
          </div>
          <div className="flex">
            <span className="w-3/12 text-nowrap font-bold">ผู้แก้ไข</span>
            <span className="w-9/12 text-nowrap">
              นายสมชาย ใจสุข - 21/1/2553 10:43:33
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <DefaultButton className="bg-green-600 text-white font-bold">
            บันทึก
          </DefaultButton>
          <DefaultButton className="bg-red-600 text-white font-bold">
            ยกเลิก
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
