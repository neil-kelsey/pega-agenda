export interface FilterPanelProps {
    viewMode: string;
    uniqueDates: string[];
    selectedDate: string;
    onDateChange: (date: string) => void;
    onViewModeChange: (viewMode: 'day' | 'week') => void;
  }