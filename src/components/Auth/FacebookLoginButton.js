import React from 'react';
import { Button } from '@chakra-ui/core';
import { GrFacebookOption } from 'react-icons/gr';
import { doSignInWithFacebook, db } from '../../firebase/firebase';

const errorMessages = {
	'auth/account-exists-with-different-credential':
		'Ya existe una cuenta registrada con este correo electrónico. Intenta ingresar con Facebook o con tu correo electrónico y en configuración podrás vincular ambas cuentas.',
};

const FacebookLoginButton = ({ isLoading = false, setIsLoading, setError }) => {
	const handleSignIn = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const { user, additionalUserInfo } = await doSignInWithFacebook();

			if (additionalUserInfo.isNewUser) {
				let username = user.displayName.toLowerCase().trim().replace(/\s/g, '');

				const userisTaken = await db.collection('usernames').doc(username).get();

				if (userisTaken.exists) {
					username = `${username}${Math.floor(Math.random() * 10000)}`;
				}

				await Promise.all([
					await user.updateProfile({
						displayName: username,
					}),
					db.collection('users').doc(user.uid).set({
						email: user.email,
						username,
						firstName: additionalUserInfo.profile.first_name,
						lastName: additionalUserInfo.profile.last_name,
						photoURL: user.photoURL,
						roles: 'user', //TODO: make it an array of roles and modify the Firestore rules to accept them.
					}),
					db.collection('usernames').doc(username).set({
						uid: user.uid,
					}),
				]);
			}

			setIsLoading(false);
			setError(null);
		} catch (error) {
			setIsLoading(false);
			setError({ ...error, message: errorMessages[error.code] });
		}
	};

	return (
		<Button
			aria-label="ingresar con facebook"
			isLoading={isLoading}
			color="#fff"
			bg="#3b5998"
			_hover={{ bg: '#1f4287' }}
			my="1rem"
			onClick={handleSignIn}
		>
			<span style={{ position: 'absolute', left: '0.5rem' }}>
				<GrFacebookOption size={24} />
			</span>
			Ingresar con Facebook
		</Button>
	);
};

export default FacebookLoginButton;
