export interface FilterPanelProps {
  viewMode: 'day' | 'week';
  uniqueDates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onViewModeChange: (viewMode: 'day' | 'week') => void;
  viewType: 'calendar' | 'list';
  onViewTypeChange: (viewType: 'calendar' | 'list') => void;
}