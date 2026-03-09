import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DoomsdayClock from './DoomsdayClock';

// Mock the timer functions to control time in tests
jest.useFakeTimers();

describe('DoomsdayClock', () => {
  beforeEach(() => {
    // Set a fixed date for consistent testing
    jest.setSystemTime(new Date('2023-01-01T23:59:58'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the clock with correct initial time', () => {
    render(<DoomsdayClock />);

    expect(screen.getByText('00')).toBeInTheDocument(); // Hours
    expect(screen.getByText('00')).toBeInTheDocument(); // Minutes
    expect(screen.getByText('02')).toBeInTheDocument(); // Seconds
    expect(screen.getByLabelText('Doomsday Clock')).toBeInTheDocument();
  });

  it('updates the clock every second', () => {
    render(<DoomsdayClock />);

    // Initial state: 00:00:02
    expect(screen.getByText('02')).toBeInTheDocument();

    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should now show 00:00:01
    expect(screen.getByText('01')).toBeInTheDocument();

    // Advance time by another second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should now show 00:00:00
    expect(screen.getByText('00')).toBeInTheDocument();
  });

  it('cleans up the interval on unmount', () => {
    const { unmount } = render(<DoomsdayClock />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('displays the correct time segments with labels', () => {
    render(<DoomsdayClock />);

    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
    expect(screen.getByText(':')).toBeInTheDocument();
  });

  it('handles midnight transition correctly', () => {
    // Set time to 23:59:59
    jest.setSystemTime(new Date('2023-01-01T23:59:59'));
    render(<DoomsdayClock />);

    // Initial state: 00:00:01 (since it's 1 second until midnight)
    expect(screen.getByText('00')).toBeInTheDocument(); // Hours
    expect(screen.getByText('00')).toBeInTheDocument(); // Minutes
    expect(screen.getByText('01')).toBeInTheDocument(); // Seconds

    // Advance time by 1 second (now it's midnight)
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should now show 23:59:59 (time until next midnight)
    expect(screen.getByText('23')).toBeInTheDocument(); // Hours
    expect(screen.getByText('59')).toBeInTheDocument(); // Minutes
    expect(screen.getByText('59')).toBeInTheDocument(); // Seconds
  });
});