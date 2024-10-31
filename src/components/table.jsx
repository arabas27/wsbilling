import clsx from "clsx";

export function Table({ children, className }) {
  return (
    <table className={clsx("w-full border border-gray-400", className)}>
      {children}
    </table>
  );
}

export function THead({ children, className }) {
  return <thead className={clsx("bg-sky-200", className)}>{children}</thead>;
}

export function THeadRow({ children, className }) {
  return (
    <tr className={clsx("py-1 border border-gray-400", className)}>
      {children}
    </tr>
  );
}

export function THeadCol({ children, className }) {
  return (
    <th className={clsx("py-1 border border-gray-400", className)}>
      {children}
    </th>
  );
}

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

export function TCol({ children, className, colSpan }) {
  return (
    <td
      className={clsx("py-1 border border-gray-400", className)}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}
