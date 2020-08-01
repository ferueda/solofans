import React, { useContext } from 'react';
import { Box, Divider, Stack, Text, PseudoBox } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { BsPerson, BsGear, BsBoxArrowInLeft, BsCreditCard } from 'react-icons/bs';

import { FirebaseContext } from '../../GlobalState/FirebaseContext';
import { AuthContext } from '../../GlobalState/AuthContext';

import * as ROUTES from '../../constants/routes';

import AccountAvatar from '../shared/AccountAvatar';
import SidebarMenuItem from './SidebarMenuItem';

const iconProps = {
	color: '#000',
	size: 28,
};

const AccountSidebar = () => {
	const { user } = useContext(AuthContext);
	const firebase = useContext(FirebaseContext);
	const history = useHistory();

	const handleLogOut = () => {
		firebase.doSignOut().then(() => {
			history.push(ROUTES.LOGIN);
		});
	};

	return (
		<Box pos="fixed" top="0" right="0" bottom="0" bg="white" w="40%" minW="14rem" maxW="20rem" px={4} py={4} zIndex={1}>
			<Stack spacing={1} mb="1rem">
				<Box>
					<AccountAvatar src={user.photoURL} size="md" />
				</Box>
				<Text mt="0.5rem" fontWeight="500">
					{`${user.firstName} ${user.lastName}`}
				</Text>
				<Text color="gray.500">@{user.displayName}</Text>
			</Stack>

			<Divider borderColor="gray.200" my=".5rem" />

			<Box>
				<Box>
					<SidebarMenuItem to="#" label="Mi Perfil">
						<BsPerson size={iconProps.size} color={iconProps.color} />
					</SidebarMenuItem>
				</Box>
				<Box>
					<SidebarMenuItem to="#" label="Datos Bancarios">
						<BsCreditCard size={iconProps.size} color={iconProps.color} />
					</SidebarMenuItem>
				</Box>
				<Box>
					<SidebarMenuItem to={ROUTES.SETTINGS} label="Configuración">
						<BsGear size={iconProps.size} color={iconProps.color} />
					</SidebarMenuItem>
				</Box>
			</Box>

			<Divider borderColor="gray.200" my="0.5rem" />

			<PseudoBox
				d="flex"
				as="button"
				outline="none"
				borderRadius="3px"
				p="0.5rem"
				w="100%"
				_hover={{ bg: 'gray.50' }}
				onClick={handleLogOut}
			>
				<BsBoxArrowInLeft size={iconProps.size} color={iconProps.color} />
				<Box ml="0.5rem" textAlign="left">
					Salir
				</Box>
			</PseudoBox>
		</Box>
	);
};

export default AccountSidebar;
