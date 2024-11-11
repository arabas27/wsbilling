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
  FaSpinner,
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
import {
  Form,
  useActionData,
  useFetcher,
  useFetchers,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { numberWithCommas, removeCommas } from "../../components/API";
import { apiPath, receiptType, user } from "../config";
import OverlaySpinner from "../../components/OverlaySpinner";

/* pop up component */
const AddDetail = (props) => {
  const fetcherAddPaymetDetail = useFetcher({ key: "payment-detail" });

  const handleChange = (event) => {
    const target = event.target;
    props.setAddDetail((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <div className="flex flex-col gap-1 p-3 rounded bg-gray-100 w-full">
      <InputGroup className="w-full">
        <label className="text-sm" htmlFor="paymentList">
          รายการชำระ
        </label>
        <ControlledSelect
          name="paymentList"
          optionTexts={[...props.arrayPayments]}
          value={props.paymentList}
          onChange={handleChange}
        />
      </InputGroup>
      <div className="flex gap-3 w-full">
        <InputGroup className="w-full">
          <label className="text-sm" htmlFor="unit">
            จำนวน (หน่วย)
          </label>
          <ControlledNumberInput
            className="w-full"
            name="unit"
            value={props.unit}
            onClick={(event) => event.currentTarget.select()}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="w-full">
          <label className="text-sm" htmlFor="pricePerUnit">
            หน่วยละ (บาท)
          </label>
          <ControlledNumberInput
            className="w-full"
            name="pricePerUnit"
            value={props.pricePerUnit}
            onClick={(event) => event.currentTarget.select()}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <div className="flex justify-between">
        <DefaultButton
          className="flex flex-row bg-red-600 hover:bg-red-500 text-white mt-3"
          onClick={() => props.handleDelete(props)}
        >
          <FaTrashAlt className="w-6 h-6" />
          <div className="font-bold">ลบ</div>
        </DefaultButton>
        {(props.action === "update1" ||
          props.action === "create1" ||
          props.action === "create2") && (
          <DefaultButton
            className="flex flex-row gap-3 bg-teal-600 hover:bg-teal-500 text-white mt-3"
            onClick={props.handleAddItem}
          >
            {fetcherAddPaymetDetail.state !== "idle" && (
              <FaSpinner className="animate-spin" />
            )}
            <div className="flex gap-1 font-bold">
              <FaPlusCircle className="w-6 h-6" />
              เพิ่ม
            </div>
          </DefaultButton>
        )}
        {["update2"].includes(props.action) && (
          <div className="flex gap-3">
            <DefaultButton
              className="flex flex-row bg-yellow-600 hover:bg-yellow-500 text-white mt-3"
              onClick={() => props.handleUpdateItem(props)}
            >
              <div className="font-bold">บันทึก</div>
            </DefaultButton>
            <DefaultButton
              className="flex flex-row bg-red-600 hover:bg-red-500 text-white mt-3"
              onClick={() => props.handleCancelUpdate()}
            >
              <div className="font-bold">ยกเลิก</div>
            </DefaultButton>
          </div>
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
  };

  return (
    <TRow>
      <TCol className="text-center px-2">
        <input
          type="checkbox"
          name={`popupCheckbox#${props.id}`}
          onChange={handleChecked}
          value={props.id}
        />
      </TCol>
      <TCol className="text-start px-2">{props.paymentList}</TCol>
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
          onClick={() => props.handleGetItemUpdate(props)}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </DefaultButton>
      </TCol>
    </TRow>
  );
};

const Popup = (props) => {
  const submit = useSubmit();
  const fetchers = useFetchers();
  const fetcherLoadItemForUpdate = fetchers.filter(
    (element) => element.key === "load-items-update"
  )[0];
  const fetcherAddPaymetDetail = useFetcher({ key: "payment-detail" });
  const fetcherLoadItem = useFetcher({ key: "load-items" });
  //-----------------------------------------------------------------------------------------------
  // ทบทวนลบ
  //-----------------------------------------------------------------------------------------------
  const [values, setValues] = useState(props.values);
  const [paymentInfo, setPaymentInfo] = useState({
    semester: props.values.semester,
    academicYear: props.values.academicYear,
    receiptType: props.values.receiptType,
    studentType: props.values.studentType,
  });

  // ตัวเก็บข้อมูลเพื่อส่งต่อไปยัง items ด้วย handleAddItem function
  const [addDetail, setAddDetail] = useState({
    action: values.action,
    paymentList: props.arrayPayments[0],
    unit: "0",
    pricePerUnit: "0",
    id: -1,
  });
  // รวมมูลค่าแต่ละ field
  const [total, setTotal] = useState({
    unit: 0,
    pricePerUnit: 0,
    total: 0,
  });
  // update items เมื่อทำการเพิ่ม item ไปยัง database
  useEffect(() => {
    if (
      fetcherLoadItem.state === "idle" &&
      fetcherLoadItem.data &&
      values.action === "update1"
    ) {
      // ตรวจสอบข้อมูลอัพเดต
      if (
        fetcherLoadItem.data.data.filter((element, index) => {
          if (props.items[index]) {
            return (
              element.id != props.items[index].id ||
              element.payment_list != props.items[index].paymentList ||
              element.price_per_unit != props.items[index].pricePerUnit ||
              element.unit != props.items[index].unit
            );
          } else {
            return element;
          }
        }).length > 0
      ) {
        props.setItems(
          fetcherLoadItem.data.data.map((element) => ({
            id: element.id,
            paymentList: element.payment_list,
            unit: element.unit,
            pricePerUnit: element.price_per_unit,
          }))
        );
      }
    }
  }, [fetcherLoadItem, props.setItems, props.items]);

  // update items เมื่อกดปุ่มแก้ไข
  useEffect(() => {
    if (fetcherLoadItemForUpdate) {
      if (fetcherLoadItemForUpdate.state !== "idle") props.setIsLoading(true);
      if (fetcherLoadItemForUpdate.state === "idle") props.setIsLoading(false);
      if (
        fetcherLoadItemForUpdate.state === "idle" &&
        fetcherLoadItemForUpdate.data &&
        values.action === "create2"
      ) {
        // ปรับเป็นโหมดสร้าง
        setValues((prev) => ({ ...prev, action: "update1" }));
        if (
          fetcherLoadItemForUpdate.data.data.filter((element, index) => {
            if (props.items[index]) {
              return (
                element.id != props.items[index].id ||
                element.payment_list != props.items[index].paymentList ||
                element.price_per_unit != props.items[index].pricePerUnit ||
                element.unit != props.items[index].unit
              );
            } else {
              return element;
            }
          }).length > 0
        ) {
          props.setItems(
            fetcherLoadItemForUpdate.data.data.map((element) => ({
              id: element.id,
              paymentList: element.payment_list,
              unit: element.unit,
              pricePerUnit: element.price_per_unit,
            }))
          );
        }
      }
    }
  }, [fetcherLoadItemForUpdate]);

  // คำนวณ total
  useEffect(() => {
    setTotal({
      unit:
        props.items && props.items.length > 0
          ? parseFloat(
              props.items
                .map((element) => parseFloat(element.unit))
                .reduce((prev, curr) => prev + curr)
            ).toFixed(2)
          : 0,
      pricePerUnit:
        props.items && props.items.length > 0
          ? parseFloat(
              props.items
                .map((element) => parseFloat(element.pricePerUnit))
                .reduce((prev, curr) => prev + curr)
            ).toFixed(2)
          : 0,
      total:
        props.items && props.items.length > 0
          ? parseFloat(
              props.items
                .map(
                  (element) =>
                    parseFloat(element.pricePerUnit) * parseFloat(element.unit)
                )
                .reduce((prev, curr) => prev + curr)
            ).toFixed(2)
          : 0,
    });
  }, [props.items]);

  // unlock ขั้นที่ 1 ถ้าสำเร็จ
  useEffect(() => {
    if (
      fetcherAddPaymetDetail.state === "idle" &&
      fetcherAddPaymetDetail.data
    ) {
      if (
        fetcherAddPaymetDetail.data.status === 200 &&
        fetcherAddPaymetDetail.data.message === "step 1"
      ) {
        props.setPaymentID(fetcherAddPaymetDetail.data.paymentID);
        setValues((prev) => ({ ...prev, action: "update1" }));
      }
    }
  }, [fetcherAddPaymetDetail]);

  const handlePaymentInfoChange = (event) => {
    const target = event.target;
    setPaymentInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  // เพิ่มข้อมูลไปยังฐานข้อมูลทีละตัว
  const handleAddItem = async () => {
    const formData = new FormData();
    // ข้อมูล item
    formData.append("paymentList", addDetail.paymentList);
    formData.append("unit", addDetail.unit);
    formData.append("pricePerUnit", addDetail.pricePerUnit);
    formData.append(
      "total",
      (parseFloat(addDetail.pricePerUnit) * parseFloat(addDetail.unit)).toFixed(
        2
      )
    );
    formData.append("id", props.paymentID);
    // อื่น ๆ
    formData.append("creator", user);
    formData.append("action", "addItem");

    fetcherAddPaymetDetail.submit(formData, {
      method: "POST",
    });
    // ล้างค่า
    setAddDetail({
      action: "create1",
      paymentList: props.arrayPayments[0],
      unit: "0",
      pricePerUnit: "0",
    });

    fetcherLoadItem.load(
      `/setting/payment-detail?action=load-item&id=${props.paymentID}`
    );
  };

  // ลบรายการ
  const handleDelete = (props) => {
    // กล่อง check all ใน pop up
    const popupCheckAll = document.querySelector('[name="popupCheckAll"]');
    // กล่อง checkbox ใน pop up
    const allCheckbox = document.querySelectorAll('[name^="popupCheckbox#"]');
    // ให้กล่อง checkbox ทั้งหมดแสดงผลเป็นว่างเปล่า
    const array_selectedID = [];
    allCheckbox.forEach((element) => {
      if (element.checked) array_selectedID.push(element.value);
    });

    if (array_selectedID.length === 0) {
      alert("ยังไม่ได้เลือกรายการที่ต้องการลบ");
      return;
    }

    const cf = confirm("ยืนยันการลบรายการที่เลือก");
    if (!cf) return;

    const formData = new FormData();
    formData.append("action", "deleteItems");
    formData.append("creator", user);
    formData.append("paymentID", props.paymentID);
    formData.append("id", JSON.stringify(array_selectedID));

    submit(formData, {
      method: "POST",
    });

    // กล่อง check all แสดงผลว่างเปล่า
    popupCheckAll.checked = false;
    // reload fetcherLoadItem
    fetcherLoadItem.load(
      `/payment-detail?action=load-item&id=${props.paymentID}`
    );
  };

  // check all checkbox
  const handleCheckAll = () => {
    // กล่อง check all ใน pop up
    const popupCheckAll = document.querySelector('[name="popupCheckAll"]');
    // กล่อง check all ใน pop up
    const allPopupCheckbox = document.querySelectorAll(
      '[name^="popupCheckbox#"]'
    );

    allPopupCheckbox.forEach(
      (element) => (element.checked = popupCheckAll.checked)
    );
  };

  // บันทึกข้อมูลขั้นที่ 1
  const handleSubmitFirstStep = () => {
    const formData = new FormData();
    // payment information
    formData.append("id", values.id);
    formData.append("semester", paymentInfo.semester);

    formData.append("academicYear", paymentInfo.academicYear);
    formData.append("receiptType", paymentInfo.receiptType);
    formData.append("studentType", paymentInfo.studentType);
    // items
    formData.append("creator", user);
    formData.append("action", "createStepOne");

    fetcherAddPaymetDetail.submit(formData, {
      method: "POST",
    });

    props.setItems([]);
  };

  const handleSubmitSecondStep = () => {
    const formData = new FormData();

    // payment information
    formData.append("id", props.paymentID);
    formData.append("semester", paymentInfo.semester);

    formData.append("academicYear", paymentInfo.academicYear);
    formData.append("receiptType", paymentInfo.receiptType);
    formData.append("studentType", paymentInfo.studentType);
    // items
    formData.append("creator", user);
    formData.append("action", "updateStepOne");

    submit(formData, {
      method: "POST",
    });

    props.setIsShowPopUp(false);
  };

  // หยิบข้อมูลใน pop up item ไปอัพเดต
  const handleGetItemUpdate = (props) => {
    setAddDetail({
      action: "update2",
      paymentList: props.paymentList,
      unit: props.unit,
      pricePerUnit: props.pricePerUnit,
      id: props.id,
    });
  };

  // อัพเดตข้อมูล item ใน database
  const handleUpdateItem = (props) => {
    const formData = new FormData();

    // ข้อมูล item
    formData.append("itemID", props.id);
    formData.append("paymentList", props.paymentList);
    formData.append("unit", props.unit);
    formData.append("pricePerUnit", props.pricePerUnit);
    formData.append(
      "itemTotal",
      (parseFloat(props.pricePerUnit) * parseFloat(props.unit)).toFixed(2)
    );

    // ข้อมูลใบเสร็จ
    formData.append("paymentID", props.paymentID);
    formData.append("semester", paymentInfo.semester);
    formData.append("academicYear", paymentInfo.academicYear);
    formData.append("receiptType", paymentInfo.receiptType);
    formData.append("studentType", paymentInfo.studentType);

    // ข้อมูลอื่น ๆ
    formData.append("creator", user);
    formData.append("action", "updateItem");

    submit(formData, {
      method: "POST",
    });

    // ล้างค่า
    setAddDetail({
      action: "create1",
      paymentList: props.arrayPayments[0],
      unit: "0",
      pricePerUnit: "0",
    });

    fetcherLoadItem.load(
      `/payment-detail?action=load-item&id=${props.paymentID}`
    );
  };

  // ยกเลิกการอัพเดต
  const handleCancelUpdate = () => {
    setAddDetail({
      action: "create2",
      paymentList: props.arrayPayments[0],
      unit: "0",
      pricePerUnit: "0",
      id: -1,
    });
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
          {values.action === "create1" && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
              <DefaultButton
                className="flex gap-3 bg-teal-600 hover:bg-teal-500 text-white font-bold"
                onClick={handleSubmitFirstStep}
              >
                {fetcherAddPaymetDetail.state !== "idle" && (
                  <FaSpinner className="animate-spin" />
                )}
                บันทึก
              </DefaultButton>
              <DefaultButton
                className="bg-red-600 hover:bg-red-500 text-white font-bold"
                onClick={() => {
                  props.setIsShowPopUp(false);
                  props.setItems([]);
                }}
              >
                ยกเลิก
              </DefaultButton>
            </div>
          )}
          {/* เพิ่มรายละเอียด */}
          {["create2", "update1", "update2"].includes(values.action) && (
            <>
              <div className="border border-gray-300 w-full p-3 rounded mt-6">
                <div className="text-xl font-bold">
                  กำหนดรายละเอียดการชำระเงิน
                </div>
                <hr className="border-b-4 border-sky-300" />

                <div className="flex flex-col gap-1">
                  {/* แบบฟอร์ม Add detail */}
                  <AddDetail
                    {...{
                      ...addDetail,
                      setAddDetail,
                      paymentID: props.paymentID,
                      handleAddItem,
                      handleUpdateItem,
                      handleDelete,
                      handleCancelUpdate,
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
                          <THeadCol className="min-w-56">
                            ชื่อรายการชำระ
                          </THeadCol>
                          <THeadCol>จำนวน</THeadCol>
                          <THeadCol>หน่วยละ</THeadCol>
                          <THeadCol>จำนวนเงิน</THeadCol>
                          <THeadCol>แก้ไข</THeadCol>
                        </THeadRow>
                      </THead>
                      <tbody>
                        {props.items &&
                          fetcherLoadItem.state === "idle" &&
                          props.items.length === 0 && (
                            <tr>
                              <td className="text-center py-3" colSpan={6}>
                                - ไม่พบรายการ -
                              </td>
                            </tr>
                          )}
                        {props.items && fetcherLoadItem.state !== "idle" && (
                          <tr>
                            <td className="text-center py-3" colSpan={6}>
                              - กำลังโหลดรายการ -
                            </td>
                          </tr>
                        )}
                        {props.items &&
                          fetcherLoadItem.state === "idle" &&
                          props.items.map((element, index) => (
                            <PopupRow
                              {...{
                                ...element,
                                handleGetItemUpdate,
                              }}
                              key={index}
                            />
                          ))}
                        {props.items &&
                          fetcherLoadItem.state === "idle" &&
                          total &&
                          props.items.length > 0 && (
                            <TRow>
                              <TCol
                                className="text-center font-bold px-2"
                                colSpan={2}
                              >
                                รวม
                              </TCol>
                              <TCol className="text-end px-2">
                                {numberWithCommas(total.unit)}
                              </TCol>
                              <TCol className="text-end px-2">
                                {numberWithCommas(total.pricePerUnit)}
                              </TCol>
                              <TCol className="text-end px-2">
                                {numberWithCommas(total.total)}
                              </TCol>
                              <TCol></TCol>
                            </TRow>
                          )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              {/* ปุ่ม */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 self-end">
                <DefaultButton
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
                  onClick={handleSubmitSecondStep}
                >
                  บันทึก
                </DefaultButton>
                <DefaultButton
                  className="bg-red-600 hover:bg-red-500 text-white font-bold"
                  onClick={() => {
                    props.setItems([]);
                    props.setIsShowPopUp(false);
                  }}
                >
                  ยกเลิก
                </DefaultButton>
              </div>
            </>
          )}
        </div>
      </Card>
    </PopupContainer>
  );
};

const Row = (props) => {
  const submit = useSubmit();
  // ลบรายการ
  const handleDeleteById = (id) => {
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", id);

    submit(formData, {
      method: "POST",
    });
  };

  const handleChecked = () => {
    const checkAllCheckbox = document.querySelector('[name="checkAll"]');
    const thisCheckbox = document.querySelectorAll('[name^="checkbox#"]');

    if (checkAllCheckbox.checked) {
      !thisCheckbox.checked && (checkAllCheckbox.checked = false);
    }
  };

  return (
    <TRow className="text-center">
      <TCol className="px-2">
        <input
          type="checkbox"
          name={`checkbox#${props.index}`}
          value={props.id}
          onChange={handleChecked}
        />
      </TCol>
      <TCol className="px-2">{props.index + 1}</TCol>
      <TCol className="px-2">{props.semester}</TCol>
      <TCol className="px-2">{props.academic_year}</TCol>
      <TCol className="text-start font-bold px-2">{props.student_type}</TCol>
      <TCol className="px-2">{props.receipt_type}</TCol>
      <TCol className="px-2 text-end">
        {numberWithCommas(parseFloat(props.payment).toFixed(2))}
      </TCol>
      <TCol className="px-2">
        <DefaultButton
          className="flex items-center justify-center mx-auto"
          onClick={() => props.handleGetItemById(props)}
        >
          <FaEdit className="w-5 h-5 text-yellow-600" />
        </DefaultButton>
      </TCol>
      <TCol className="px-2">
        <DefaultButton
          className="flex items-center justify-center mx-auto"
          onClick={() => handleDeleteById(props.id)}
        >
          <FaTrashAlt className="w-5 h-5 text-red-600" />
        </DefaultButton>
      </TCol>
    </TRow>
  );
};

export default function ReportTotalReceipt() {
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
            <div>จำนวน รายการ</div>
          </div>
          {/* filter */}
          <Form
            className="flex flex-col gap-2 my-3 w-10/12 mx-auto"
            role="search"
          >
            <InputGroup className="flex-row gap-3">
              <label className="flex flex-col w-full">
                เทอม
                <Select name="semester" optionTexts={["1", "2"]} />
              </label>
              <label className="flex flex-col w-full">
                ปีการศึกษา
                <Select name="semester" optionTexts={["2567", "2"]} />
              </label>
            </InputGroup>
            <InputGroup className="flex-row gap-3">
              <label className="flex flex-col w-full">
                ประเภทใบเสร็จ
                <Select name="receiptType" optionTexts={[receiptType[0]]} />
              </label>
            </InputGroup>
            <InputGroup className="flex-row gap-3">
              <label className="flex flex-col w-full">
                เล่มที่
                <Select
                  name="bookNumber"
                  optionTexts={["ทั้งหมด", "17668"]}
                  optionValues={["", "17688"]}
                />
              </label>
            </InputGroup>
            <InputGroup className="flex-row gap-3">
              <label className="flex flex-col w-full">
                ช่วงเลขที่ใบเสร็จ
                <Select
                  name="bookNumber"
                  optionTexts={["ทั้งหมด", "17668"]}
                  optionValues={["", "17688"]}
                />
              </label>
            </InputGroup>
          </Form>
        </Card>
      </div>

      {/* ปุ่มรายการ */}
      <div className="flex gap-1 mt-10 mb-3">
        <DefaultButton
          className="flex flex-row bg-teal-600 hover:bg-teal-500 text-white"
          onClick={() => handleTogglePopup("add")}
        >
          <FaPlusCircle className="w-6 h-6" />
          <div className="font-bold  hidden sm:block">เพิ่ม</div>
        </DefaultButton>
        <DefaultButton
          className="flex flex-row bg-red-600 hover:bg-red-500 text-white"
          /*  onClick={handleDeletePaymentDetailByGroup} */
        >
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
                <input
                  type="checkbox"
                  name="checkAll"
                  id="checkAll"
                  /*    onChange={handleCheckAll} */
                />
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
            {/*  {!payment_detail ||
              (payment_detail.length === 0 && (
                <tr>
                  <td className="text-center p-3" colSpan={9}>
                    - ไม่พบรายการ -
                  </td>
                </tr>
              ))}
            {payment_detail &&
              payment_detail.length > 0 &&
              payment_detail.map((props, index) => (
                <Row
                  {...props}
                  {...{ index: index, handleGetItemById }}
                  key={index}
                />
              ))} */}
          </tbody>
        </Table>
      </div>

      {/* Pop up */}
      {/* {isShowPopUp && <Popup {...popupProps} />} */}

      {/* show loading */}
      {/*  {isLoading && <OverlaySpinner />} */}
    </div>
  );
}
