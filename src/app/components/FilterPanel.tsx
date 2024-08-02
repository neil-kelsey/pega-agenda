import { ChangeEvent } from "react";
import { FilterPanelProps } from "../types/filterPanelProps";

const FilterPanel: React.FC<FilterPanelProps> = ({ uniqueDates, selectedDate, onDateChange, onViewModeChange }) => {
  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDateChange(event.target.value);
  };

  const handleViewModeChange = (viewMode: 'day' | 'week') => () => {
    onViewModeChange(viewMode);
  };

  return (
    <div>
      <select onChange={handleDateChange} value={selectedDate}>
        {uniqueDates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>
      <button onClick={handleViewModeChange('day')}>Day view</button>
      <button onClick={handleViewModeChange('week')}>Week view</button>
    </div>
  );
};

export default FilterPanel;
