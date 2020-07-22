import React, { useState, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Box, Stack, Link, Input, Button, Text } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import * as ROUTES from '../../constants/routes';

import { AuthContext } from '../../GlobalState/AuthContext';
import { FirebaseContext } from '../../GlobalState/FirebaseContext';
import useProtectedRoute from '../../hooks/useProtectedRoute';

import LogoMain from '../shared/LogoMain';
import FacebookLoginButton from './FacebookLoginButton';

const dividerContainer = {
	display: 'flex',
	justifyItems: 'space-between',
	alignItems: 'center',
	marginTop: '1rem',
};

const dividerStyles = {
	height: '1px',
	backgroundColor: '#CBD5E0',
	width: '100%',
};

const breakpoints = ['30em', '48em', '62em', '80em'];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const stackCommonProps = {
	d: 'flex',
	bg: { base: '#fff', sm: 'gray.50' },
	border: '1px',
	borderColor: { base: '#fff', sm: 'gray.300' },
	width: { base: '100%', sm: '400px' },
	minW: '19rem',
	rounded: 'md',
	py: '1rem',
	px: '2rem',
	spacing: 3,
	maxWidth: '30rem',
	mb: '1rem',
};

const errorMessages = {
	'auth/user-not-found':
		'El correo electrónico ingresado no está registrado. Comprueba el correo y vuelve a intentarlo.',
	'auth/wrong-password': 'El correo electrónico y la contraseña no coinciden.',
	'auth/account-exists-with-different-credential':
		'Ya existe una cuenta registrada con este correo electrónico. Intenta ingresar con Facebook o con tu correo electrónico y en configuración podrás vincular ambas cuentas.',
};

const Login = () => {
	const { register, handleSubmit, errors, watch } = useForm();

	const firebase = useContext(FirebaseContext);
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useProtectedRoute(isLoading);

	const watchEmail = watch('email');
	const watchPassword = watch('password');

	const onSubmit = data => {
		const { email, password } = data;

		setIsLoading(true);
		setError(null);

		firebase
			.doSignInUserWithEmailAndPassword(email, password)
			.then(() => {
				setIsLoading(false);
				setError(false);
				history.push(ROUTES.HOME);
			})
			.catch(error => {
				setIsLoading(false);
				setError({ ...error, message: errorMessages[error.code] });
			});
	};

	const emailValidationRegex = /\S+@\S+\.\S+/;

	const isInvalid = !emailValidationRegex.test(watchEmail) || watchPassword === '' || watchPassword.length < 6;

	console.log(error);

	return (
		<Box d="flex" alignItems="center" flexDirection="column" w="100%" h="100vh" py={10} px={{ base: 0, sm: '10px' }}>
			<Stack {...stackCommonProps}>
				<LogoMain />

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack>
						<Input
							name="email"
							type="email"
							placeholder="Correo electrónico"
							ref={register({
								required: {
									value: true,
									message: 'Debes ingresar tu correo electrónico',
								},
								pattern: {
									value: emailValidationRegex,
									message: 'Debes ingresar un correo electrónico válido',
								},
							})}
							mt="1rem"
							borderColor="gray.300"
						/>

						{errors.email && (
							<Text fontSize="sm" color="red.500">
								{errors.email.message}
							</Text>
						)}

						<Input
							name="password"
							type="password"
							ref={register({ required: true })}
							placeholder="Contraseña"
							borderColor="gray.300"
						/>

						{errors.password && (
							<Text fontSize="sm" color="red.500">
								Debes ingresar tu contraseña
							</Text>
						)}

						<Button
							isDisabled={isInvalid}
							isLoading={isLoading}
							type="submit"
							aria-label="ingresar"
							variantColor="blue"
							mt="1rem"
						>
							Ingresar
						</Button>

						{error && (
							<Text fontSize="sm" textAlign="center" color="red.500" d="inline">
								{error.message}
							</Text>
						)}
					</Stack>
				</form>

				<div style={dividerContainer}>
					<div style={{ ...dividerStyles, marginRight: '1rem' }}></div>

					<Text fontWeight="500" color="gray.400">
						O
					</Text>

					<div style={{ ...dividerStyles, marginLeft: '1rem' }}></div>
				</div>

				<FacebookLoginButton isLoading={isLoading} setIsLoading={setIsLoading} setError={setError} />

				<Text textAlign="center" color="blue.500">
					<Link as={RouterLink} to={ROUTES.FORGOT_PASSWORD}>
						Recuperar clave
					</Link>
				</Text>
			</Stack>

			<Stack {...stackCommonProps}>
				<Text textAlign="center">
					¿Aún no tienes una cuenta?{' '}
					<Link as={RouterLink} to={ROUTES.SINGUP} color="blue.500">
						<strong>Regístrate</strong>
					</Link>
				</Text>
			</Stack>
		</Box>
	);
};

export default Login;
