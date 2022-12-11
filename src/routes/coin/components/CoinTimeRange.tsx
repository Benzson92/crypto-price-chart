import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const timeRanges = [
	{
		label: '24h',
		value: '1',
	},
	{
		label: '7d',
		value: '7',
	},
	{
		label: '30d',
		value: '30',
	},
];

type Props = {
	selectedTimeRange: string;
	isDisabled?: boolean;
	onClick: (value: string) => void;
};

const CoinTimeRange: React.FunctionComponent<Props> = ({
	selectedTimeRange,
	isDisabled = true,
	onClick,
}) => {
	return (
		<ButtonGroup
			disabled={isDisabled}
			variant="outlined"
			aria-label="outlined button group"
		>
			{timeRanges.map(({ label, value }) => {
				const isSelected = value === selectedTimeRange;

				return (
					<Button
						key={label}
						onClick={() => onClick(value)}
						sx={{
							bgcolor: isSelected ? 'primary.main' : 'white',
							color: isSelected ? 'white' : 'primary.main',
							'&:hover': {
								color: 'secondary.main',
							},
						}}
					>
						{label}
					</Button>
				);
			})}
		</ButtonGroup>
	);
};

export default React.memo(CoinTimeRange);
