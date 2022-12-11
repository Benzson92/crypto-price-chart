// You are given an array price where the value in each index is the price of the given stock.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction.
// If you cannot achieve any profit, return 0.

export const maximizeProfitFromPriceList = (prices: number[]) => {
	let maxProfit = 0;
	let minPrice = prices[0];

	for (let index = 0; index < prices.length; index++) {
		const currentPrice = prices[index];
		const maxDiff = currentPrice - minPrice;

		if (currentPrice > minPrice && maxProfit < maxDiff) {
			maxProfit = maxDiff;
		}

		if (currentPrice < minPrice) {
			minPrice = currentPrice;
		}
	}

	return maxProfit;
};
