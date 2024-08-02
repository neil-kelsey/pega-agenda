import { ChangeEvent } from "react";
import { FilterPanelProps } from "../types/filterPanelProps";

const FilterPanel: React.FC<FilterPanelProps> = ({ uniqueDates, selectedDate, onDateChange }) => {
  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDateChange(event.target.value);
  };

  return (
    <select onChange={handleDateChange} value={selectedDate}>
      {uniqueDates.map(date => (
        <option key={date} value={date}>{date}</option>
      ))}
    </select>
  );
};

export default FilterPanel;
