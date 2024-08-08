import React from 'react';
import { render, screen } from '@testing-library/react';
import Day from '../components/Day';
import { DayProps } from '../types/dayProps';
import { formatDate } from '../utils/formateDate';
import { addAlignmentToActivities } from '../utils/addAlignmentToActivities';

jest.mock('../utils/formateDate', () => ({
  formatDate: jest.fn(),
}));

jest.mock('../utils/addAlignmentToActivities', () => ({
  addAlignmentToActivities: jest.fn(),
}));

jest.mock('../components/ActivityList', () => () => <div>ActivityList Component</div>);

describe('Day', () => {
  const mockActivities = [
    { startTime: "2024-08-04T12:00:00.000Z", endTime: "2024-08-04T12:00:00.000Z", title: "Activity 1", details: "", category: 1, minutesFromDayStart: 0, activityLength: 60 },
    { startTime: "2024-08-04T13:00:00.000Z", endTime: "2024-08-04T13:30:00.000Z", title: "Activity 2", details: "", category: 2, minutesFromDayStart: 60, activityLength: 30 },
  ];

  const mockProps: DayProps = {
    timeDifference: 10,
    date: "2024-08-04",
    activities: mockActivities,
    oneMinuteOfHeight: 1,
    viewType: 'calendar',
  };

  beforeEach(() => {
    (formatDate as jest.Mock).mockReturnValue({ dayOfWeek: 'Sunday', dayOfMonth: '4th' });
    (addAlignmentToActivities as jest.Mock).mockReturnValue(mockActivities);
  });

  it('renders correctly with calendar viewType', () => {
    render(<Day {...mockProps} />);

    // Check the date formatting
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('4th')).toBeInTheDocument();
  });

  it('renders correctly with list viewType', () => {
    render(<Day {...mockProps} viewType="list" />);

    // Check the date formatting
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('4th')).toBeInTheDocument();
  });

  it('calls formatDate with correct date', () => {
    render(<Day {...mockProps} />);
    expect(formatDate).toHaveBeenCalledWith("2024-08-04");
  });

  it('calls addAlignmentToActivities with correct activities', () => {
    render(<Day {...mockProps} />);
    expect(addAlignmentToActivities).toHaveBeenCalledWith(mockActivities);
  });

  it('renders the time-lines div with 10 spans when viewType is calendar and timeDifference is 10', () => {
    render(<Day {...mockProps} />);
    
    const timeLinesDiv = screen.getByText((content, element) => {
      return element?.className === 'time-lines';
    });
    
    expect(timeLinesDiv).toBeInTheDocument();
    const spans = timeLinesDiv.querySelectorAll('span');
    expect(spans.length).toBe(10);
  });

  it('does not render the time-lines div when viewType is list', () => {
    render(<Day {...mockProps} viewType="list" />);
    expect(screen.queryByText((content, element) => {
      return element?.className === 'time-lines';
    })).not.toBeInTheDocument();
  });
});
