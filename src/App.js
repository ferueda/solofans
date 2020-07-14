import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import GlobalState from './GlobalState/GlobalState';
import * as ROUTES from './constants/routes';

import Home from './components/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';

function App() {
	return (
		<GlobalState>
			<ThemeProvider>
				<CSSReset />
				<Router>
					<Route exact path={ROUTES.HOME} component={Home} />

					<Route exact path={ROUTES.LOGIN} component={Login} />
					<Route exact path={ROUTES.SINGUP} component={SignUp} />
					<Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
				</Router>
			</ThemeProvider>
		</GlobalState>
	);
}

export default App;
