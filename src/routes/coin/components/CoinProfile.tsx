import React from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CoinMarketDTO } from '@/models/CoinMarketDTO';
import { priceFormatter } from '../../../utils/priceFormatter';

type Props = {
	coinMarketData: CoinMarketDTO;
};

const CoinProfile: React.FunctionComponent<Props> = ({ coinMarketData }) => {
	if (!coinMarketData) return null;

	const {
		market_cap_rank,
		image,
		name,
		symbol,
		current_price,
		price_change_percentage_24h,
	} = coinMarketData;

	const marketCapRank = market_cap_rank ? market_cap_rank : 'N/A'
	const currentPrice = priceFormatter(current_price);

	const priceChangePercentage24h = price_change_percentage_24h.toFixed(2);
	const isPriceChangePercentage24hPositive = price_change_percentage_24h > 0
	const priceChangePercentage24hColor = isPriceChangePercentage24hPositive ? 'green' : 'red'
	const priceChangePercentage24hSign = isPriceChangePercentage24hPositive ? '+' : ''

	return (
		<Stack
			flexDirection="column"
			alignItems="flex-start"
		>
			<Typography
				component="div"
				variant="caption"
				paddingX="10px"
				paddingY="2px"
				borderRadius="20px"
				color="white"
				bgcolor="secondary.main"
				marginBottom="4px"
			>
				{`Rank #${marketCapRank}`}
			</Typography>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				marginY="8px"
			>
				<Box
					component="img"
					loading="lazy"
					width="28px"
					height="28px"
					src={image}
					alt={name}
					sx={{ flexShrink: 0, objectFit: 'contain', marginRight: '8px' }}
				/>
				<Typography
					variant="h2"
					fontSize="20px"
					fontWeight="700"
				>
					{name}
					<Typography
						component="span"
						fontSize="20px"
						fontWeight="700"
						sx={{ textTransform: 'uppercase', marginLeft: '4px' }}
					>
						({symbol})
					</Typography>
				</Typography>
			</Box>
			<Stack flexDirection="row" alignItems="baseline">
				<Typography
					component="span"
					fontSize="30px"
					fontWeight="700"
				>
					{currentPrice}
				</Typography>
				<Typography
					component="span"
					fontSize="20px"
					fontWeight="700"
					color={priceChangePercentage24hColor}
					marginLeft="8px"
				>
					{priceChangePercentage24hSign}{priceChangePercentage24h}%
				</Typography>
				<Typography
					component="span"
					fontSize="12px"
					fontWeight="500"
					color="#767676"
					marginLeft="8px"
				>
					(24H)
				</Typography>
			</Stack>
		</Stack>
	);
};

export default React.memo(CoinProfile);
