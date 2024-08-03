import { ChangeEvent } from "react";
import { FilterPanelProps } from "../types/filterPanelProps";

const FilterPanel: React.FC<FilterPanelProps> = ({ viewMode, uniqueDates, selectedDate, onDateChange, onViewModeChange }) => {
  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDateChange(event.target.value);
  };

  const handleViewModeChange = (viewMode: 'day' | 'week') => () => {
    onViewModeChange(viewMode);
  };

  return (
    <div>
      <button onClick={handleViewModeChange('day')}>Day view</button>
      <button onClick={handleViewModeChange('week')}>Week view</button>
      {viewMode === "week" ?
        <></> :
        <select onChange={handleDateChange} value={selectedDate}>
          {uniqueDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select> }
    </div>
  );
};

export default FilterPanel;
