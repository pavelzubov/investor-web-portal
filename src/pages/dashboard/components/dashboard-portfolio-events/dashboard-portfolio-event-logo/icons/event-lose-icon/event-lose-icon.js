import "./event-lose-icon.scss";

import React from "react";

const EventLoseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="11"
    viewBox="0 0 8 11"
    fill="none"
    className="event-lose-icon"
  >
    <rect
      width="6"
      height="11"
      fill="black"
      fillOpacity="0"
      transform="translate(1 11) scale(1 -1)"
    />
    <path
      d="M6.68359 7.4544L3.91619 10.0312L1.14879 7.4544"
      stroke="#2EBD85"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M3.94079 10.0312L3.94079 0.670652"
      stroke="#2EBD85"
      strokeWidth="1.5"
    />
  </svg>
);

export default EventLoseIcon;
