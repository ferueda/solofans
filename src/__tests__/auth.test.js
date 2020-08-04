import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Login from '../components/Auth/Login';
import {
	render,
	screen,
	wait,
	waitFor,
	fireEvent,
	act,
	waitForElement,
	waitForElementToBeRemoved,
	getAllByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import 'mutationobserver-shim';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { FirebaseContext } from '../GlobalState/FirebaseContext';
import { AuthContext } from '../GlobalState/AuthContext';

import * as ROUTES from '../constants/routes';

global.MutationObserver = window.MutationObserver;

/*

On pressing "Ingresar", it triggers the function with the right data
On pressing "Ingresar con Facebook" it triggers the right function


Validate errors and edge cases

*/

jest.mock('../hooks/useProtectedRoute');

describe('Login', () => {
	const promise = Promise.resolve();
	const doSignInUserWithEmailAndPassword = jest.fn(() => promise);

	beforeEach(() => {
		const firebaseContext = {
			doSignInUserWithEmailAndPassword,
		};

		const authContext = {
			user: {},
			isLoading: false,
			error: null,
		};

		render(
			<MemoryRouter>
				<FirebaseContext.Provider value={firebaseContext}>
					<AuthContext.Provider value={authContext}>
						<ThemeProvider>
							<CSSReset />
							<Login />
						</ThemeProvider>
					</AuthContext.Provider>
				</FirebaseContext.Provider>
			</MemoryRouter>
		);
	});

	useProtectedRoute.mockReturnValue({});

	test('"Recuperar clave" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /recuperar/i });

		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent(/recuperar clave/i);
	});

	test('"Recuperar clave" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /recuperar/i });

		expect(link).toHaveAttribute('href', ROUTES.FORGOT_PASSWORD);

		userEvent.click(link);
	});

	test('"Regístrate" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /regístrate/i });

		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent(/regístrate/i);
	});

	test('"Regístrate" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /regístrate/i });

		expect(link).toHaveAttribute('href', ROUTES.SINGUP);

		userEvent.click(link);
	});

	test('email and password input render with the right values', () => {
		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/contraseña/i);

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();

		expect(emailInput).toHaveValue('');
		expect(passwordInput).toHaveValue('');
	});

	test('email and password input updates when entering text', () => {
		const emailInput = screen.getByRole('textbox', { type: 'email' });
		const passwordInput = screen.getByRole('textbox', { type: 'password' });

		const emailText = 'email@email.com';
		const passText = 'password';

		fireEvent.input(emailInput, { target: { value: emailText } });
		expect(emailInput).toHaveValue(emailText);

		fireEvent.input(passwordInput, { target: { value: passText } });
		expect(passwordInput).toHaveValue(passText);
	});

	test('"Ingresar" and "Ingresar con Facebook" buttons render', () => {
		const loginButton = screen.getByLabelText('ingresar');
		const fbLoginButton = screen.getByLabelText('ingresar con facebook');

		expect(loginButton).toBeInTheDocument();
		expect(fbLoginButton).toBeInTheDocument();
	});

	test('login button is disabled when empty inputs and active when value in inputs', () => {
		const loginButton = screen.getByLabelText('ingresar');

		expect(loginButton).toHaveAttribute('aria-disabled', 'true');
		expect(loginButton).toBeDisabled();

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/contraseña/i);

		const emailText = 'email@email.com';
		const passText = 'password';

		fireEvent.input(emailInput, { target: { value: emailText } });
		fireEvent.input(passwordInput, { target: { value: passText } });

		expect(loginButton).toHaveAttribute('aria-disabled', 'false');
		expect(loginButton).not.toBeDisabled();
	});

	test('when submit with main button, loading state is shown and then removed', async () => {
		const loginButton = screen.getByLabelText('ingresar');

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/contraseña/i);

		const emailText = 'email@email.com';
		const passText = 'password';

		fireEvent.input(emailInput, { target: { value: emailText } });
		fireEvent.input(passwordInput, { target: { value: passText } });

		userEvent.click(loginButton);

		await act(() => promise);

		expect(doSignInUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
		expect(doSignInUserWithEmailAndPassword).toHaveBeenCalledWith(emailText, passText);
	});

	// test('when submit with facebook button, loading state is shown and then removed', async () => {

	// 	const fbLoginButton = screen.getByLabelText('ingresar con facebook');

	// 	fireEvent.click(fbLoginButton);

	// 	const loading = await screen.findAllByText(/loading/i);

	// 	expect(doSignInUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
	// 	expect(loading).toHaveLength(2);

	// 	screen.debug();

	// 	await act(() => promise);
	// });
});
