import React from "react";
import { DayProps } from "../types/dayProps"; 

const Day: React.FC<DayProps> = ({ timeDifference }) => {
  return (
    <div className="day">
      <div className="time-lines">
        {[...Array(timeDifference)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
};

export default Day;
