import Card from "../../components/Card";
import {
  ControlledNumberInput,
  ControlledSelect,
  InputGroup,
  Select,
  TextInput,
} from "../../components/inputs";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaWindowClose,
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
import { PopUpContainer } from "../../components/popup";
import PropTypes from "prop-types";
import clsx from "clsx";

function AddDetail({ index, detailItems, setDetailItmes }) {
  function handleChange(event, itemName) {
    let newArray = [...detailItems];

    newArray[index] = {
      ...detailItems[index],
      [itemName]: event.currentTarget.value,
    };

    setDetailItmes(newArray);
  }

  function deleteRow(index) {
    setDetailItmes((prev) => prev.filter((el) => el.index !== index));
  }

  return (
    <div
      className={clsx("flex flex-col lg:flex-row gap-1 p-1 rounded", {
        "bg-gray-200": index % 2 === 0,
      })}
    >
      <InputGroup className="w-full lg:w-5/12">
        <label className="text-sm" htmlFor={"detail_" + index.toString()}>
          รายการชำระ
        </label>
        <ControlledSelect
          name={"detail_" + index.toString()}
          optionTexts={[
            "ค่าจ้างบุคลากรที่ปฏิบัติหน้าที่ในสถานศึกษา",
            "ค่าประกันอุบัติเหตุ",
            "ค่าจ้างครูชาวต่างประเทศ",
            "ค่าเรียนปรับพื้นฐานความรู้",
          ]}
          value={detailItems[index].detail}
          onChange={(event) => handleChange(event, "detail")}
        />
      </InputGroup>
      <div className="flex lg:inline-flex gap-1 w-full lg:w-7/12">
        <InputGroup className="w-5/12">
          <label className="text-sm" htmlFor={"unit_" + index.toString()}>
            จำนวน (หน่วย)
          </label>
          <ControlledNumberInput
            name={"unit_" + index.toString()}
            value={detailItems[index].unit}
            onChange={(event) => handleChange(event, "unit")}
            onClick={(event) => event.currentTarget.select()}
          />
        </InputGroup>
        <InputGroup className="w-5/12">
          <label
            className="text-sm"
            htmlFor={"cashPerUnit_" + index.toString()}
          >
            หน่วยละ (บาท)
          </label>
          <ControlledNumberInput
            name={"cashPerUnit_" + index.toString()}
            value={detailItems[index].cashPerUnit}
            onChange={(event) => handleChange(event, "cashPerUnit")}
            onClick={(event) => event.currentTarget.select()}
          />
        </InputGroup>
        <div className="flex items-center justify-center grow">
          <button
            className="bg-red-600 rounded-full text-white p-2"
            onClick={() => deleteRow(detailItems[index].index)}
          >
            <FaTrashAlt className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

AddDetail.propTypes = {
  index: PropTypes.number,
  detailItems: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      detail: PropTypes.string,
      unit: PropTypes.string,
      cashPerUnit: PropTypes.string,
    })
  ),
  setDetailItmes: PropTypes.func,
};

