import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import Login from './components/Login';

function App() {
	return (
		<ThemeProvider>
			<CSSReset />
			<Login />
		</ThemeProvider>
	);
}

export default App;
