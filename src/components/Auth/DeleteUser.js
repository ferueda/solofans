import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Button,
	Input,
	Stack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalCloseButton,
	Text,
} from '@chakra-ui/core';

import * as ROUTES from '../../constants/routes';
import { authProviders, db } from '../../firebase/firebase';
import useUser from '../../hooks/useUser';

const errorMessages = {
	'auth/wrong-password': 'Contraseña incorrecta o cuenta sin contraseña registrada.',
};

const DeleteUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const user = useUser();
	const history = useHistory();

	const { register, handleSubmit, watch } = useForm();

	const watchPassword = watch('password');

	const onSubmit = data => {
		setIsLoading(true);
		setError(null);

		const credential = authProviders.emailAuthProvider.credential(user.email, data.password);

		user
			.reauthenticateWithCredential(credential)
			.then(({ user }) => user.delete())
			.then(() => {
				return Promise.all([
					db.collection('usernames').doc(user.displayName).delete(),
					db.collection('users').doc(user.uid).delete(),
				]);
			})
			.then(() => {
				setIsLoading(false);
				setError(null);
				history.push(ROUTES.LOGIN);
			})
			.catch(error => {
				setIsLoading(false);
				setError({ ...error, message: errorMessages[error.code] });
			});
	};

	const isValid = watchPassword !== '' && watchPassword?.length >= 6;

	return (
		<>
			<Button variantColor="red" onClick={() => setModalIsOpen(true)}>
				Borrar cuenta
			</Button>

			<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
				<ModalOverlay />
				<ModalContent borderRadius="md" py={2}>
					<ModalHeader>Borrar cuenta</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Stack>
								<Input
									name="email"
									type="email"
									value={user?.email}
									borderColor="gray.300"
									isDisabled={true}
									isReadOnly={true}
								/>
								<Input
									name="password"
									type="password"
									ref={register({ required: true })}
									placeholder="Contraseña"
									borderColor="gray.300"
								/>
								<Button
									isLoading={isLoading}
									isDisabled={!isValid}
									type="submit"
									aria-label="borrar"
									variantColor="red"
									mt="1rem"
								>
									Borrar
								</Button>

								{error && (
									<Text fontSize="sm" textAlign="center" color="red.500" d="inline">
										{error.message}
									</Text>
								)}
							</Stack>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteUser;
