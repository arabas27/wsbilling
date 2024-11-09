import { apiPath } from "../../config";

// academic year
export async function academicYearAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "create") {
    // สร้าง
    try {
      await fetch(`${apiPath}/create/create-academicyear.php`, {
        method: "post",
        body: formData,
      }).then((data) => data.text());

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "toggleStatus") {
    // ปรับสถานะ
    try {
      await fetch(`${apiPath}/update/update-academicyear-status-by-id.php`, {
        method: "post",
        body: formData,
      }).then((data) => data.text());

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      await fetch(`${apiPath}/delete/delete-academicyear-by-id.php`, {
        method: "post",
        body: formData,
      }).then((data) => data.text());

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "update") {
    // แก้ไข
    try {
      await fetch(`${apiPath}/update/update-academicyear-by-id.php`, {
        method: "post",
        body: formData,
      }).then((data) => data.text());

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}

// reciept
export async function receiptAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  // for (var p of formData.entries()) {
  //   console.log(p);
  // }

  if (action === "create") {
    // สร้างใบเสร็จ
    try {
      await fetch(`${apiPath}/create/create-receipt.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "toggleStatus") {
    // ปรับสถานะใบเสร็จ
    try {
      await fetch(`${apiPath}/update/update-receipt-status-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบใบเสร็จ
    try {
      await fetch(`${apiPath}/delete/delete-receipt-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "update") {
    // แก้ไขใบเสร็จ;
    try {
      await fetch(`${apiPath}/update/update-receipt-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "toggleSelectedStatus") {
    // แก้ใบเสร็จที่เลือก
    try {
      await fetch(
        `${apiPath}/update/update-selected-receipt-status-by-id.php`,
        {
          method: "post",
          body: formData,
        }
      )
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "deleteSelected") {
    // แก้ใบเสร็จที่เลือก
    try {
      await fetch(`${apiPath}/delete/delete-selected-receipt-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}

// reciept
export async function paymentsAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  // for (var p of formData.entries()) {
  //   console.log(p);
  // }

  if (action === "create") {
    // สร้างใบเสร็จ
    try {
      await fetch(`${apiPath}/create/create-payments.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      await fetch(`${apiPath}/delete/delete-payment-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "update") {
    // แก้ไข
    // for (var p of formData.entries()) {
    //   console.log(p);
    // }

    try {
      const r = await fetch(`${apiPath}/update/update-payment-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}

// reciept
export async function paymentDetailAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  // for (var p of formData.entries()) {
  //   console.log(p);
  // }
  if (action === "createStepOne") {
    // สร้างขั้นที่ 1
    try {
      return await fetch(`${apiPath}/create/create-payment-detail.php`, {
        body: formData,
        method: "POST",
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "updateStepOne") {
    // สร้างขั้นที่ 1
    try {
      await fetch(`${apiPath}/update/update-payment-detail-by-id.php`, {
        body: formData,
        method: "POST",
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "addItem") {
    // สร้างขั้นที่ 1
    try {
      const response = await fetch(
        `${apiPath}/create/create-payment-detail-item.php`,
        {
          body: formData,
          method: "POST",
        }
      )
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return response;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      await fetch(`${apiPath}/delete/delete-payment-detail-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "deletePaymentDetailGroup") {
    // ลบ
    try {
      await fetch(`${apiPath}/delete/delete-payment-detail-by-group.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "deleteItems") {
    // ลบรายละเอียด
    try {
      await fetch(`${apiPath}/delete/delete-payment-detail-item-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "updateItem") {
    // แก้ไข
    // for (var p of formData.entries()) {
    //   console.log(p);
    // }
    try {
      await fetch(`${apiPath}/update/update-payment-detail-item-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.text())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}
