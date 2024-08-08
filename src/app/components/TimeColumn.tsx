import React from "react";
import { TimeColumnProps } from "../types/timeColumnProps";
import { incrementTime } from "../utils/incrementTime";

const TimeColumn: React.FC<TimeColumnProps> = ({ earliestTime, timeDifference }) => {
  // Ensure timeDifference is a valid number and greater than zero
  const validTimeDifference = Math.max(timeDifference, 1);

  // The first span value is displayed as "GMT" so we need to remove 1
  const updatedTimeDifference = validTimeDifference - 1;

  return (
    <div className="time-column">
        <span className="bold">GMT</span>
      {[...Array(updatedTimeDifference)].map((_, index) => (
        <span key={index}>{incrementTime(earliestTime, index)}</span>
      ))}
    </div>
  );
};

export default TimeColumn;
