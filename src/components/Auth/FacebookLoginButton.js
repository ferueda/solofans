import React, { useContext } from 'react';
import { Button } from '@chakra-ui/core';
import { GrFacebookOption } from 'react-icons/gr';

import { FirebaseContext } from '../../GlobalState/FirebaseContext';

const FacebookLoginButton = () => {
	const firebase = useContext(FirebaseContext);

	return (
		<Button
			aria-label="ingresar con facebook"
			color="#fff"
			bg="#3b5998"
			_hover={{ bg: '#1f4287' }}
			my="1rem"
			onClick={firebase.doSignInWithFacebook}
		>
			<span style={{ position: 'absolute', left: '0.5rem' }}>
				<GrFacebookOption size={24} />
			</span>
			Ingresar con Facebook
		</Button>
	);
};

export default FacebookLoginButton;
