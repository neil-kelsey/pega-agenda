import React from "react";
import { WeekProps } from "../types/weekProps";
import Day from "./Day";
import { useAppContext } from "../context/AppContext";
import TimeColumn from "./TimeColumn";

const Week: React.FC<WeekProps> = ({ uniqueDates, timeDifference }) => {
  const { data } = useAppContext();
  console.log("NeilTest - data", data);
  
  return (
    <div className="week">
      {/* TODO - is this time-column code going to be duplicated in the day-container component? Then make it it's own component */}
      <TimeColumn timeDifference={timeDifference}/>
      {uniqueDates.map((date, index) => (
        <Day key={index} timeDifference={timeDifference} date={date} />
      ))}
    </div>
  );
};

export default Week;
