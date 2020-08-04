import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Stack, Link, Input, Button, Text, FormControl } from '@chakra-ui/core';

import * as ROUTES from '../../constants/routes';
import { capitalizeWord } from '../../utils/helpers';
import { db, doCreateUserWithEmailAndPassword, doSendEmailVerification } from '../../firebase/firebase';
import useProtectedRoute from '../../hooks/useProtectedRoute';

import LogoMain from '../shared/LogoMain';
import FacebookLoginButton from './FacebookLoginButton';

const dividerContainer = {
	display: 'flex',
	justifyItems: 'space-between',
	alignItems: 'center',
	marginTop: '0.5rem',
	marginBottom: '0.5rem',
};

const dividerStyles = {
	height: '1px',
	backgroundColor: '#CBD5E0',
	width: '100%',
};

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
	'auth/email-already-in-use': 'Ya existe una cuenta creada con este correo electrónico.',
	'auth/username-already-in-use': 'El nombre de usuario no se encuentra disponible. Por favor inténtalo con otro.',
	'auth/account-exists-with-different-credential':
		'Ya existe una cuenta registrada con este correo electrónico. Intenta ingresar con Facebook o con tu correo electrónico y en configuración podrás vincular ambas cuentas.',
};

const SignUp = () => {
	const { register, handleSubmit, watch } = useForm();

	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useProtectedRoute(isLoading);

	const watchEmail = watch('email');
	const watchFirstName = watch('firstName');
	const watchLastName = watch('lastName');
	const watchUsername = watch('username');
	const watchPassword = watch('password');

	const onSubmit = async data => {
		setIsLoading(true);
		setError(null);

		let { email, password, username, firstName, lastName } = data;

		username = username.toLowerCase();
		firstName = capitalizeWord(firstName);
		lastName = capitalizeWord(lastName);

		const userisTaken = await db.collection('usernames').doc(username).get();

		if (userisTaken.exists) {
			setIsLoading(false);
			setError({ code: 'auth/username-already-in-use', message: errorMessages['auth/username-already-in-use'] });
		} else {
			try {
				const { user } = await doCreateUserWithEmailAndPassword(email, password);

				await Promise.all([
					user.updateProfile({
						displayName: username,
					}),
					db.collection('users').doc(user.uid).set({
						email: user.email,
						username,
						firstName,
						lastName,
						photoURL: user.photoURL,
						roles: 'user', //TODO: make it an array of roles and modify the Firestore rules to accept them.
					}),
					db.collection('usernames').doc(username).set({
						uid: user.uid,
					}),
					db.collection('followers').doc(user.uid).set({
						totalFollowers: 0,
						lastPost: null,
						recentPosts: [],
						followers: [],
					}),
					doSendEmailVerification(),
				]);

				setIsLoading(false);
				setError(null);
				history.push(ROUTES.HOME);
			} catch (error) {
				setIsLoading(false);
				setError({ ...error, message: errorMessages[error.code] });
			}
		}
	};

	const emailValidationRegex = /\S+@\S+\.\S+/;

	const isInvalid =
		!emailValidationRegex.test(watchEmail) ||
		watchPassword === '' ||
		watchPassword.length < 6 ||
		watchFirstName === '' ||
		watchLastName === '' ||
		watchUsername === '';

	return (
		<Box
			d="flex"
			alignItems="center"
			flexDirection="column"
			w="100%"
			h="100vh"
			py={{ base: 0, sm: 10 }}
			px={{ base: 0, sm: '10px' }}
		>
			<Stack {...stackCommonProps}>
				<LogoMain />

				<Text as="h3" fontSize="md" textAlign="center">
					Regístrate para interactuar con tus fans e influencers favoritos!
				</Text>

				<FacebookLoginButton isLoading={isLoading} setIsLoading={setIsLoading} setError={setError} />

				<div style={dividerContainer}>
					<div style={{ ...dividerStyles, marginRight: '1rem' }}></div>
					<Text fontWeight="500" color="gray.400">
						O
					</Text>
					<div style={{ ...dividerStyles, marginLeft: '1rem' }}></div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack mt="1rem">
						{/* TODO: VALIDATE IF EMAIL IS TAKEN AND DISPLAY ERROR AT THE BOTTOM IF IT IS */}

						<FormControl>
							<Input
								aria-label="email"
								name="email"
								type="email"
								placeholder="Correo electrónico"
								ref={register({ required: true })}
								borderColor="gray.300"
							/>
						</FormControl>

						<Stack isInline>
							<FormControl>
								<Input
									aria-label="nombre"
									name="firstName"
									type="text"
									placeholder="Nombre"
									ref={register({ required: true })}
									borderColor="gray.300"
								/>
							</FormControl>
							<FormControl>
								<Input
									aria-label="apellido"
									name="lastName"
									type="text"
									placeholder="Apellido"
									ref={register({ required: true })}
									borderColor="gray.300"
								/>
							</FormControl>
						</Stack>

						{/* TODO: VALIDATE IF USERNAME IS TAKEN AND DISPLAY ERROR AT THE BOTTOM IF IT IS */}
						<FormControl>
							<Input
								aria-label="nombre de usuario"
								name="username"
								type="text"
								placeholder="Nombre de usuario"
								ref={register({ required: true })}
								borderColor="gray.300"
							/>
						</FormControl>
						<FormControl>
							<Input
								aria-label="contraseña"
								name="password"
								type="password"
								placeholder="Contraseña"
								ref={register({ required: true, minLength: 4 })}
								borderColor="gray.300"
							/>
						</FormControl>

						<Button
							isDisabled={isInvalid}
							isLoading={isLoading}
							aria-label="crear cuenta"
							variantColor="blue"
							type="submit"
							my="1rem"
						>
							Crear cuenta
						</Button>

						{/* TODO: ADD ERROR MESSAGE TAILORED FOR WHEN THE USER TRIES TO LOG IN WITH EMAIL AND HE REGISTERED WITH FACEBOOK OR VICEVERSA
						EXAMPLE:
						An account with an E-Mail address to this social account already exists. Try to login from this account instead and  social accounts on your personal account page.
						*/}

						{error && (
							<Text fontSize="sm" textAlign="center" color="red.500" d="inline">
								{error.message}
							</Text>
						)}
					</Stack>
				</form>

				<Text fontSize="xs" textAlign="center">
					Al registrarte aceptas nuestros <Link fontWeight="500">Términos de Servicio</Link> y{' '}
					<Link fontWeight="500">Política de Privacidad</Link>
				</Text>
			</Stack>

			<Stack {...stackCommonProps}>
				<Text textAlign="center">
					¿Ya tienes una cuenta?{' '}
					<Link as={RouterLink} to={ROUTES.LOGIN} color="blue.500">
						<strong>Ingresa aquí</strong>
					</Link>
				</Text>
			</Stack>
		</Box>
	);
};

export default SignUp;
