import axios from 'axios';

import { CoinDTO } from '../../models/CoinDTO';

const BASE_API_URL = `${process.env.BASE_API_URL}/search`;

type TTrendingItem = {
	item: CoinDTO;
};

type TTrendingData = {
	coins: TTrendingItem[];
};

export const fetchSearchTrending = async () =>
	await axios.get<TTrendingData>(`${BASE_API_URL}/trending`);
