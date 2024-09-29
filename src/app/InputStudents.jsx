import Card from "../components/Card";
import ImportStudent from "../assets/ImportStudent.xls";
import { FileInput, Select } from "../components/inputs";

export default function InputStudents() {
  return (
    <Card className="w-auto md:w-fit p-10 mx-auto text-nowrap overflow-auto">
      <table className="table">
        <tr>
          <td className="py-1 px-3">ดาวโหลดต้นฉบับ</td>
          <td className="py-1 px-3">
            <a className="font-bold text-blue-500" href={ImportStudent}>
              Download
            </a>
          </td>
        </tr>
        <tr>
          <td className="py-1 px-3">ปีการศึกษา</td>
          <td className="py-1 px-3">
            <Select name="text1" optionTexts={["2566", "2567"]} />
          </td>
        </tr>
        <tr>
          <td className="py-1 px-3">ระดับชั้น</td>
          <td className="py-1 px-3">
            <Select name="text1" optionTexts={["2566", "2567"]} />
          </td>
        </tr>
        <tr>
          <td className="py-1 px-3">ชั้นเรียน</td>
          <td className="py-1 px-3">
            <Select name="text1" optionTexts={["2566", "2567"]} />
          </td>
        </tr>
        <tr>
          <td className="py-1 px-3">ไฟล์นำเข้าข้อมูล</td>
          <td className="py-1 px-3">
            <FileInput />
          </td>
        </tr>
      </table>
    </Card>
  );
}
