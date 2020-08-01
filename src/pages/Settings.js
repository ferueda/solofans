import React, { useContext, useState } from 'react';
import { Box, Divider, Text, Button, Stack } from '@chakra-ui/core';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { AuthContext } from '../GlobalState/AuthContext';

import Nav from '../components/shared/Nav';
import SectionHeader from '../components/shared/SectionHeader';
import AccountAvatar from '../components/shared/AccountAvatar';
import LoginManagement from '../components/Auth/LoginManagement';

import EditProfileForm from '../components/Settings/EditProfileForm';
import Menu from '../components/Settings/Menu';

const Settings = () => {
	useProtectedRoute();

	const [active, setActive] = useState('profile');

	const { user } = useContext(AuthContext);

	console.log(user);

	return (
		<Box d="flex" flexDir="column" alignItems="center" alignContent="center" width="100%" p="1rem" mb="4rem">
			<SectionHeader title="Configuración" />
			<Menu setActive={setActive} active={active} />

			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			{active === 'profile' ? (
				<>
					<Box d="flex" alignItems="center" py="1rem">
						<AccountAvatar src={user.photoURL} size="md" />
						<Box ml="1rem" d="flex" flexDir="column" justifyItems="center">
							<Text as="h2" fontSize="lg" fontWeight="500" mb="-0.25rem">
								{user.displayName}
							</Text>
							<Button variant="link" variantColor="blue">
								Cambiar foto de perfil
							</Button>
						</Box>
					</Box>

					<EditProfileForm />
				</>
			) : null}

			{active === 'social' ? <LoginManagement /> : null}

			<Nav />
		</Box>
	);
};

export default Settings;
