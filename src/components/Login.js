import React, { useState } from 'react';
import { Heading, Box, Stack, Link, Input, Button, Text } from '@chakra-ui/core';
import { GrFacebookOption } from 'react-icons/gr';

const dividerContainer = {
	display: 'flex',
	justifyItems: 'space-between',
	alignItems: 'center',
	marginTop: '0.5rem',
};

const dividerStyles = {
	height: '1px',
	backgroundColor: '#CBD5E0',
	width: '100%',
};

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (event, type) => {
		if (type === 'username') {
			setUsername(event.target.value);
		}

		if (type === 'password') {
			setPassword(event.target.value);
		}
	};

	const isInvalid = username === '' || password === '' || password.length < 4;

	return (
		<Box d="flex" alignItems="center" flexDirection="column" w="100%" py={10} px={10}>
			<Heading size="2xl" textAlign="center" mb="2rem">
				Solo<span style={{ color: '#3182CE' }}>Fans</span>
			</Heading>

			<Stack
				d="flex"
				bg="gray.50"
				border="1px"
				borderColor="gray.300"
				minW="400px"
				rounded="md"
				p="2rem"
				pb="1rem"
				spacing={3}
				maxWidth="30rem"
				mb="1rem"
			>
				<Input value={username} onChange={event => handleChange(event, 'username')} placeholder="Correo electrónico" />

				<Input
					value={password}
					onChange={event => handleChange(event, 'password')}
					type="password"
					placeholder="Contraseña"
				/>

				<Button
					isDisabled={isInvalid}
					isLoading={isLoading}
					aria-label="ingresar"
					variantColor="blue"
					type="submit"
					mt="1rem"
					onClick={() => setIsLoading(true)}
				>
					Ingresar
				</Button>

				{error && (
					<Text textAlign="center" color="red.500">
						{error.message}
					</Text>
				)}

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

				<Link to="#" textAlign="center" color="blue.500">
					Recuperar clave
				</Link>
			</Stack>

			<Stack
				d="flex"
				bg="gray.50"
				border="1px"
				borderColor="gray.300"
				minW="400px"
				rounded="md"
				p="1rem"
				spacing={3}
				maxWidth="30rem"
			>
				<Text textAlign="center">
					¿Aún no tienes una cuenta?{' '}
					<Link to="#" color="blue.500">
						<strong>Regístrate</strong>
					</Link>
				</Text>
			</Stack>
		</Box>
	);
};

export default Login;
