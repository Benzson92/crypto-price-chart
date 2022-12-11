import axios from 'axios';

const BASE_API_URL = `${process.env.BASE_API_URL}/coins`;

type Params = {
	vs_currency: string
	days: string
}

type TOhlcData = [number, number, number, number, number]

export const fetchOHLC = async (id: string, params: Params) =>
	await axios.get<TOhlcData[]>(`${BASE_API_URL}/${id}/ohlc`, { params });