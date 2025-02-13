import { formatDate,getInitials } from "../../../src/utils/formatter";

describe('formatDate', () => {
    test('should return today’s date in "DAY DD MONTH" format', () => {
        const mockDate = new Date(2024, 1, 12); // Feb 12, 2024 (Monday)
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

        expect(formatDate()).toBe("MONDAY 12 FEBRUARY");

        jest.restoreAllMocks();
    });
});

describe('getInitials', () => {
    test('should return initials for two-word names', () => {
        expect(getInitials('John Doe')).toBe('JD');
    });

    test('should return first letter for single-word names', () => {
        expect(getInitials('Alice')).toBe('A');
    });

    test('should handle extra spaces correctly', () => {
        expect(getInitials('   Jane   Doe   ')).toBe('JD');
    });

    test('should handle multiple names correctly', () => {
        expect(getInitials('Jean Pierre Louis')).toBe('JL');
    });

    test('should handle special characters in names', () => {
        expect(getInitials("O'Connor James")).toBe('OJ');
        expect(getInitials('Jean-Claude Van Damme')).toBe('JD');
    });

    test('should return empty string for empty input', () => {
        expect(getInitials('')).toBe('');
    });

    test('should return empty string for null or undefined', () => {
        expect(getInitials(null as any)).toBe('');
        expect(getInitials(undefined as any)).toBe('');
    });
});
