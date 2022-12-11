export interface CoinMarketDTO {
	id: string;
	name: string;
	symbol: string;
	market_cap_rank: number;
	current_price: number;
	price_change_percentage_24h: number;
	image: string;
}
