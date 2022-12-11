import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import theme from './assets/theme';

import Home from './routes/home';
import Coin from './routes/coin';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Box paddingY="24px" paddingX="8px">
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/coins/:id"
							element={<Coin />}
						/>
					</Routes>
				</Box>
			</Router>
		</ThemeProvider>
	);
}

export default App;
