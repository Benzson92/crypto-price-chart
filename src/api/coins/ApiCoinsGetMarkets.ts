import axios from 'axios';

import { CoinMarketDTO } from '../../models/CoinMarketDTO';

const BASE_API_URL = `${process.env.BASE_API_URL}/coins`;

type Params = {
	vs_currency: string;
	ids?: string;
	order?: string;
	per_page?: number;
	page?: number;
	sparkline?: boolean;
};

export const fetchMarkets = async (params: Params) =>
	await axios.get<CoinMarketDTO[]>(`${BASE_API_URL}/markets`, { params });
