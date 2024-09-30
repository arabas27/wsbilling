import clsx from "clsx";
import PropTypes from "prop-types";

export function DefaultButton({ children, className, onClick }) {
  return (
    <button
      className={clsx(
        "flex gap-1 items-center justify-center px-3 py-2 rounded",
        className
      )}
      onClick={onClick}
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
  className: PropTypes.string,
  onClick: PropTypes.func,
};
