import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import GlobalState from './GlobalState/GlobalState';

import * as ROUTES from './constants/routes';

import Home from './pages/Home';
import Buscar from './pages/Buscar';
import NewPost from './pages/NewPost';
import Account from './pages/Account';

import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';

/* TODOS
Validate and redesign confirm email template, confirm email hook and confirm email flow.
Validate and redesign recover password template, and  flow.
*/

const App = () => {
	const location = useLocation();

	const background = location.state && location.state.background;

	return (
		<GlobalState>
			<ThemeProvider>
				<CSSReset />

				<Switch location={background || location}>
					<Route exact path={ROUTES.HOME} component={Home} />
					<Route path={ROUTES.BUSCAR} component={Buscar} />
					<Route path={ROUTES.NEW_POST} component={NewPost} />

					<Route path={ROUTES.LOGIN} component={Login} />
					<Route path={ROUTES.SINGUP} component={SignUp} />
					<Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
				</Switch>

				{background && <Route path={ROUTES.ACCOUNT} component={Account} />}
			</ThemeProvider>
		</GlobalState>
	);
};

export default App;
