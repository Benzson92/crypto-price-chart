export const priceFormatter = (value: number) =>
	Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 10,
	}).format(value);
