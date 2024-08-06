export interface FilterPanelProps {
  viewMode: 'day' | 'week';
  uniqueDates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onViewModeChange: (viewMode: 'day' | 'week') => void;
  viewType: 'calendar' | 'details'; // New prop
  onViewTypeChange: (viewType: 'calendar' | 'list') => void; // New prop
}