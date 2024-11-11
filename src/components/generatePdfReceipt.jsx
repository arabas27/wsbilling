import jsPDF from "jspdf";
import "../assets/fonts/THSarabunPSKBold-bold";
import "../assets/fonts/THSarabunPSK-normal";

export const generatePdfReceipt = (props) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "cm",
    format: [18, 21.59],
  });

  const keys = Object.keys(props);
  for (var i = 0; i < keys.length; i++) {
    //   doc.setFont("THSarabunPSK");
    doc.setFont("THSarabunPSKBold");
    doc.setFontSize(24);
    doc.text(`${props[keys[i]].bookNumber}`, 3.7, 2.1);
    doc.text(`${props[keys[i]].receiptNumber}`, 13.6, 2.1);

    doc.setFont("THSarabunPSK");
    doc.setFontSize(14);
    doc.text('โรงเรียนเบตง "วีระราษฎร์ประสาน"', 6.53, 3.87);
    doc.text("19 ถนนรวมวิทย์ ตำบลเบตง อำเภอเบตง จังหวัดยะลา 95110", 5, 4.35);
    doc.text(`${props[keys[i]].date}`, 10.5, 4.93);
    doc.text(`${props[keys[i]].academicYear}`, 3.57, 5.8);
    doc.text(`${props[keys[i]].semester}`, 7.57, 5.8);
    doc.text(`${props[keys[i]].payer}`, 3.72, 6.66);

    // item
    let offset = 0;
    props[keys[i]].items.forEach((el, i) => {
      doc.text(`${i + 1}`, 1.93, 9.85 + offset);
      doc.text(`${el.payment_list}`, 2.68, 9.85 + offset);
      doc.text(`${el.unit}`, 10.5, 9.85 + offset);
      doc.text(`${el.price_per_unit}`, 12, 9.85 + offset);
      doc.text(`${el.total}`, 14.5, 9.85 + offset);

      offset += 0.55;
    });

    // doc.text("1", 1.93, 9.85);
    // doc.text('ทุนการศึกษา "พี่ช่วยน้อง วส."', 2.68, 9.85);
    // doc.text("1", 10.5, 9.85);
    // doc.text("500.00", 12, 9.85);
    // doc.text("500.00", 14.5, 9.85);

    // doc.text("1", 1.93, 10.4);
    // doc.text('ทุนการศึกษา "พี่ช่วยน้อง วส."', 2.68, 10.4);
    // doc.text("1", 10.5, 10.4);
    // doc.text("500.00", 12, 10.4);
    // doc.text("500.00", 14.5, 10.4);
    // item
    doc.text(`${props[keys[i]].payment}`, 14.5, 17.4);
    doc.text("ห้าร้อยบาทถ้วน", 3.3, 18.65);
    doc.text(`${props[keys[i]].receiver}`, 11.2, 19.4);
    doc.text(`${props[keys[i]].position}`, 11.57, 20.24);

    doc.addPage();
  }

  // doc.save("aaa.pdf");
  doc.output("dataurlnewwindow");
};
