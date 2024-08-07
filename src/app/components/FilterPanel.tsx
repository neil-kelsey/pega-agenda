import { ChangeEvent } from "react";
import { FilterPanelProps } from "../types/filterPanelProps";

const FilterPanel: React.FC<FilterPanelProps> = ({ viewMode, uniqueDates, selectedDate, onDateChange, onViewModeChange, viewType, onViewTypeChange }) => {
  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDateChange(event.target.value);
  };

  const handleViewModeChange = (viewMode: 'day' | 'week') => () => {
    onViewModeChange(viewMode);
  };

  const handleViewTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onViewTypeChange(event.target.value as 'calendar' | 'list');
  };

  return (
    <div className="filters">
      <button className={viewMode === 'day' ? 'day-btn selected' : 'day-btn'} onClick={handleViewModeChange('day')}>Day</button>
      <button className={viewMode === 'week' ? 'week-btn selected' : 'week-btn'} onClick={handleViewModeChange('week')}>Week</button>
      <span className="vr"></span>
      {viewMode === "week" ?
        <></> :
        <>
          <label>Select day</label>
          <select onChange={handleDateChange} value={selectedDate}>
            {uniqueDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
          <span className="vr"></span>
        </>
      }
      <span>
        <input type="radio" id="calendar" name="viewType" value="calendar" checked={viewType === 'calendar'} onChange={handleViewTypeChange} />
        <label className="mr-lg" htmlFor="calendar">Calendar</label>
        <input type="radio" id="list" name="viewType" value="list" checked={viewType === 'list'} onChange={handleViewTypeChange} />
        <label htmlFor="list">List</label>
      </span>
    </div>
  );
};

export default FilterPanel;
