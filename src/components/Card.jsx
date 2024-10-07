import clsx from "clsx";
import PropTypes from "prop-types";

export default function Card({ children, className }) {
  return (
    <div className={clsx("shadow shadow-gray-600 rounded", className)}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};
