import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home: React.FunctionComponent = () => {
	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			height="calc(100vh - 64px)"
		>
			<Helmet>
				<title>Cryptocurrency Price Chart</title>
			</Helmet>
			<Typography
				variant="h1"
				fontSize="24px"
				fontWeight="700"
				textAlign="center"
				marginBottom="24px"
			>
				Welcome to Cryptocurrency Price Chart
			</Typography>
			<Link to="/coins/ethereum">
				<Button variant="contained">Get Started</Button>
			</Link>
		</Stack>
	);
};

export default Home;
