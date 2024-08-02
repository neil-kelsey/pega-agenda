import React from "react";
import { WeekProps } from "../types/weekProps";
import Day from "./Day";

const Week: React.FC<WeekProps> = ({ uniqueDates, timeDifference }) => {
  return (
    <div className="week">
      <div className="time-column">
        {[...Array(timeDifference)].map((_, index) => (
          <span key={index}>7:00am</span>
        ))}
      </div>
      {Array.from({ length: uniqueDates.length }).map((_, index) => (
        <Day key={index} timeDifference={timeDifference} />
      ))}
    </div>
  );
};

export default Week;
