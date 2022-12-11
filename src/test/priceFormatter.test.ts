import { priceFormatter } from '../utils/priceFormatter';

describe('Create a price format in US locale with integers', () => {
  test('1 equals $1.00', () => {
    expect(priceFormatter(1)).toBe('$1.00');
  });

  test('12 equals $12.00', () => {
    expect(priceFormatter(12)).toBe('$12.00');
  });

  test('123 equals $123.00', () => {
    expect(priceFormatter(123)).toBe('$123.00');
  });

  test('1234 equals $1,234.00', () => {
    expect(priceFormatter(1234)).toBe('$1,234.00');
  });

  test('12345 equals $12,345.00', () => {
    expect(priceFormatter(12345)).toBe('$12,345.00');
  });

  test('123456 equals $123,456.00', () => {
    expect(priceFormatter(123456)).toBe('$123,456.00');
  });

  test('1234567 equals $1,234,567.00', () => {
    expect(priceFormatter(1234567)).toBe('$1,234,567.00');
  });
})

describe('Create a price format in US locale with decimal numbers', () => {
  test('0.0123456789 equals $0.0123456789', () => {
    expect(priceFormatter(0.0123456789)).toBe('$0.0123456789');
  });

  test('0.012345678912 equals $0.0123456789', () => {
    expect(priceFormatter(0.012345678912)).toBe('$0.0123456789');
  });

  test('0.1234567890 equals $0.123456789', () => {
    expect(priceFormatter(0.1234567890)).toBe('$0.123456789');
  });

  test('0.123456789012 equals $0.123456789', () => {
    expect(priceFormatter(0.123456789012)).toBe('$0.123456789');
  });

  test('1.1 equals $1.10', () => {
    expect(priceFormatter(1.1)).toBe('$1.10');
  });

  test('12.12 equals $12.12', () => {
    expect(priceFormatter(12.12)).toBe('$12.12');
  });

  test('123.123 equals $123.123', () => {
    expect(priceFormatter(123.123)).toBe('$123.123');
  });

  test('1234.1234 equals $1,234.1234', () => {
    expect(priceFormatter(1234.1234)).toBe('$1,234.1234');
  });

  test('12345.12345 equals $12,345.12345', () => {
    expect(priceFormatter(12345.12345)).toBe('$12,345.12345');
  });

  test('123456.123456 equals $123,456.123456', () => {
    expect(priceFormatter(123456.123456)).toBe('$123,456.123456');
  });
})