import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { OhlcData, UTCTimestamp } from 'lightweight-charts';
import { AxiosError } from 'axios';
import { Helmet } from 'react-helmet';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { fetchSearch } from '../../api/search';
import { fetchSearchTrending } from '../../api/trending';
import { fetchOHLC } from '../../api/coins/ApiCoinsGetOHLC';
import { fetchMarkets } from '../../api/coins/ApiCoinsGetMarkets';

import { CoinDTO } from '../../models/CoinDTO';
import { CoinMarketDTO } from '../../models/CoinMarketDTO';

import CoinProfile from './components/CoinProfile';
import CoinSearchBox from './components/CoinSearchBox';
import CoinTimeRange from './components/CoinTimeRange';
import CoinPriceChart from './components/CoinPriceChart';

const bangkokGMTOffsetMs = 7 * 60 * 60 * 1000;

interface IErrorMessages {
	fetchMarketError: string;
	fetchOHLCError: string;
	fetchSearchTrendingError: string;
	fetchSearchError: string;
}

interface IAxiosErrorResponseData {
	error: string;
}

function Coin() {
	let { id } = useParams();

	const [coinMarketData, setCoinMarketData] =
		React.useState<CoinMarketDTO>(null);

	const trendingCoins = useRef<CoinDTO[]>([]);
	const [searchedCoins, setSearchedCoins] = React.useState<CoinDTO[]>([]);
	const [coinSearchValue, setCoinSearchValue] = React.useState('');

	const [selectedTimeRange, setSelectedTimeRange] = React.useState('1');
	const [ohlcPrices, setOhlcPrices] = React.useState<OhlcData[]>([]);

	const [areSearchedCoinsLoading, setAreSearchedCoinsLoading] =
		React.useState(true);
	const [areOhlcPricesLoading, setAreOhlcPricesLoading] = React.useState(true);

	const [errorMessages, setErrorMessages] =
		React.useState<IErrorMessages>(null);

	const { name, symbol } = coinMarketData || {};

	const handleFetchError = useCallback(
		(error: any, errorMessageKey: string) => {
			const { response, message } =
				error as AxiosError<IAxiosErrorResponseData>;
			const errorMessage = response.data.error || message;

			setErrorMessages((prevState) => {
				return { ...prevState, [errorMessageKey]: errorMessage };
			});
		},
		[]
	);

	useEffect(() => {
		async function fetchCoinMarketData() {
			setErrorMessages(null);

			try {
				const res = await fetchMarkets({ vs_currency: 'usd', ids: id });
				setCoinMarketData(res.data[0]);
			} catch (error) {
				handleFetchError(error, 'fetchMarketError');
			}
		}

		fetchCoinMarketData();
	}, [handleFetchError, id]);

	useEffect(() => {
		async function fetchOHLCPrices() {
			setAreOhlcPricesLoading(true);
			setErrorMessages(null);

			try {
				const res = await fetchOHLC(id, {
					vs_currency: 'usd',
					days: selectedTimeRange,
				});
				const mappedOhlcPrices = res.data.map(
					([time, open, high, low, close]) => ({
						time: ((time + bangkokGMTOffsetMs) / 1000) as UTCTimestamp,
						open,
						high,
						low,
						close,
					})
				);

				setOhlcPrices(mappedOhlcPrices);
			} catch (error) {
				handleFetchError(error, 'fetchOHLCError');
			} finally {
				setAreOhlcPricesLoading(false);
			}
		}

		fetchOHLCPrices();
	}, [handleFetchError, id, selectedTimeRange]);

	useEffect(() => {
		async function fetchTrendingCoins() {
			try {
				const res = await fetchSearchTrending();
				const { coins } = res.data;

				const mappedCoins = coins.map(({ item }) => item);
				const trendingSearchedCoins = [
					{ id: null, name: 'Trending Coins 🔥' },
					...mappedCoins,
				];

				trendingCoins.current = [...trendingSearchedCoins];
				setSearchedCoins(trendingSearchedCoins);
			} catch (error) {
				handleFetchError(error, 'fetchSearchTrendingError');
			} finally {
				setAreSearchedCoinsLoading(false);
			}
		}

		fetchTrendingCoins();
	}, [handleFetchError]);

	useEffect(() => {
		async function fetchSearchCoinName(coinName: string) {
			try {
				const res = await fetchSearch(coinName);
				const { coins } = res.data;

				setSearchedCoins(coins);
			} catch (error) {
				handleFetchError(error, 'fetchSearchError');
			} finally {
				setAreSearchedCoinsLoading(false);
			}
		}

		if (coinSearchValue?.length > 2) {
			setAreSearchedCoinsLoading(true);

			setTimeout(() => {
				fetchSearchCoinName(coinSearchValue);
			}, 1000);
		}
	}, [coinSearchValue, handleFetchError]);

	const handleInputChange = (
		event: React.SyntheticEvent<HTMLInputElement>,
		newInputValue: string
	) => {
		setCoinSearchValue(newInputValue);
		if (!newInputValue) setSearchedCoins(trendingCoins.current);
	};

	return (
		<Container maxWidth="md">
			<Helmet>
				<title>{`${name || 'Cryptocurrency'} Price Chart - ${symbol?.toUpperCase() || ''}`}/USD</title>
			</Helmet>
			<Box
				display="flex"
				flexDirection="row"
				justifyContent="center"
				marginBottom="24px"
			>
				<CoinSearchBox
					options={searchedCoins}
					inputValue={coinSearchValue}
					onInputChange={handleInputChange}
					isLoading={areSearchedCoinsLoading}
				/>
			</Box>
			<Stack
				width="100%"
				spacing={2}
				marginBottom="24px"
			>
				{errorMessages &&
					Object.entries(errorMessages).map(([key, value]) => (
						<Alert
							key={key}
							severity="error"
						>
							{value}
						</Alert>
					))}
			</Stack>
			<CoinProfile coinMarketData={coinMarketData} />
			<Stack
				direction={{ xs: 'column', md: 'row' }}
				alignItems={{ xs: 'flex-start', md: 'center' }}
				justifyContent="space-between"
				marginTop="28px"
				marginBottom="48px"
			>
				{coinMarketData && (
					<Typography
						variant="h1"
						fontSize="24px"
						fontWeight="700"
						display="flex"
						flexWrap="wrap"
						alignItems="center"
						marginBottom={{ xs: '12px', md: 0 }}
					>
						<span>{`${name} Price Chart`}&nbsp;</span>
						<Typography
							component="span"
							fontSize="24px"
							fontWeight="700"
							sx={{
								textTransform: 'uppercase',
							}}
						>
							({symbol}/usd)
						</Typography>
					</Typography>
				)}
				<CoinTimeRange
					selectedTimeRange={selectedTimeRange}
					isDisabled={!!errorMessages || areOhlcPricesLoading}
					onClick={setSelectedTimeRange}
				/>
			</Stack>
			<CoinPriceChart
				data={ohlcPrices}
				isLoading={areOhlcPricesLoading}
			/>
		</Container>
	);
}

export default Coin;
