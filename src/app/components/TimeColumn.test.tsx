import React from 'react';
import { render } from '@testing-library/react';
import TimeColumn from './TimeColumn';

jest.mock('../utils/incrementTime', () => ({
  incrementTime: jest.fn((time, hours) => {
    const [hour, minute] = time.split(':').map(Number);
    const newHour = hour + hours;
    return `${newHour < 10 ? '0' : ''}${newHour}:${minute < 10 ? '0' : ''}${minute}`;
  })
}));

describe('TimeColumn', () => {
  test('renders the correct number of time slots', () => {
    const { container } = render(<TimeColumn earliestTime="08:00" timeDifference={5} />);
    const timeSlots = container.querySelectorAll('span');
    expect(timeSlots).toHaveLength(5); // 1 for GMT and 4 for the time slots
  });

  test('renders GMT at the top', () => {
    const { getByText } = render(<TimeColumn earliestTime="08:00" timeDifference={5} />);
    expect(getByText('GMT')).toBeInTheDocument();
  });

  test('renders the correct time slots and ensures 12:00 is not in the document', () => {
    const { getByText, queryByText } = render(<TimeColumn earliestTime="08:00" timeDifference={5} />);
    expect(getByText('GMT')).toBeInTheDocument();
    expect(getByText('08:00')).toBeInTheDocument();
    expect(getByText('09:00')).toBeInTheDocument();
    expect(getByText('10:00')).toBeInTheDocument();
    expect(getByText('11:00')).toBeInTheDocument();
    expect(queryByText('12:00')).not.toBeInTheDocument();
  });

  test('handles timeDifference of 0 correctly', () => {
    const { container } = render(<TimeColumn earliestTime="08:00" timeDifference={0} />);
    const timeSlots = container.querySelectorAll('span');
    expect(timeSlots).toHaveLength(1); // Only GMT should be rendered
  });
});
