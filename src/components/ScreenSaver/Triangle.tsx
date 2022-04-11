import { forwardRef } from "react";

const Triangle = forwardRef<SVGPathElement>((_, ref) => {
  return (
    <svg
      width="147"
      height="152"
      viewBox="0 0 147 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={ref}
        d="M57 8.45004C97 -14.644 147 14.2235 147 60.4115L147 91.5884C147 137.776 97 166.644 57 143.55L30 127.962C-9.99997 104.868 -10 47.1325 30 24.0385L57 8.45004Z"
        fill="#5EF090"
      />
    </svg>
  );
});

Triangle.displayName = "Triangle";

export default Triangle;
