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
import { useEffect, useState } from "react";
import { PopupContainer } from "../../components/popup";
import { useLoaderData } from "react-router-dom";
import { numberWithCommas, removeCommas } from "../../components/API";

/* pop up component */
const AddDetail = (props) => {
  const handleChange = (event) => {
    const target = event.target;
    props.setAddDetail((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <div className="flex flex-col gap-1 p-3 rounded bg-gray-100 w-full">
      <InputGroup className="w-full">
        <label className="text-sm" htmlFor={"payments"}>
          รายการชำระ
        </label>
        <ControlledSelect
          name={"payments"}
          optionTexts={[...props.arrayPayments]}
          value={props.payments}
          onChange={handleChange}
        />
      </InputGroup>
      <div className="flex gap-3 w-full">
        <InputGroup className="w-full">
          <label className="text-sm" htmlFor={"unit"}>
            จำนวน (หน่วย)
          </label>
          <ControlledNumberInput
            className="w-full"
            name={"unit"}
            value={props.unit}
            onClick={(event) => event.currentTarget.select()}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="w-full">
          <label className="text-sm" htmlFor={"pricePerUnit"}>
            หน่วยละ (บาท)
          </label>
          <ControlledNumberInput
            className="w-full"
            name={"pricePerUnit"}
            value={props.pricePerUnit}
            onClick={(event) => event.currentTarget.select()}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <div className="flex justify-between">
        <DefaultButton
          className="flex flex-row bg-red-600 hover:bg-red-500 text-white mt-3"
          onClick={props.handleDelete}
        >
          <FaTrashAlt className="w-6 h-6" />
          <div className="font-bold">ลบ</div>
        </DefaultButton>
        {props.action === "create" && (
          <DefaultButton
            className="flex flex-row bg-teal-600 hover:bg-teal-500 text-white mt-3"
            onClick={props.handleAddItem}
          >
            <FaPlusCircle className="w-6 h-6" />
            <div className="font-bold">เพิ่ม</div>
          </DefaultButton>
        )}
        {props.action === "update" && (
          <DefaultButton
            className="flex flex-row bg-yellow-600 hover:bg-yellow-500 text-white mt-3"
            onClick={() => props.handleEditItem(props)}
          >
            <FaEdit className="w-6 h-6" />
            <div className="font-bold">แก้ไข</div>
          </DefaultButton>
        )}
      </div>
    </div>
  );
};

/* pop up component */
const PopupRow = (props) => {
  // ปรับ popupCheckAll เป็น false ถ้า checkbox ไม่ได้ checked ทั้งหมด
  const handleChecked = (event) => {
    const popupCheckAll = document.querySelector('[name="popupCheckAll"]');
    if (popupCheckAll.checked) {
      if (!event.target.checked) {
        popupCheckAll.checked = false;
      }
    }

    // เก็บค่า id ของ item ที่เลือก
    if (event.target.checked) {
      props.setSelectedId((prev) => [...prev, props.id]);
    } else {
      props.setSelectedId(props.selectedId.filter((id) => id !== props.id));
    }
  };

  return (
    <TRow>
      <TCol className="text-center px-2">
        <input
          type="checkbox"
          name={`popupCheckbox#${props.id}`}
          onChange={handleChecked}
        />
      </TCol>
      <TCol className="text-start px-2">
        {numberWithCommas(props.payments)}
      </TCol>
      <TCol className="text-end px-2">
        {numberWithCommas(parseFloat(props.unit).toFixed(2))}
      </TCol>
      <TCol className="text-end px-2">
        {numberWithCommas(parseFloat(props.pricePerUnit).toFixed(2))}
      </TCol>
      <TCol className="text-end px-2">
        {numberWithCommas(
          (
            parseFloat(props.pricePerUnit).toFixed(2) *
            parseFloat(props.unit).toFixed(2)
          ).toFixed(2)
        )}
      </TCol>
      <TCol>
        <DefaultButton
          className="mx-auto"
          onClick={() => props.handleToEdit(props)}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </DefaultButton>
      </TCol>
    </TRow>
  );
};

const Popup = (props) => {
  const [paymentInfo, setPaymentInfo] = useState({
    semester: 1,
    academicYear:
      props.arrayAcademicYear.length > 0 ? props.arrayAcademicYear[0] : [],
    receiptType: "ใบเสร็จรับเงิน สพฐ.",
    studentType:
      props.arrayStudentType.length > 0 ? props.arrayStudentType[0] : [],
  });
  // ตัวเก็บข้อมูลสำหรับบันทึกใน database
  const [items, setItems] = useState([]);
  // ไว้อ้างอิงตอนแก้ไข
  const [counter, setCounter] = useState(1);
  // ตัวเก็บข้อมูลเพื่อส่งต่อไปยัง items ด้วย handleAddItem function
  const [addDetail, setAddDetail] = useState({
    action: "create",
    id: counter,
    payments: props.arrayPayments[0],
    unit: "0",
    pricePerUnit: "0",
  });
  // เก็บค่า id ที่ต้องการลบเป็น array
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    // ล้างค่า addDetail และเพิ่ม id
    setAddDetail({
      action: "create",
      id: counter,
      payments: props.arrayPayments[0],
      unit: "0",
      pricePerUnit: "0",
    });
  }, [counter]);

  const handlePaymentInfoChange = (event) => {
    const target = event.target;
    setPaymentInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  // เพื่อข้อมูลจาก addDetail ไปยัง items
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: addDetail.id,
        payments: addDetail.payments,
        unit: addDetail.unit,
        pricePerUnit: addDetail.pricePerUnit,
      },
    ]);

    setCounter(counter + 1);
  };

  // รับ trigger มาจาก PopupRow
  // ปรับ AddItem เป็นโหมด update
  const handleToEdit = (props) => {
    setAddDetail({
      action: "update",
      id: props.id,
      payments: props.payments,
      unit: props.unit,
      pricePerUnit: props.pricePerUnit,
    });
  };

  const handleEditItem = (props) => {
    setItems(
      items.map((element) => {
        if (element.id === props.id) {
          return {
            id: element.id,
            payments: addDetail.payments,
            unit: addDetail.unit,
            pricePerUnit: addDetail.pricePerUnit,
          };
        } else {
          return element;
        }
      })
    );

    setAddDetail({
      action: "create",
      id: counter,
      payments: props.arrayPayments[0],
      unit: "0",
      pricePerUnit: "0",
    });
  };

  // ลบรายการ
  const handleDelete = () => {
    const allCheckbox = document.querySelectorAll('[name^="popupCheckbox#"]');
    setItems(items.filter((element) => !selectedId.includes(element.id)));
    allCheckbox.forEach((element) => (element.checked = false));
    setSelectedId([]);
  };

  // check all checkbox
  const handleCheckAll = (event) => {
    const allPopupCheckbox = document.querySelectorAll(
      '[name^="popupCheckbox#"]'
    );

    allPopupCheckbox.forEach((element) => {
      element.checked = event.target.checked;
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("action", "create");
  };

  return (
    <PopupContainer>
      <Card
        className="bg-white w-full lg:w-9/12 xl:w-7/12 p-3"
        style={{ marginTop: window.scrollY + window.innerHeight / 20 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">กำหนดรายละเอียดการชำระเงิน</div>
          <DefaultButton
            className="text-xl font-bold rounded-full"
            onClick={() => props.setIsShowPopUp(false)}
          >
            <FaWindowClose className="w-6 h-6" />
          </DefaultButton>
        </div>
        <hr className="border-b-4 border-sky-300" />
        <div className="flex flex-col gap-3 items-center my-3 xl:w-11/12 mx-auto">
          <InputGroup className="w-full">
            <div className="flex">
              <label htmlFor="semester">เทอม</label>
              <div className="px-2">/</div>
              <label htmlFor="academicYear">ปีการศึกษา</label>
            </div>
            <div className="flex items-center gap-3 w-full">
              <Select
                className="w-full"
                name="semester"
                optionTexts={[1, 2]}
                value={paymentInfo.semester}
                onChange={handlePaymentInfoChange}
              />
              <div>/</div>
              <Select
                className="w-full"
                name="academicYear"
                optionTexts={[...props.arrayAcademicYear]}
                value={paymentInfo.academicYear}
                onChange={handlePaymentInfoChange}
              />
            </div>
          </InputGroup>
          <InputGroup className="w-full">
            <label htmlFor="receiptType">ประเภทใบเสร็จ</label>
            <Select
              name="receiptType"
              optionTexts={["ใบเสร็จรับเงิน สพฐ."]}
              value={paymentInfo.receiptType}
              onChange={handlePaymentInfoChange}
            />
          </InputGroup>
          <InputGroup className="w-full">
            <label htmlFor="studentType">ประเภทนักเรียน</label>
            <Select
              name="studentType"
              optionTexts={[...props.arrayStudentType]}
              value={paymentInfo.studentType}
              onChange={handlePaymentInfoChange}
            />
          </InputGroup>
          <div className="border border-gray-300 w-full p-3 rounded mt-6">
            <div className="text-xl font-bold">กำหนดรายละเอียดการชำระเงิน</div>
            <hr className="border-b-4 border-sky-300" />

            <div className="flex flex-col gap-1">
              {/* แบบฟอร์ม Add detail */}
              <AddDetail
                {...{
                  ...addDetail,
                  setAddDetail,
                  handleAddItem,
                  handleEditItem,
                  handleDelete,
                  arrayPayments: props.arrayPayments,
                }}
              />
              {/* ตารางแสดงข้อมูล */}
              <div className="overflow-auto">
                <Table>
                  <THead>
                    <THeadRow>
                      <THeadCol>
                        <input
                          type="checkbox"
                          name="popupCheckAll"
                          onChange={handleCheckAll}
                        />
                      </THeadCol>
                      <THeadCol className="min-w-56">ชื่อรายการชำระ</THeadCol>
                      <THeadCol>จำนวน</THeadCol>
                      <THeadCol>หน่วยละ</THeadCol>
                      <THeadCol>จำนวนเงิน</THeadCol>
                      <THeadCol>แก้ไช</THeadCol>
                    </THeadRow>
                  </THead>
                  <tbody>
                    {items.length === 0 && (
                      <tr>
                        <td className="text-center py-3" colSpan={6}>
                          - ไม่พบรายการ -
                        </td>
                      </tr>
                    )}
                    {items &&
                      items.map((element, index) => (
                        <PopupRow
                          {...{
                            ...element,
                            handleToEdit,
                            selectedId,
                            setSelectedId,
                          }}
                          key={index}
                        />
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
            <DefaultButton
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
              onClick={handleSubmit}
            >
              บันทึก
            </DefaultButton>
            <DefaultButton
              className="bg-red-600 hover:bg-red-500 text-white font-bold"
              onClick={() => props.setIsShowPopUp(false)}
            >
              ยกเลิก
            </DefaultButton>
          </div>
        </div>
      </Card>
    </PopupContainer>
  );
};

const Row = (props) => {
  return (
    <TRow className="text-center">
      <TCol className="px-2">
        <input type="checkbox" name="check1" id="check1" />
      </TCol>
      <TCol className="px-2">{props.index + 1}</TCol>
      <TCol className="px-2">2</TCol>
      <TCol className="px-2">2567</TCol>
      <TCol className="text-start font-bold px-2">ห้องเรียนชั้น ม.2,3,5,6</TCol>
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
  );
};

export default function PaymentDetail() {
  const { payment_detail, student_type, academic_year, payments } =
    useLoaderData();
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  const arrayStudentType =
    student_type && student_type.length > 0
      ? Array.from(student_type.map((element) => element.student_type))
      : [];

  const arrayAcademicYear =
    academic_year && academic_year.length > 0
      ? Array.from(academic_year.map((element) => element.academic_year))
      : [];

  const arrayPayments =
    payments && payments.length > 0
      ? Array.from(payments.map((element) => element.payment_list))
      : [];

  const popupProps = {
    arrayStudentType,
    arrayAcademicYear,
    arrayPayments,
    setIsShowPopUp,
  };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col items-center gap-6 md:mx-16 py-6">
        {/* Title */}
        <div className="flex justify-center w-full md:w-9/12 lg:w-6/12">
          <div className="text-xl md:text-2xl font-bold bg-sky-600 text-white w-fit rounded p-3 my-6">
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
                <Select
                  className="w-full"
                  name="searchSemister"
                  optionTexts={["ทั้งหมด", 1, 2]}
                  optionValues={["", 1, 2]}
                />
                <div>/</div>
                <Select
                  className="w-full"
                  name="seachAcademicYear"
                  optionTexts={["ทั้งหมด", ...arrayAcademicYear]}
                  optionValues={["", ...arrayAcademicYear]}
                />
              </div>
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchReceiptType">ประเภทใบเสร็จ</label>
              <Select
                name="searchReceiptType"
                optionTexts={["ทั้งหมด", "ใบเสร็จรับเงิน สพฐ."]}
                optionValues={["0", "ใบเสร็จรับเงิน สพฐ."]}
                defaultValue="ใบเสร็จรับเงิน สพฐ."
              />
            </InputGroup>
            <InputGroup className="w-10/12">
              <label htmlFor="searchStudentType">ประเภทนักเรียน</label>
              <Select
                name="searchStudentType"
                optionTexts={["ทั้งหมด", ...arrayStudentType]}
                optionValues={["", ...arrayStudentType]}
              />
            </InputGroup>
            {/* <InputGroup className="w-10/12">
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
            </InputGroup> */}
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
            {payment_detail.map((props, index) => (
              <Row {...props} index key={index} />
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {isShowPopUp && <Popup {...popupProps} />}
    </div>
  );
}
