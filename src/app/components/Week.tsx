import React from "react";
import { WeekProps } from "../types/weekProps";
import Day from "./Day";
import TimeColumn from "./TimeColumn";

const Week: React.FC<WeekProps> = ({ uniqueDates, timeDifference, weekEarliestTime }) => {
  // TODO - change weekEarliestTime and all those dates to be a number? At least keep it consistent
  return (
    <div className="week">
      <TimeColumn earliestTime={weekEarliestTime} timeDifference={timeDifference}/>
      {uniqueDates.map((date, index) => (
        <Day key={index} timeDifference={timeDifference} date={date} />
      ))}
    </div>
  );
};

export default Week;
