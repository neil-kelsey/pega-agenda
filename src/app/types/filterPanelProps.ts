export interface FilterPanelProps {
    uniqueDates: string[];
    selectedDate: string;
    onDateChange: (date: string) => void;
  }