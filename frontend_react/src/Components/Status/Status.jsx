import React from "react";

const Status = ({ statusText, statusColor }) => {
  return (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColor}`}
    >
      {statusText}
    </div>
  );
};

export default Status;