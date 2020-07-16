import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Link, Input, Button, Text } from '@chakra-ui/core';
import { GrFacebookOption } from 'react-icons/gr';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../GlobalState/AuthContext';

import * as ROUTES from '../../constants/routes';

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

const Login = () => {
	const { register, handleSubmit, errors, watch } = useForm();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const watchEmail = watch('email');
	const watchPassword = watch('password');

	const onSubmit = data => {
		console.log(data);
		setIsLoading(true);
	};

	const emailValidationRegex = /\S+@\S+\.\S+/;

	const isInvalid = !emailValidationRegex.test(watchEmail) || watchPassword === '' || watchPassword.length < 4;

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

				<Button aria-label="ingresar con facebook" color="#fff" bg="#3b5998" _hover={{ bg: '#1f4287' }} mt="1rem">
					<span style={{ position: 'absolute', left: '0.5rem' }}>
						<GrFacebookOption size={24} />
					</span>
					Ingresar con Facebook
				</Button>

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
