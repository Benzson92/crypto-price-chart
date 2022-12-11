import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CoinDTO } from '@/models/CoinDTO';

type Props = {
	optionProps: React.HTMLAttributes<HTMLLIElement>;
	option: CoinDTO;
};

const CoinSearchOption: React.FunctionComponent<Props> = ({
	optionProps,
	option,
}) => {
	const { id, name, symbol, market_cap_rank, large, thumb } = option;
	const marketCapRank = market_cap_rank ? market_cap_rank : 'N/A'

	return (
		<Box
			component="li"
			width="100%"
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			{...optionProps}
		>
			{id ? (
				<>
					<Box
						display="flex"
						flexDirection="row"
						alignItems="center"
						width="100%"
					>
						<Box
							component="img"
							loading="lazy"
							width="20px"
							height="20px"
							src={thumb}
							srcSet={large}
							alt={name}
							sx={{
								flexShrink: 0,
								objectFit: 'contain',
								marginRight: '8px',
							}}
						/>
						<Typography
							variant="body2"
							component="div"
						>{`${name} (${symbol})`}</Typography>
					</Box>
					<Typography
						variant="caption"
						component="div"
						color="#6b7280"
					>
						#{marketCapRank}
					</Typography>
				</>
			) : (
				<Typography
					variant="body2"
					component="div"
				>
					{name}
				</Typography>
			)}
		</Box>
	);
};

export default CoinSearchOption;
