import React, { useState, useEffect, useCallback } from 'react';
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

import useUser from '../../hooks/useUser';
import { auth, authProviders } from '../../firebase/firebase';

const SIGN_IN_METHODS = [
	{
		id: 'password',
		provider: null,
	},
	{
		id: 'facebook.com',
		provider: 'facebookProviver',
	},
];

const DefaultLoginToggle = ({
	onlyOneLeft,
	isEnabled,
	method,
	onLink,
	onUnlink,
	isOpen,
	toggleModal,
	email,
	error,
	isLoading,
}) => {
	const { register, handleSubmit, watch } = useForm();

	const watchPassword = watch('password');

	const onSubmit = data => onLink(data.password);

	const isValid = watchPassword !== '' && watchPassword?.length >= 6;

	return isEnabled ? (
		<Button isLoading={isLoading} variantColor="green" onClick={() => onUnlink(method.id)} isDisabled={onlyOneLeft}>
			Desvincular {method.id}
		</Button>
	) : (
		<>
			<Button isLoading={isLoading} variantColor="red" onClick={toggleModal}>
				Vincular {method.id}
			</Button>

			<Modal isOpen={isOpen} onClose={toggleModal}>
				<ModalOverlay />
				<ModalContent borderRadius="md" py={2}>
					<ModalHeader>Vincular cuenta</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Stack>
								<Input
									name="email"
									type="email"
									value={email}
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
									aria-label="vincular"
									variantColor="green"
									mt="1rem"
								>
									Vincular
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

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, method, onLink, onUnlink, isLoading }) => {
	return isEnabled ? (
		<Button isLoading={isLoading} variantColor="green" onClick={() => onUnlink(method.id)} isDisabled={onlyOneLeft}>
			Desvincular {method.id}
		</Button>
	) : (
		<Button isLoading={isLoading} variantColor="red" onClick={() => onLink(method.provider)}>
			Vincular {method.id}
		</Button>
	);
};

const LoginManagement = () => {
	const [activeMethods, setActiveMethods] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const user = useUser();

	const fetchSignInMethods = useCallback(() => {
		setError(null);
		setIsLoading(true);

		return auth
			.fetchSignInMethodsForEmail(user?.email)
			.then(activeMethod => {
				setActiveMethods(activeMethod);
				setIsLoading(false);
				setError(null);
			})
			.catch(error => {
				setIsLoading(false);
				setError(error);
			});
	}, [user]);

	useEffect(() => {
		fetchSignInMethods();
	}, [fetchSignInMethods]);

	const onSocialLink = provider => {
		setIsLoading(true);
		setError(null);

		auth.currentUser
			.linkWithPopup(authProviders[provider])
			.then(({ user, additionalUserInfo }) => {
				if (!user.photoURL) {
					user.updateProfile({
						photoURL: additionalUserInfo.profile.picture.data.url,
					});
				}
			})
			.then(() => fetchSignInMethods())
			.catch(error => {
				setIsLoading(false);
				setError(error);
			});
	};

	const onSocialUnlink = providerId => {
		setIsLoading(true);
		setError(null);

		auth.currentUser
			.unlink(providerId)
			.then(() => fetchSignInMethods())
			.catch(error => {
				setIsLoading(false);
				setError(error);
			});
	};

	const onDefaultLoginLink = password => {
		setIsLoading(true);
		setError(null);

		const credential = authProviders.emailAuthProvider.credential(user.email, password);

		auth.currentUser
			.linkWithCredential(credential)
			.then(() => fetchSignInMethods())
			.catch(error => {
				setIsLoading(false);
				setError(error);
			});
	};

	return (
		<div>
			Sign in methods:
			<ul>
				{SIGN_IN_METHODS.map(method => {
					const isEnabled = activeMethods.includes(method.id);
					const onlyOneLeft = activeMethods.length === 1;

					return (
						<li key={method.id}>
							{method.id === 'password' ? (
								<DefaultLoginToggle
									onlyOneLeft={onlyOneLeft}
									isEnabled={isEnabled}
									method={method}
									onLink={onDefaultLoginLink}
									onUnlink={onSocialUnlink}
									isOpen={modalIsOpen}
									toggleModal={() => setModalIsOpen(current => !current)}
									email={user?.email}
									error={error}
									isLoading={isLoading}
								/>
							) : (
								<SocialLoginToggle
									onlyOneLeft={onlyOneLeft}
									isEnabled={isEnabled}
									method={method}
									onLink={onSocialLink}
									onUnlink={onSocialUnlink}
									isLoading={isLoading}
								/>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LoginManagement;
