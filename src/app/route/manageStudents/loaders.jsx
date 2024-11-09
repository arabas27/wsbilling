import { apiPath } from "../../config";

// level
export async function levelLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const response = await fetch(`${apiPath}/read/read-level-by-q.php?q=${q}`)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { ...response, q };
  } else {
    return null;
  }
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

// student type
export async function classroomLoader({ request }) {
  const url = new URL(request.url);
  // classroom
  const cr = url.searchParams.get("cr") || "";
  // level
  const lv = url.searchParams.get("lv") || "";

  const response = await fetch(
    `${apiPath}/read/read-classroom-by-items.php?cr=${cr}&lv=${lv}`
  )
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { ...response, cr };
  } else {
    return null;
  }
}

// upload student
export async function uploadStudentLoader() {
  const response = await fetch(`${apiPath}/read/read-upload-student.php`)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { ...response };
  } else {
    return null;
  }
}

// student
export async function studentLoader({ request }) {
  const url = new URL(request.url);
  // academic year
  const ay =
    url.searchParams.get("ay") || parseInt(new Date().getFullYear()) + 543;
  // student type
  const st = url.searchParams.get("st") || "";
  // level
  const lv = url.searchParams.get("lv") || "";
  // section
  const sect = url.searchParams.get("sect") || "";
  // status
  const s = url.searchParams.get("s") || "";
  // query
  const q = url.searchParams.get("q") || "";
  // page
  const p = url.searchParams.get("p") || "";

  const response = await fetch(
    `${apiPath}/read/read-students-by-item.php?ay=${ay}&st=${st}&lv=${lv}&sect=${sect}&s=${s}&q=${q}&p=${p}`
  )
    .then((data) => data.json())
    .catch((error) => console.log(error));

  if (response.status === 200 || response.status === 404) {
    return { loaderData: { ...response }, p };
  } else {
    return null;
  }
}
