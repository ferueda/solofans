import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import ForgotPassword from '../components/Auth/ForgotPassword';
import { render, screen, fireEvent, act } from '@testing-library/react';

import 'mutationobserver-shim';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { AuthContext } from '../GlobalState/AuthContext';

import * as ROUTES from '../constants/routes';

import { doSignInUserWithEmailAndPassword, doSignInWithFacebook, doPasswordReset } from '../firebase/firebase';

global.MutationObserver = window.MutationObserver;

jest.mock('../hooks/useProtectedRoute');
jest.mock('../firebase/firebase');

describe('Login', () => {
	const promise = Promise.resolve();

	beforeEach(() => {
		const authContext = {
			user: {},
			isLoading: false,
			error: null,
		};

		render(
			<MemoryRouter>
				<AuthContext.Provider value={authContext}>
					<ThemeProvider>
						<CSSReset />
						<Login />
					</ThemeProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		);
	});

	useProtectedRoute.mockReturnValue({});

	test('"Recuperar clave" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /recuperar/i });

		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent(/recuperar clave/i);
	});

	test('"Regístrate" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /regístrate/i });

		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent(/regístrate/i);
	});

	test('"Recuperar clave" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /recuperar/i });

		expect(link).toHaveAttribute('href', ROUTES.FORGOT_PASSWORD);
	});

	test('"Regístrate" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /regístrate/i });

		expect(link).toHaveAttribute('href', ROUTES.SINGUP);
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

	test('when submit with main button, doSignInUserWithEmailAndPassword is called', async () => {
		doSignInUserWithEmailAndPassword.mockReturnValue(promise);

		const loginButton = screen.getByLabelText('ingresar');

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/contraseña/i);

		const emailText = 'email@email.com';
		const passText = 'password';

		fireEvent.input(emailInput, { target: { value: emailText } });
		fireEvent.input(passwordInput, { target: { value: passText } });

		expect(doSignInUserWithEmailAndPassword).toHaveBeenCalledTimes(0);

		fireEvent.click(loginButton);

		await act(() => promise);

		expect(doSignInUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
		expect(doSignInUserWithEmailAndPassword).toHaveBeenCalledWith(emailText, passText);
	});

	test('when submit with facebook button, doSignInWithFacebook is called', async () => {
		doSignInWithFacebook.mockReturnValue(promise);

		const fbLoginButton = screen.getByLabelText('ingresar con facebook');

		expect(doSignInWithFacebook).toHaveBeenCalledTimes(0);

		fireEvent.click(fbLoginButton);

		await act(() => promise);

		expect(doSignInWithFacebook).toHaveBeenCalledTimes(1);
	});

	test('error message renders', async () => {
		const errorMessages = {
			'auth/user-not-found':
				'El correo electrónico ingresado no está registrado. Comprueba el correo y vuelve a intentarlo.',
		};

		doSignInUserWithEmailAndPassword.mockReturnValue(Promise.reject({ code: 'auth/user-not-found' }));

		const loginButton = screen.getByLabelText('ingresar');

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/contraseña/i);

		const emailText = 'email@email.com';
		const passText = 'password';

		fireEvent.input(emailInput, { target: { value: emailText } });
		fireEvent.input(passwordInput, { target: { value: passText } });

		fireEvent.click(loginButton);

		await act(() => promise);

		expect(screen.getByText(errorMessages['auth/user-not-found'])).toBeInTheDocument();
	});
});

describe('SignUp', () => {
	const emailText = 'email@email.com';
	const firstNameText = 'testname';
	const lastNameText = 'testlastname';
	const usernameText = 'username';
	const passText = 'password';

	let inputArray = [];
	const textArray = [emailText, firstNameText, lastNameText, usernameText, passText];

	beforeEach(() => {
		const authContext = {
			user: {},
			isLoading: false,
			error: null,
		};

		render(
			<MemoryRouter>
				<AuthContext.Provider value={authContext}>
					<ThemeProvider>
						<CSSReset />
						<SignUp />
					</ThemeProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		);

		const email = screen.getByLabelText(/email/i);
		const firstName = screen.getByLabelText('nombre');
		const lastName = screen.getByLabelText(/apellido/i);
		const username = screen.getByLabelText(/nombre de usuario/i);
		const password = screen.getByLabelText(/contraseña/i);

		inputArray = [email, firstName, lastName, username, password];
	});

	useProtectedRoute.mockReturnValue({});

	test('"Ingresa aquí" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /ingresa aquí/i });
		expect(link).toBeInTheDocument();
	});

	test('"Ingresa aquí" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /ingresa aquí/i });
		expect(link).toHaveAttribute('href', ROUTES.LOGIN);
	});

	test('inputs render with the right values', async () => {
		inputArray.forEach(input => expect(input).toBeInTheDocument());
		inputArray.forEach(input => expect(input).toHaveValue(''));
	});

	test('inputs update when entering text', () => {
		inputArray.forEach((input, index) => {
			fireEvent.input(input, { target: { value: textArray[index] } });
			expect(input).toHaveValue(textArray[index]);
		});
	});

	test('"Crear cuenta" and "Ingresar con Facebook" buttons render', () => {
		const loginButton = screen.getByLabelText(/crear cuenta/i);
		const fbLoginButton = screen.getByLabelText(/ingresar con facebook/i);

		expect(loginButton).toBeInTheDocument();
		expect(fbLoginButton).toBeInTheDocument();
	});

	test('signup button is disabled when empty inputs and active when value in inputs', () => {
		const button = screen.getByLabelText(/crear cuenta/i);

		expect(button).toHaveAttribute('aria-disabled', 'true');
		expect(button).toBeDisabled();

		inputArray.forEach((input, index) => {
			fireEvent.input(input, { target: { value: textArray[index] } });
		});

		expect(button).toHaveAttribute('aria-disabled', 'false');
		expect(button).not.toBeDisabled();
	});
});

