import clsx from "clsx";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export function DefaultButton({
  children,
  type = "button",
  className,
  onClick,
  name,
}) {
  return (
    <button
      type={type}
      className={twMerge(
        clsx(
          "flex gap-1 items-center justify-center px-3 py-2 rounded",
          className
        )
      )}
      onClick={onClick}
      name={name}
      id={name}
    >
      {children}
    </button>
  );
}

DefaultButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.element,
  ]),
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
};
