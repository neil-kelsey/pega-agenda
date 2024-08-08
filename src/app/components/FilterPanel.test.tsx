import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../components/FilterPanel';
import { FilterPanelProps } from '../types/filterPanelProps';

// Mock data for tests
const mockProps: FilterPanelProps = {
  viewMode: 'week',
  uniqueDates: ["2024-08-04", "2024-08-05", "2024-08-06"],
  selectedDate: "2024-08-04",
  onDateChange: jest.fn(),
  onViewModeChange: jest.fn(),
  viewType: 'calendar',
  onViewTypeChange: jest.fn(),
};

describe('FilterPanel', () => {
  it('renders correctly', () => {
    render(<FilterPanel {...mockProps} />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByLabelText('Calendar')).toBeInTheDocument();
    expect(screen.getByLabelText('List')).toBeInTheDocument();
  });

  it('handles view mode change to day', () => {
    render(<FilterPanel {...mockProps} />);
    fireEvent.click(screen.getByText('Day'));
    expect(mockProps.onViewModeChange).toHaveBeenCalledWith('day');
  });

  it('handles view mode change to week', () => {
    render(<FilterPanel {...mockProps} />);
    fireEvent.click(screen.getByText('Week'));
    expect(mockProps.onViewModeChange).toHaveBeenCalledWith('week');
  });

  it('handles date change', () => {
    const { container } = render(<FilterPanel {...mockProps} viewMode="day" />);
    const select = container.querySelector('select');
    fireEvent.change(select as HTMLElement, { target: { value: '2024-08-05' } });
    expect(mockProps.onDateChange).toHaveBeenCalledWith('2024-08-05');
  });

  it('handles view type change to list', () => {
    render(<FilterPanel {...mockProps} />);
    fireEvent.click(screen.getByLabelText('List'));
    expect(mockProps.onViewTypeChange).toHaveBeenCalledWith('list');
  });

  it('formats dates correctly in the select dropdown', () => {
    render(<FilterPanel {...mockProps} viewMode="day" />);
    expect(screen.getByText('Sunday 4th')).toBeInTheDocument();
    expect(screen.getByText('Monday 5th')).toBeInTheDocument();
    expect(screen.getByText('Tuesday 6th')).toBeInTheDocument();
  });
});
