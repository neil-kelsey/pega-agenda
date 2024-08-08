import React from 'react';
import { render, screen } from '@testing-library/react';
import DayContainer from '../components/DayContainer';
import { DayContainerProps } from '../types/dayContainerProps';
import { AppProvider } from '../context/AppContext';
import mockData from '../data/test-data.json';

describe('DayContainer', () => {
  jest.mock('../utils/calculateActivityPositions', () => ({
    calculateActivityPositions: jest.fn().mockReturnValue({
      updatedActivities: mockData.activities,
      oneMinuteOfHeight: 1,
    }),
  }));

  const mockProps: DayContainerProps = {
    uniqueDates: ["2024-08-04", "2024-08-05"],
    timeDifference: 10,
    weekEarliestTime: "08:00",
    viewType: 'calendar',
  };

  it('Renders the correct days data', () => {
    render(
      <AppProvider data={mockData}>
        <DayContainer {...mockProps} />
      </AppProvider>
    );
    // Renders activities from 2024-08-04
    expect(screen.getByText('Check-in & Registration')).toBeInTheDocument();
    expect(screen.getByText('Opening Remarks')).toBeInTheDocument();
    
     // Renders activities from 2024-08-05
     const pegaWorldElements = screen.getAllByText('PegaWORLD');
     expect(pegaWorldElements.length).toBeGreaterThan(0);

     // Doesn't renders activities from a day not selected (2024-08-07)
     expect(screen.queryByText('Upgrade Information')).not.toBeInTheDocument();
  });

  it('Does render TimeColumn component when viewType is calendar', () => {
    render(
      <AppProvider data={mockData}>
        <DayContainer {...mockProps} viewType="calendar" />
      </AppProvider>
    );
    expect(screen.getByText('GMT')).toBeInTheDocument();
  });

  it('Doesn\'t render TimeColumn component when viewType is list', () => {
    render(
      <AppProvider data={mockData}>
        <DayContainer {...mockProps} viewType="list" />
      </AppProvider>
    );
    expect(screen.queryByText('GMT')).not.toBeInTheDocument();
  });
});
