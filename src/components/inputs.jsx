import clsx from "clsx";
import PropTypes from "prop-types";

export function InputGroup({ children, className }) {
  return <div className={clsx("flex flex-col", className)}>{children}</div>;
}

InputGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

export function TextInput({ name, id, className, placeholder }) {
  return (
    <input
      type="text"
      className={clsx("border border-gray-600 rounded px-3 py-1", className)}
      name={name}
      id={id ? id : name}
      placeholder={placeholder}
    />
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

/**
 * คืนค่า Select Component
 * @param {string} name ชื่อ name
 * @param {string} id ชื่อ id ถ้าหากไม่ระบุ จะใช้ name
 * @param {array} optionTexts ข้อความที่แสดงใน option tag
 * @param {array} optionValues ค่า value ของ option tag ที่ตรงกับ index ของ optionTexts ถ้าหากไม่ระบุ จะใช้ค่าใน optionTexts เป็นค่า value
 * @returns {React.JSX.Element}
 */
export function Select({ name, id, optionTexts, optionValues, className }) {
  // แจ้งเตือน error ผ่าน console เมื่อตั้งค่า optionValues ที่มีขนาดไม่เท่ากับขนาด optionTexts
  if (optionValues && optionValues.length !== optionTexts.length) {
    console.error(
      "Select Component Alert: ค่า optionValues มีขนาดไม่เท่ากับขนาดของ optionTexts ดังนั้นจะตั้งค่า value ของแต่ละ option tag เป็นค่าของ optionTexts"
    );
  }
  return (
    <select
      className={clsx("border border-gray-600 rounded px-3 py-1", className)}
      name={name}
      id={id ? id : name}
    >
      {optionTexts.map((optionText, index) => (
        <option
          value={
            optionValues && optionValues.length === optionTexts.length
              ? optionValues[index]
              : optionText
          }
          key={index}
        >
          {optionText}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  optionTexts: PropTypes.array.isRequired,
  optionValues: PropTypes.array,
  className: PropTypes.string,
};

export function FileInput({ name, id, className }) {
  return (
    <input
      type="file"
      className={clsx("border border-gray-600 rounded px-3 py-1", className)}
      name={name}
      id={id ? id : name}
    />
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};
