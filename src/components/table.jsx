import clsx from "clsx";
import PropTypes from "prop-types";

export function Table({ children, className }) {
  return (
    <table className={clsx("w-full border border-gray-400", className)}>
      {children}
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
};

export function THead({ children, className }) {
  return <thead className={clsx("bg-sky-200", className)}>{children}</thead>;
}

THead.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
};

export function THeadRow({ children, className }) {
  return (
    <tr className={clsx("py-1 border border-gray-400", className)}>
      {children}
    </tr>
  );
}

THeadRow.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
};

export function THeadCol({ children, className }) {
  return (
    <th className={clsx("py-1 border border-gray-400", className)}>
      {children}
    </th>
  );
}

THeadCol.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
};

export function TRow({ children, className, index }) {
  return (
    <tr
      className={clsx("hover:bg-slate-300", className, {
        "bg-slate-100": index % 2 === 0,
      })}
    >
      {children}
    </tr>
  );
}

TRow.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  index: PropTypes.number,
};

export function TCol({ children, className }) {
  return (
    <td className={clsx("py-1 border border-gray-400", className)}>
      {children}
    </td>
  );
}

TCol.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
};
