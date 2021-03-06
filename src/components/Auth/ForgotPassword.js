import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Link, Input, Button, Text } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import * as ROUTES from '../../constants/routes';
import { doPasswordReset } from '../../firebase/firebase';

import useProtectedRoute from '../../hooks/useProtectedRoute';

import LogoMain from '../shared/LogoMain';

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

const EmailSent = () => {
	return (
		<Box d="flex" alignItems="center" flexDirection="column" w="100%" h="100vh" py={10} px={{ base: 0, sm: '10px' }}>
			<Stack {...stackCommonProps}>
				<LogoMain />

				<Text fontWeight="500" fontSize="md" textAlign="center" mt="0.5rem">
					Link enviado!
				</Text>

				<Text fontSize="md" textAlign="center" color="gray.600">
					Ahora ingresa tu correo electrónico y sigue las instrucciones para recuperar el acceso a tu cuenta.
				</Text>
			</Stack>

			<Stack {...stackCommonProps}>
				<Text textAlign="center">
					<Link as={RouterLink} to={ROUTES.LOGIN} color="blue.500">
						Volver a inicio de sesión
					</Link>
				</Text>
			</Stack>
		</Box>
	);
};

const ForgotPassword = () => {
	const { register, handleSubmit, errors, watch } = useForm();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [emailSent, setEmailSent] = useState(false);

	useProtectedRoute(isLoading);

	const watchEmail = watch('email');

	const onSubmit = data => {
		setIsLoading(true);
		setError(null);

		const { email } = data;

		doPasswordReset(email)
			.then(() => {
				setIsLoading(false);
				setError(null);
				setEmailSent(true);
			})
			.catch(error => {
				setIsLoading(false);
				setEmailSent(false);
				setError(error);
			});
	};

	const emailValidationRegex = /\S+@\S+\.\S+/;

	const isInvalid = !emailValidationRegex.test(watchEmail);

	if (emailSent) {
		return <EmailSent />;
	}

	return (
		<Box d="flex" alignItems="center" flexDirection="column" w="100%" h="100vh" py={10} px={{ base: 0, sm: '10px' }}>
			<Stack {...stackCommonProps}>
				<LogoMain />

				<Text fontWeight="500" fontSize="md" textAlign="center" mt="0.5rem">
					¿Tienes problemas para ingresar a tu cuenta?
				</Text>

				<Text fontSize="md" textAlign="center" color="gray.600">
					Ingresa tu correo electrónico y te enviaremos un link para recuperar el acceso a tu cuenta.
				</Text>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack>
						<Input
							aria-label="email"
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

						<Button
							isDisabled={isInvalid}
							isLoading={isLoading}
							type="submit"
							aria-label="recuperar cuenta"
							variantColor="blue"
							mt="1rem"
						>
							Recuperar cuenta
						</Button>

						{error && (
							<Text fontSize="sm" textAlign="center" color="red.500" d="inline">
								{error.code === 'auth/user-not-found'
									? 'No existe una cuenta registrada con este correo electrónico.'
									: 'Ocurrió un error, favor intenta nuevamente.'}
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

				<Text textAlign="center" color="blue.500" fontWeight="500" my="1rem">
					<Link as={RouterLink} to={ROUTES.SINGUP}>
						Crear nueva cuenta
					</Link>
				</Text>
			</Stack>

			<Stack {...stackCommonProps}>
				<Text textAlign="center">
					<Link as={RouterLink} to={ROUTES.LOGIN} color="blue.500">
						Volver a inicio de sesión
					</Link>
				</Text>
			</Stack>
		</Box>
	);
};

export default ForgotPassword;
