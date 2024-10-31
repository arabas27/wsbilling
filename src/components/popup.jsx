import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export function PopupContainer({ children, name, className }) {
  const [sbHeight, setSbHeight] = useState("");

  useEffect(() => {
    const body = document.body,
      html = document.documentElement;

    const realHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    setSbHeight(`${realHeight + 100}px`);
  }, []);

  return (
    <div
      className={clsx(
        "absolute flex flex-col items-center top-0 left-0 w-full min-h-svh bg-black bg-opacity-50",
        className
      )}
      id={name}
      style={{ height: sbHeight }}
    >
      {children}
    </div>
  );
}
