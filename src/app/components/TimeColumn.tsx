import React from "react";
import { TimeColumnProps } from "../types/timeColumnProps";

const TimeColumn: React.FC<TimeColumnProps> = ({ timeDifference }) => {
    return (
        <div className="time-column">
        {[...Array(timeDifference)].map((_, index) => (
          <span key={index}>7:00am</span>
        ))}
      </div>
    );
};

export default TimeColumn;
