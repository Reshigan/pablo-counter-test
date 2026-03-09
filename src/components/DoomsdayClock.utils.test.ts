import { getTimeUntilMidnight, formatNumber } from './DoomsdayClock';

describe('DoomsdayClock Utilities', () => {
  describe('getTimeUntilMidnight', () => {
    it('returns the correct time until midnight', () => {
      // Mock the current time to 23:59:58
      const mockDate = new Date('2023-01-01T23:59:58');
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      const timeLeft = getTimeUntilMidnight();

      expect(timeLeft.hours).toBe(0);
      expect(timeLeft.minutes).toBe(0);
      expect(timeLeft.seconds).toBe(2);

      jest.useRealTimers();
    });

    it('handles midnight transition correctly', () => {
      // Mock the current time to 00:00:00 (midnight)
      const mockDate = new Date('2023-01-01T00:00:00');
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      const timeLeft = getTimeUntilMidnight();

      // Should return time until next midnight (23:59:59)
      expect(timeLeft.hours).toBe(23);
      expect(timeLeft.minutes).toBe(59);
      expect(timeLeft.seconds).toBe(59);

      jest.useRealTimers();
    });
  });

  describe('formatNumber', () => {
    it('formats single-digit numbers with leading zero', () => {
      expect(formatNumber(5)).toBe('05');
      expect(formatNumber(0)).toBe('00');
    });

    it('leaves double-digit numbers unchanged', () => {
      expect(formatNumber(10)).toBe('10');
      expect(formatNumber(99)).toBe('99');
    });
  });
});