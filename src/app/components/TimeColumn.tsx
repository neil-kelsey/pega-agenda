import React from "react";
import { TimeColumnProps } from "../types/timeColumnProps";

const TimeColumn: React.FC<TimeColumnProps> = ({ earliestTime, timeDifference }) => {
  console.log("NeilTest - earliestTime test", earliestTime);
  console.log("NeilTest - earliestTime type of", typeof earliestTime);

  // Function to increment the time by the specified number of hours
  const incrementTime = (time: string, hours: number): string => {
    const [hour, minute] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour + hours);
    date.setMinutes(minute);
    return date.toTimeString().substring(0, 5);
  };

  return (
    <div className="time-column">
      {[...Array(timeDifference)].map((_, index) => (
        <span key={index}>{incrementTime(earliestTime, index)}</span>
      ))}
    </div>
  );
};

export default TimeColumn;
