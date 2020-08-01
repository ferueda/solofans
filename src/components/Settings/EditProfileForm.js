import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Input, Button, Text, FormLabel, FormControl, Textarea } from '@chakra-ui/core';

import { AuthContext } from '../../GlobalState/AuthContext';
import { FirebaseContext } from '../../GlobalState/FirebaseContext';

import useProtectedRoute from '../../hooks/useProtectedRoute';

const EditProfileForm = () => {
	const { register, handleSubmit, watch } = useForm();

	const { user } = useContext(AuthContext);
	const firebase = useContext(FirebaseContext);

	useProtectedRoute();

	const watchEmail = watch('email');
	const watchFirstName = watch('firstName');
	const watchLastName = watch('lastName');
	const watchUsername = watch('username');
	const watchPassword = watch('password');

	const onSubmit = data => {
		console.log(data);
	};

	const formControlProps = {
		d: 'flex',
		flexDirection: { base: 'column', md: 'row' },
		alginItems: 'center',
		mb: '0.5rem',
	};

	const formLabelProps = {
		d: 'flex',
		alignItems: 'center',
	};

	return (
		<Box
			d="flex"
			alignItems="center"
			flexDirection="column"
			w="100%"
			py={{ base: 0, sm: 10 }}
			px={{ base: 0, sm: '10px' }}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack mt="1rem" width="100%">
					<FormControl {...formControlProps}>
						<FormLabel htmlFor="firstName" {...formLabelProps}>
							Nombre
						</FormLabel>
						<Input
							name="firstName"
							id="firstName"
							type="text"
							value={user.firstName}
							ref={register({ required: true })}
							borderColor="gray.300"
						/>
					</FormControl>

					<FormControl {...formControlProps}>
						<FormLabel htmlFor="lastName" {...formLabelProps}>
							Apellido
						</FormLabel>
						<Input
							name="lastName"
							id="lastName"
							type="text"
							value={user.lastName}
							ref={register({ required: true })}
							borderColor="gray.300"
						/>
					</FormControl>

					<FormControl {...formControlProps}>
						<FormLabel htmlFor="username" {...formLabelProps}>
							Nombre de usuario
						</FormLabel>
						<Input
							name="username"
							id="username"
							type="text"
							value={user.displayName}
							ref={register({ required: true })}
							borderColor="gray.300"
						/>
					</FormControl>

					<FormControl {...formControlProps}>
						<FormLabel htmlFor="bio" {...formLabelProps}>
							Bio
						</FormLabel>
						<Textarea name="bio" id="bio" type="text" ref={register()} borderColor="gray.300" />
					</FormControl>

					<Button aria-label="ingresar" variantColor="blue" type="submit" my="1rem">
						Guardar
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default EditProfileForm;
