import { maximizeProfitFromPriceList } from '../utils/maximizeProfitFromPriceList';

describe('maximize profit from buying a stock and selling it on a different day in the future', () => {
  test('[1, 2, 3, 4] equals 3', () => {
    expect(maximizeProfitFromPriceList([1, 2, 3, 4])).toBe(3);
  });

  test('[2, 1, 3, 4] equals 3', () => {
    expect(maximizeProfitFromPriceList([2, 1, 3, 4])).toBe(3);
  });

  test('[4, 1, 3, 2] equals 2', () => {
    expect(maximizeProfitFromPriceList([4, 1, 3, 2])).toBe(2);
  });

  test('[1, 1, 1, 1] equals 0', () => {
    expect(maximizeProfitFromPriceList([1, 1, 1, 1])).toBe(0);
  });

  test('[0, 0, 0, 0] equals 1', () => {
    expect(maximizeProfitFromPriceList([0, 0, 0, 0])).toBe(0);
  });

  test('[1, 0, 1, 0] equals 1', () => {
    expect(maximizeProfitFromPriceList([1, 0, 1, 0])).toBe(1);
  });

  test('[4, 3, 2, 1] equals 0', () => {
    expect(maximizeProfitFromPriceList([4, 3, 2, 1])).toBe(0);
  });
});
