import { apiPath } from "../../config";

// academic year
export async function academicYearLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const response = await fetch(
    `${apiPath}/read/read-academicyear-by-q.php?q=${q}`
  ).then((data) => data.json());

  if (response.status === 200 || response.status === 404) {
    return { ...response, q };
  } else {
    return null;
  }
}

// receipt type
export async function receiptTypeLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const response = await fetch(
    `${apiPath}/read/read-receipt-type-by-q.php?q=${q}`
  ).then((data) => data.json());

  if (response.status === 200 || response.status === 404) {
    return { ...response, q };
  } else {
    return null;
  }
}

// receipt
export async function receiptLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const response = await fetch(`${apiPath}/read/read-receipt-by-q.php?q=${q}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { ...response, q };
  } else {
    return null;
  }
}

// payments
export async function paymentsLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const response = await fetch(`${apiPath}/read/read-payments-by-q.php?q=${q}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { ...response, q };
  } else {
    return null;
  }
}

// payment detail
export async function paymentDetailLoader({ request }) {
  const url = new URL(request.url);
  // semester
  const s = url.searchParams.get("s") || "";
  // academic year
  const ay = url.searchParams.get("ay") || "";
  // receipt type
  const rt = url.searchParams.get("rt") || "";
  // student type
  const st = url.searchParams.get("st") || "";
  const action = url.searchParams.get("action") || "";
  const id = url.searchParams.get("id") || "";

  if (action === "load-item") {
    const response = await fetch(
      `${apiPath}/read/read-payment-detail-items-by-id.php?id=${id}`
    )
      .then((data) => data.json())
      .catch((error) => console.log(error));
    return { ...response };
  }

  const response = await fetch(
    `${apiPath}/read/read-payment-detail-by-items.php?s=${s}&ay=${ay}&rt=${rt}&st=${st}`
  )
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return { ...response };
}

// receiver
export async function receiverLoader({ request }) {
  const url = new URL(request.url);
  // query
  const q = url.searchParams.get("q") || "";

  const response = await fetch(`${apiPath}/read/read-receiver-by-q.php?q=${q}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return { ...response, q };
}
