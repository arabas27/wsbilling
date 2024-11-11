import { apiPath } from "../../config";

// level
export async function manageReceiptLoader({ request }) {
  const url = new URL(request.url);
  // academic year
  const ay =
    url.searchParams.get("ay") ||
    (parseInt(new Date().getFullYear()) + 543).toString();
  // student type
  const st = url.searchParams.get("st") || "";
  // level
  const lv = url.searchParams.get("lv") || "";
  // section
  const sect = url.searchParams.get("sect") || "";
  // คำค้นหา
  const q = url.searchParams.get("q") || "";
  // semester
  const s = url.searchParams.get("s") || "1";
  // book number
  const bn = url.searchParams.get("bn") || "";
  // page
  const p = url.searchParams.get("p") || "1";

  const response = await fetch(
    `${apiPath}/read/read-for-manage-receipt-by-items.php?ay=${ay}&st=${st}&lv=${lv}&sect=${sect}&q=${q}&s=${s}&bn=${bn}&p=${p}`
  )
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return { ...response, ay, st, lv, sect, q, s, p };
}

// student type
export async function studentTypeLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const response = await fetch(
    `${apiPath}/read/read-student-type-by-q.php?q=${q}`
  )
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { ...response, q };
  } else {
    return null;
  }
}
