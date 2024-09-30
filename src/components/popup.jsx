import PropTypes from "prop-types";

export function PopUpContainer({ children }) {
  return (
    <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50">
      {children}
    </div>
  );
}

PopUpContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
