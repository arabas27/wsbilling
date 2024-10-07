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

export function TextArea({ name, id, className, placeholder, rows = 2 }) {
  return (
    <textarea
      type="text"
      className={clsx("border border-gray-600 rounded px-3 py-1", className)}
      name={name}
      id={id ? id : name}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export function NumberInput({
  name,
  id,
  className,
  placeholder,
  defaultValue = 0,
}) {
  return (
    <input
      type="number"
      className={clsx(
        "border border-gray-600 rounded px-3 py-1 text-end",
        className
      )}
      name={name}
      id={id ? id : name}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.number,
};

export function ControlledNumberInput({
  name,
  id,
  className,
  placeholder,
  value,
  onClick,
  onChange,
  disabled = false,
}) {
  return (
    <input
      type="number"
      className={clsx(
        "border border-gray-600 rounded px-3 py-1 text-end",
        className
      )}
      name={name}
      id={id ? id : name}
      placeholder={placeholder}
      value={value}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

ControlledNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

/**
 * คืนค่า Select Component
 * @param {string} name ชื่อ name
 * @param {string} id ชื่อ id ถ้าหากไม่ระบุ จะใช้ name
 * @param {array} optionTexts ข้อความที่แสดงใน option tag ถ้า index ที่ 0 ตั้งค่าเป็น "0" ตัวเลือกแรกเป็น "- เลือก -" หรือ "1" ตัวเลือกแรกเป็น "ทั้งหมด" หรือ "2" ตัวเลือกแรกเป็น "- ไม้เปลี่ยนแปลงข้อมูล -"
 * @param {array} optionValues ค่า value ของ option tag ที่ตรงกับ index ของ optionTexts ถ้าหากไม่ระบุ จะใช้ค่าใน optionTexts เป็นค่า value
 * @returns {React.JSX.Element}
 */
export function Select({
  name,
  id,
  optionTexts,
  optionValues,
  className,
  defaultValue,
}) {
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
      defaultValue={
        defaultValue && optionTexts.find((value) => value === defaultValue)
          ? defaultValue
          : optionTexts[0]
      }
    >
      {optionTexts.map((optionText, index) => {
        return (
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
        );
      })}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  optionTexts: PropTypes.array.isRequired,
  optionValues: PropTypes.array,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
};

export function ControlledSelect({
  name,
  id,
  optionTexts,
  optionValues,
  className,
  value,
  onClick,
  onChange,
}) {
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
      value={value}
      onChange={onChange}
      onClick={onClick}
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

ControlledSelect.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  optionTexts: PropTypes.array.isRequired,
  optionValues: PropTypes.array,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
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
