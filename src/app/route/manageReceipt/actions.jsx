import { apiPath } from "../../config";

// reciever
export async function manageReceiptAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  // for (var p of formData.entries()) {
  //   console.log(p);
  // }
  if (action === "create-record") {
    // สร้างขั้นที่ 1
    try {
      const response = await fetch(
        `${apiPath}/create/create-payment-record.php`,
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
  }
  //   else if (action === "update") {
  //     // ลบ
  //     try {
  //       const r = await fetch(`${apiPath}/update/update-receiver-by-id.php`, {
  //         method: "post",
  //         body: formData,
  //       })
  //         .then((data) => data.text())
  //         .catch((error) => console.log(error));
  //       console.log(r);
  //       return null;
  //     } catch (error) {
  //       console.log(error);
  //       return { status: 400, message: `Bad request: ${error}` };
  //     }
  //   } else if (action === "delete") {
  //     // ลบ
  //     try {
  //       const r = await fetch(`${apiPath}/delete/delete-receiver-by-id.php`, {
  //         method: "post",
  //         body: formData,
  //       })
  //         .then((data) => data.text())
  //         .catch((error) => console.log(error));
  //       console.log(r);
  //       return null;
  //     } catch (error) {
  //       console.log(error);
  //       return { status: 400, message: `Bad request: ${error}` };
  //     }
  //   }
}
