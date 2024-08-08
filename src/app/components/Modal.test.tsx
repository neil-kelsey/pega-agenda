import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../components/Modal';
import { Activity } from '../types/activities';

describe('Modal', () => {
  const activity: Activity = {
    startTime: '2024-08-07T10:35:00.000Z',
    endTime: '2024-08-07T10:50:00.000Z',
    title: 'Test Activity',
    details: 'This is a test activity.',
    category: 1,
    minutesFromDayStart: 0,
    activityLength: 15,
    alignment: 'left'
  };

  const startTimeFormatted = '10:35am';
  const endTimeFormatted = '10:50am';

  it('renders activity details correctly', () => {
    render(<Modal activity={activity} startTimeFormatted={startTimeFormatted} endTimeFormatted={endTimeFormatted} onClose={() => {}} />);

    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('10:35am - 10:50am - 15 minutes')).toBeInTheDocument();
    expect(screen.getByText('This is a test activity.')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Modal activity={activity} startTimeFormatted={startTimeFormatted} endTimeFormatted={endTimeFormatted} onClose={onCloseMock} />);

    screen.getByRole('button', { name: /x/i }).click();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
