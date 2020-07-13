import React, { useState } from 'react';
import { Heading, Box, Stack, Link, Input, Button, Text } from '@chakra-ui/core';

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

	const handleChange = (event, type) => {
		if (type === 'username') {
			setUsername(event.target.value);
		}

		if (type === 'password') {
			setPassword(event.target.value);
		}
	};

	return (
		<Box d="flex" alignItems="center" flexDirection="column" w="100%" py={10} px={10}>
			<Heading size="2xl" textAlign="center" mb="2rem">
				Desbloqueame
			</Heading>
			<Stack
				d="flex"
				bg="gray.50"
				border="1px"
				borderColor="gray.100"
				minW="400px"
				rounded="md"
				p="2rem"
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
					isDisabled={username === '' || password === ''}
					aria-label="ingresar"
					variantColor="blue"
					type="submit"
					mt="1rem"
				>
					Ingresar
				</Button>
				<div style={dividerContainer}>
					<div style={{ ...dividerStyles, marginRight: '1rem' }}></div>
					<Text fontWeight="500" color="gray.400">
						O
					</Text>
					<div style={{ ...dividerStyles, marginLeft: '1rem' }}></div>
				</div>
			</Stack>
			<Stack
				d="flex"
				bg="gray.50"
				border="1px"
				borderColor="gray.100"
				minW="400px"
				rounded="md"
				p="1rem"
				spacing={3}
				maxWidth="30rem"
			>
				<Text textAlign="center">
					¿Aun no tienes una cuenta?{' '}
					<Link color="blue.500">
						<strong>Regístrate</strong>
					</Link>
				</Text>
			</Stack>
		</Box>
	);
};

export default Login;
