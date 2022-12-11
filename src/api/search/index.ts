import axios from 'axios';

import { CoinDTO } from '../../models/CoinDTO';

const BASE_API_URL = `${process.env.BASE_API_URL}/search`;

type TSearchedData = {
	coins: CoinDTO[];
};

export const fetchSearch = async (query: string) =>
	await axios.get<TSearchedData>(`${BASE_API_URL}?query=${query}`);
