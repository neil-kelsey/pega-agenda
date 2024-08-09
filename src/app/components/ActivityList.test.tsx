import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActivityList from '../components/ActivityList';
import { ActivityListProps } from '../types/activityListProps';
import { applyCategoryStyles } from '../utils/applyCategoryStyles';

jest.mock('../utils/applyCategoryStyles', () => ({
    applyCategoryStyles: jest.fn(),
}));

jest.mock('../components/Modal', () => {
    const MockedModal = () => <div>Mocked Modal</div>;
    MockedModal.displayName = 'MockedModal';
    return MockedModal;
});

describe('ActivityList', () => {
    const mockActivities = [
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
    ];

    const mockProps: ActivityListProps = {
        activities: mockActivities,
        oneMinuteOfHeight: 1,
        viewType: 'calendar',
    };

    beforeEach(() => {
        (applyCategoryStyles as jest.Mock).mockClear();
    });

    it('renders activities with correct titles and details', () => {
        render(<ActivityList {...mockProps} />);
        expect(screen.getByText('Details 1')).toBeInTheDocument();
        expect(screen.getByText('Details 2')).toBeInTheDocument();
    });

    it('toggles modal visibility on click', () => {
        render(<ActivityList {...mockProps} />);
        const firstActivity = screen.getByText('Details 1');
        fireEvent.click(firstActivity);
        expect(screen.getByText('Mocked Modal')).toBeInTheDocument();
        fireEvent.click(firstActivity);
        expect(screen.queryByText('Mocked Modal')).not.toBeInTheDocument();
    });

    it('renders activities with correct alignment and style', () => {
        render(<ActivityList {...mockProps} />);
        const firstActivity = screen.getByText('Details 1').closest('.activity');
        const secondActivity = screen.getByText('Details 2').closest('.activity');
        expect(firstActivity).toHaveClass('left');
        expect(secondActivity).toHaveClass('right');
        expect(firstActivity).toHaveStyle('top: 60%; height: calc(60% - 5px)');
        expect(secondActivity).toHaveStyle('top: 180%; height: calc(60% - 5px)');
    });

    it('renders correctly in list view type', () => {
        render(<ActivityList {...mockProps} viewType="list" />);
        expect(screen.getByText('Activity 1').closest('.activity-wrapper')).toHaveClass('list');
        expect(screen.getByText('Activity 2').closest('.activity-wrapper')).toHaveClass('list');
    });

    it('calls applyCategoryStyles on mount', () => {
        render(<ActivityList {...mockProps} />);
        expect(applyCategoryStyles).toHaveBeenCalled();
    });
});
