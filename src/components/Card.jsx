import clsx from "clsx";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Card({ children, className, style }) {
  return (
    <div
      className={twMerge(clsx("shadow shadow-gray-600 rounded", className))}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
};
