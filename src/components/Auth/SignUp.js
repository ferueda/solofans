import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Stack, Link, Input, Button, Text } from '@chakra-ui/core';
import { GrFacebookOption } from 'react-icons/gr';

import * as ROUTES from '../../constants/routes';

import LogoMain from '../shared/LogoMain';

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

const SignUp = () => {
	const { register, handleSubmit, errors, watch } = useForm();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const watchEmail = watch('email');
	const watchFirstName = watch('firstName');
	const watchLastName = watch('lastName');
	const watchUsername = watch('username');
	const watchPassword = watch('password');

	const onSubmit = data => {
		setIsLoading(true);
		console.log(data);
	};

	const emailValidationRegex = /\S+@\S+\.\S+/;

	const isInvalid =
		!emailValidationRegex.test(watchEmail) ||
		watchPassword === '' ||
		watchPassword.length < 4 ||
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

				<Button aria-label="ingresar con facebook" color="#fff" bg="#3b5998" _hover={{ bg: '#1f4287' }}>
					<span style={{ position: 'absolute', left: '0.5rem' }}>
						<GrFacebookOption size={24} />
					</span>
					Ingresar con Facebook
				</Button>

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
						<Input
							name="email"
							type="email"
							placeholder="Correo electrónico"
							ref={register({ required: true })}
							borderColor="gray.300"
						/>

						<Stack isInline>
							<Input
								name="firstName"
								type="text"
								placeholder="Nombre"
								ref={register({ required: true })}
								borderColor="gray.300"
							/>

							<Input
								name="lastName"
								type="text"
								placeholder="Apellido"
								ref={register({ required: true })}
								borderColor="gray.300"
							/>
						</Stack>

						{/* TODO: VALIDATE IF USERNAME IS TAKEN AND DISPLAY ERROR AT THE BOTTOM IF IT IS */}
						<Input
							name="username"
							type="text"
							placeholder="Nombre de usuario"
							ref={register({ required: true })}
							borderColor="gray.300"
						/>

						<Input
							name="password"
							type="password"
							placeholder="Contraseña"
							ref={register({ required: true, minLength: 4 })}
							borderColor="gray.300"
						/>

						<Button
							isDisabled={isInvalid}
							isLoading={isLoading}
							aria-label="ingresar"
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
							<Text textAlign="center" color="red.500">
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
