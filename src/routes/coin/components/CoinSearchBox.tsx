import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { CoinDTO } from '@/models/CoinDTO';

import SearchIcon from '../icons/SearchIcon';
import CoinSearchOption from './CoinSearchOption';

type Props = {
	options: CoinDTO[];
	inputValue: string;
	onInputChange: (event: React.SyntheticEvent, newInputValue: string) => void;
	isLoading: boolean;
};

const CoinSearchBox: React.FunctionComponent<Props> = ({
	options,
	inputValue,
	onInputChange,
	isLoading,
}) => {
	const [value, setValue] = React.useState<CoinDTO>(null);

	const navigate = useNavigate();

	const helperText = inputValue?.length > 0 && inputValue?.length < 3
	? 'Please type at least 3 characters'
	: ''

	const handleChange = useCallback(
		(event: React.SyntheticEvent<HTMLInputElement>, { id }: CoinDTO) => {
			setValue(null);
			onInputChange(event, '');
			navigate(`/coins/${id}`);
		},
		[navigate, onInputChange]
	);

	return (
		<Autocomplete
			value={value}
			disablePortal
			blurOnSelect
			clearOnBlur={false}
			options={options}
			loading={isLoading}
			inputValue={inputValue}
			onChange={handleChange}
			onInputChange={onInputChange}
			sx={{ width: 300 }}
			getOptionLabel={(option: CoinDTO) => option.name}
			getOptionDisabled={(option) => !option.id}
			renderOption={(
				props,
				option
			) => (
				<CoinSearchOption key={option.name} optionProps={props} option={option} />
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Search coin name"
					helperText={helperText}
					InputProps={{
						...params.InputProps,
						type: 'search',
						startAdornment: <SearchIcon sx={{ color: '#757575' }} />,
						endAdornment: (
							<React.Fragment>
								{isLoading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
			filterOptions={(x) => x}
		/>
	);
};

export default CoinSearchBox;
