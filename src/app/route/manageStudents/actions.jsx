import { apiPath } from "../../config";

// level
export async function levelAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  //   for (var p of formData.entries()) {
  //     console.log(p);
  //   }

  if (action === "create") {
    // สร้างใบเสร็จ
    try {
      return await fetch(`${apiPath}/create/create-level.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      return await fetch(`${apiPath}/delete/delete-level-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
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
      return await fetch(`${apiPath}/update/update-level-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}

// student type
export async function studentTypeAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  //   for (var p of formData.entries()) {
  //     console.log(p);
  //   }

  if (action === "create") {
    // สร้างใบเสร็จ
    try {
      return await fetch(`${apiPath}/create/create-student-type.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      return await fetch(`${apiPath}/delete/delete-student-type-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
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
      return await fetch(`${apiPath}/update/update-student-type-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}

// classroom
export async function classroomAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  //   for (var p of formData.entries()) {
  //     console.log(p);
  //   }

  if (action === "create") {
    // สร้างใบเสร็จ
    try {
      await fetch(`${apiPath}/create/create-classroom.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      return await fetch(`${apiPath}/delete/delete-classroom-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "update") {
    // แก้ไข;
    // for (var p of formData.entries()) {
    //   console.log(p);
    // }
    try {
      const r = await fetch(`${apiPath}/update/update-classroom-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}

export async function uploadStudentAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  //   for (var p of formData.entries()) {
  //     console.log(p);
  //   }

  if (action === "upload") {
    // สร้างใบเสร็จ
    try {
      const r = await fetch(`${apiPath}/create/create-students.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
      return r;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
  // else if (action === "delete") {
  //   // ลบ
  //   try {
  //     return await fetch(`${apiPath}/delete/delete-classroom-by-id.php`, {
  //       method: "post",
  //       body: formData,
  //     })
  //       .then((data) => data.json())
  //       .catch((error) => console.log(error));
  //   } catch (error) {
  //     console.log(error);
  //     return { status: 400, message: `Bad request: ${error}` };
  //   }
  // } else if (action === "update") {
  //   // แก้ไข
  //   // for (var p of formData.entries()) {
  //   //   console.log(p);
  //   // }
  //   try {
  //     return await fetch(`${apiPath}/update/update-classroom-by-id.php`, {
  //       method: "post",
  //       body: formData,
  //     })
  //       .then((data) => data.json())
  //       .catch((error) => console.log(error));
  //   } catch (error) {
  //     console.log(error);
  //     return { status: 400, message: `Bad request: ${error}` };
  //   }
  // }
}

// student
export async function studentAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  //   for (var p of formData.entries()) {
  //     console.log(p);
  //   }

  if (action === "create") {
    // สร้างใบเสร็จ
    try {
      await fetch(`${apiPath}/create/create-student.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));

      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete") {
    // ลบ
    try {
      return await fetch(`${apiPath}/delete/delete-student-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "delete-group") {
    // ลบ
    try {
      return await fetch(`${apiPath}/delete/delete-student-by-selected.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "update") {
    // แก้ไข;
    // for (var p of formData.entries()) {
    //   console.log(p);
    // }
    try {
      const r = await fetch(`${apiPath}/update/update-student-by-id.php`, {
        method: "post",
        body: formData,
      })
        .then((data) => data.json())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "update-status") {
    // แก้ไข;
    // for (var p of formData.entries()) {
    //   console.log(p);
    // }
    try {
      const r = await fetch(
        `${apiPath}/update/update-student-status-by-id.php`,
        {
          method: "post",
          body: formData,
        }
      )
        .then((data) => data.json())
        .catch((error) => console.log(error));
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  } else if (action === "toggle-status-group") {
    // แก้ไข;
    // for (var p of formData.entries()) {
    //   console.log(p);
    // }
    try {
      const r = await fetch(
        `${apiPath}/update/update-student-status-by-selected.php`,
        {
          method: "post",
          body: formData,
        }
      )
        .then((data) => data.text())
        .catch((error) => console.log(error));
      console.log(r);
      return null;
    } catch (error) {
      console.log(error);
      return { status: 400, message: `Bad request: ${error}` };
    }
  }
}