describe('ForgotPassword', () => {
	beforeEach(() => {
		const authContext = {
			user: {},
			isLoading: false,
			error: null,
		};

		render(
			<MemoryRouter>
				<AuthContext.Provider value={authContext}>
					<ThemeProvider>
						<CSSReset />
						<ForgotPassword />
					</ThemeProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		);
	});

	useProtectedRoute.mockReturnValue({});

	test('"Creat nueva cuenta" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /crear nueva cuenta/i });
		expect(link).toBeInTheDocument();
	});

	test('"Volver a inicio de sesión" link renders with the right values', () => {
		const link = screen.getByRole('link', { name: /volver a inicio de sesión/i });
		expect(link).toBeInTheDocument();
	});

	test('"Crear nueva cuenta" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /crear nueva cuenta/i });

		expect(link).toHaveAttribute('href', ROUTES.SINGUP);
	});

	test('"Volver a inicio de sesión" link points to the correct page', async () => {
		const link = screen.getByRole('link', { name: /volver a inicio de sesión/i });

		expect(link).toHaveAttribute('href', ROUTES.LOGIN);
	});

	test('email input render with the right values', () => {
		const emailInput = screen.getByLabelText(/email/i);

		expect(emailInput).toBeInTheDocument();

		expect(emailInput).toHaveValue('');
	});

	test('email input updates when entering text', () => {
		const emailInput = screen.getByLabelText(/email/i);

		const emailText = 'email@email.com';

		fireEvent.input(emailInput, { target: { value: emailText } });
		expect(emailInput).toHaveValue(emailText);
	});

	test('"Recuperar cuenta" button render', () => {
		const button = screen.getByLabelText(/recuperar cuenta/i);
		expect(button).toBeInTheDocument();
	});

	test('Recuperar cuenta button is disabled when empty input and active when value in inputs', () => {
		const button = screen.getByLabelText(/recuperar cuenta/i);

		expect(button).toHaveAttribute('aria-disabled', 'true');
		expect(button).toBeDisabled();

		const emailInput = screen.getByLabelText(/email/i);

		const emailText = 'email@email.com';

		fireEvent.input(emailInput, { target: { value: emailText } });

		expect(button).toHaveAttribute('aria-disabled', 'false');
		expect(button).not.toBeDisabled();
	});

	test('when submit, doPasswordReset is called', async () => {
		const promise = Promise.resolve();

		doPasswordReset.mockReturnValue(promise);

		const button = screen.getByLabelText(/recuperar cuenta/i);

		const emailInput = screen.getByLabelText(/email/i);

		const emailText = 'email@email.com';

		fireEvent.input(emailInput, { target: { value: emailText } });

		expect(doPasswordReset).toHaveBeenCalledTimes(0);

		fireEvent.click(button);

		await act(() => promise);

		expect(doPasswordReset).toHaveBeenCalledTimes(1);
		expect(doPasswordReset).toHaveBeenCalledWith(emailText);
	});

	test('error message renders', async () => {
		const errorMessages = {
			'auth/user-not-found': 'No existe una cuenta registrada con este correo electrónico.',
		};

		doPasswordReset.mockReturnValue(Promise.reject({ code: 'auth/user-not-found' }));

		const button = screen.getByLabelText(/recuperar cuenta/i);

		const emailInput = screen.getByLabelText(/email/i);

		const emailText = 'email@email.com';

		fireEvent.input(emailInput, { target: { value: emailText } });
		fireEvent.click(button);

		await act(() => Promise.resolve());

		expect(screen.getByText(errorMessages['auth/user-not-found'])).toBeInTheDocument();
	});
});
