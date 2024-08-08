import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Agenda from '../components/Agenda';
import { AgendaProps } from '../types/agendaProps';
import { AppProvider } from '../context/AppContext';
import { extractUniqueDates } from '../utils/extractUniqueDates';
import { calculateTimeRange } from '../utils/calculateTimeRange';

jest.mock('../utils/extractUniqueDates', () => ({
    extractUniqueDates: jest.fn(),
}));

jest.mock('../utils/calculateTimeRange', () => ({
    calculateTimeRange: jest.fn(),
}));

jest.mock('../components/FilterPanel', () => () => <div>Mocked FilterPanel</div>);
jest.mock('../components/DayContainer', () => () => <div>Mocked DayContainer</div>);

const mockData = {
    event: 'Test Event',
    activities: [
        {
            startTime: '2024-08-04T12:00:00.000Z',
            endTime: '2024-08-04T13:00:00.000Z',
            title: 'Activity 1',
            details: 'Details 1',
            category: 1,
            minutesFromDayStart: 0,
            activityLength: 60,
            alignment: 'left',
        },
        {
            startTime: '2024-08-04T14:00:00.000Z',
            endTime: '2024-08-04T15:00:00.000Z',
            title: 'Activity 2',
            details: 'Details 2',
            category: 2,
            minutesFromDayStart: 120,
            activityLength: 60,
            alignment: 'right',
        },
    ],
};

describe('Agenda', () => {
    const mockProps: AgendaProps = {
        activityMinHeight: '25px',
        data: mockData,
    };

    beforeEach(() => {
        (extractUniqueDates as jest.Mock).mockReturnValue(['2024-08-04']);
        (calculateTimeRange as jest.Mock).mockReturnValue({
            earliestTime: '08:00',
            timeDifference: 10,
            weekTimeDifference: 50,
            weekEarliestTime: '07:00',
        });
    });

    it('renders correctly with initial props', () => {
        render(<Agenda {...mockProps} />);
        expect(screen.getByText('Mocked FilterPanel')).toBeInTheDocument();
        expect(screen.getByText('Mocked DayContainer')).toBeInTheDocument();
    });

    it('passes correct props to FilterPanel', () => {
        render(<Agenda {...mockProps} />);
        expect(screen.getByText('Mocked FilterPanel')).toBeInTheDocument();
    });

    it('passes correct props to DayContainer for week view mode', () => {
        render(<Agenda {...mockProps} />);
        expect(screen.getByText('Mocked DayContainer')).toBeInTheDocument();
    });

    it('toggles viewMode correctly', () => {
        render(<Agenda {...mockProps} />);
        fireEvent.click(screen.getByText('Mocked FilterPanel'));
        expect(screen.getByText('Mocked DayContainer')).toBeInTheDocument();
    });

    it('applies correct inline style for activityMinHeight', () => {
        render(<Agenda {...mockProps} />);
        const mainElement = screen.getByRole('main');
        expect(mainElement).toHaveStyle('--activity-min-height: 25px');
    });

    it('renders DayContainer with correct props for day view mode', () => {
        render(<Agenda {...mockProps} />);
        fireEvent.click(screen.getByText('Mocked FilterPanel'));
        expect(screen.getByText('Mocked DayContainer')).toBeInTheDocument();
    });

    it('handles date change correctly', () => {
        render(<Agenda {...mockProps} />);
        fireEvent.click(screen.getByText('Mocked FilterPanel'));
        expect(screen.getByText('Mocked DayContainer')).toBeInTheDocument();
    });

    it('handles view type change correctly', () => {
        render(<Agenda {...mockProps} />);
        fireEvent.click(screen.getByText('Mocked FilterPanel'));
        expect(screen.getByText('Mocked DayContainer')).toBeInTheDocument();
    });
});