export default function PaymentDetail() {
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [detailItems, setDetailItmes] = useState([
    {
      index: 0,
      detail: "ค่าจ้างบุคลากรที่ปฏิบัติหน้าที่ในสถานศึกษา",
      unit: "0",
      cashPerUnit: "0",
    },
  ]);

  function handleClickAddItem() {
    setDetailItmes((prev) => [
      ...prev,
      {
        index:
          detailItems.length > 0
            ? detailItems[detailItems.length - 1].index + 1
            : 0,
        detail: "ค่าจ้างบุคลากรที่ปฏิบัติหน้าที่ในสถานศึกษา",
        unit: "0",
        cashPerUnit: "0",
      },
    ]);
  }

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="w-full md:w-9/12 lg:w-6/12">
          <div className="text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
            กำหนดรายละเอียดรายการรับชำระ
          </div>
        </div>

        {/* ส่วนค้นหาข้อมูล */}
        <Card className="w-full md:w-9/12 lg:w-8/12 xl:w-6/12 p-3">
          <div className="flex justify-between border-b-4 border-sky-300">
            <div className="text-lg font-bold">ค้นหา</div>
            <div>จำนวน 0 รายการ</div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center my-3">
            <InputGroup className="w-10/12">
              <div className="flex">
                <label htmlFor="searchSemister">เทอม</label>
                <div className="px-2">/</div>
                <label htmlFor="seachAcademicYear">ปีการศึกษา</label>
              </div>
              <div className="flex items-center gap-3 w-full">
                <Select name="searchSemister" optionTexts={[1, 2]} />
                <div>/</div>
                <Select name="seachAcademicYear" optionTexts={[2566, 2567]} />
              </div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiptType">ประเภทใบเสร็จ</label>
              <Select
                name="searchReceiptType"
                optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchStudentType">ประเภทนักเรียน</label>
              <Select
                name="searchStudentType"
                optionTexts={["ห้องเรียนชั้น ม.1,4", "ห้องเรียนชั้น ม.2,3,5,6"]}
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="search">คำค้นหา</label>
              <div className="flex items-center justify-center gap-3 w-full">
                <TextInput
                  className="w-full"
                  name="search"
                  placeholder="พิมพ์รายการรับชำระที่ต้องการค้นหา"
                />
                <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2">
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </InputGroup>
          </div>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="flex gap-1 mt-10 mb-3">
        <DefaultButton
          className="flex flex-row bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => {
            setIsShowPopUp(true);
          }}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">เพิ่ม</div>
        </DefaultButton>
        <DefaultButton className="flex flex-row bg-red-600 hover:bg-red-500 text-white">
          <FaTrashAlt className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">ลบ</div>
        </DefaultButton>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-auto">
        <Table>
          <THead>
            <THeadRow>
              <THeadCol>
                <input type="checkbox" name="checkAll" id="checkAll" />
              </THeadCol>
              <THeadCol>ที่</THeadCol>
              <THeadCol>เทอม</THeadCol>
              <THeadCol>ปี</THeadCol>
              <THeadCol>ประเภทนักเรียน</THeadCol>
              <THeadCol>ประเภทใบเสร็จ</THeadCol>
              <THeadCol>ยอดชำระ</THeadCol>
              <THeadCol>แก้ไข</THeadCol>
              <THeadCol>ลบ</THeadCol>
            </THeadRow>
          </THead>
          <tbody>
            <TRow className="text-center" index={0}>
              <TCol className="px-2">
                <input type="checkbox" name="check1" id="check1" />
              </TCol>
              <TCol className="px-2">2</TCol>
              <TCol className="px-2">2</TCol>
              <TCol className="px-2">2567</TCol>
              <TCol className="text-start font-bold px-2">
                ห้องเรียนชั้น ม.2,3,5,6
              </TCol>
              <TCol className="px-2">ใบเสร็จรับเงิน สพฐ.</TCol>
              <TCol className="px-2">470.00</TCol>
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

      {/* Pop up */}
      {isShowPopUp && (
        <PopUpContainer>
          <Card
            className="bg-white w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-3"
            style={{ marginTop: window.scrollY + window.innerHeight / 7 }}
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">
                กำหนดรายละเอียดการชำระเงิน
              </div>
              <DefaultButton
                className="text-xl font-bold rounded-full"
                onClick={() => setIsShowPopUp(false)}
              >
                <FaWindowClose className="w-6 h-6" />
              </DefaultButton>
            </div>
            <hr className="border-b-4 border-sky-300" />
            <div className="flex flex-col gap-3 items-center my-3">
              <InputGroup className="w-full">
                <div className="flex">
                  <label htmlFor="semister">เทอม</label>
                  <div className="px-2">/</div>
                  <label htmlFor="academicYear">ปีการศึกษา</label>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <Select name="semister" optionTexts={[1, 2]} />
                  <div>/</div>
                  <Select name="academicYear" optionTexts={[2566, 2567]} />
                </div>
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="receiptType">ประเภทใบเสร็จ</label>
                <Select
                  name="receiptType"
                  optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
                />
              </InputGroup>
              <InputGroup className="w-full">
                <label htmlFor="studentType">ประเภทนักเรียน</label>
                <Select
                  name="studentType"
                  optionTexts={[
                    "ห้องเรียนชั้น ม.1,4",
                    "ห้องเรียนชั้น ม.2,3,5,6",
                  ]}
                />
              </InputGroup>
              <div className="border border-gray-300 w-full p-3 rounded">
                <div className="text-xl font-bold">
                  กำหนดรายละเอียดการชำระเงิน
                </div>
                <hr className="border-b-4 border-sky-300" />
                <DefaultButton
                  className="flex flex-row bg-teal-600 hover:bg-teal-500 text-white my-3"
                  onClick={handleClickAddItem}
                >
                  <FaPlusCircle className="w-6 h-6" />
                  <div className="font-bold  hidden sm:block">เพิ่ม</div>
                </DefaultButton>

                <div className="flex flex-col gap-1">
                  {/* Add detail */}
                  {detailItems.map((item, index) => (
                    <AddDetail
                      index={index}
                      detailItems={detailItems}
                      setDetailItmes={setDetailItmes}
                      key={index}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
                <DefaultButton className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                  บันทึก
                </DefaultButton>
                <DefaultButton
                  className="bg-red-600 hover:bg-red-500 text-white font-bold"
                  onClick={() => setIsShowPopUp(false)}
                >
                  ยกเลิก
                </DefaultButton>
              </div>
            </div>
          </Card>
        </PopUpContainer>
      )}
    </div>
  );
}
