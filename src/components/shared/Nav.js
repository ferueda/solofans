import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/core';
import { BsPlusSquare, BsHouse, BsSearch, BsChatDots, BsPeopleCircle } from 'react-icons/bs';

import * as ROUTES from '../../constants/routes';

import useLocationBlocker from '../../hooks/useLocationBlocker';

import AccountSidebar from '../Account/AccountSidebar';

const statusColor = {
	active: '#3182CE',
	notActive: '#000',
};

const Nav = () => {
	const [isModal, setIsModal] = useState(false);

	const { location } = useHistory();

	useLocationBlocker();

	return (
		<React.Fragment>
			<Box
				as="nav"
				pos="fixed"
				width="100%"
				bottom="0"
				left="0"
				d="flex"
				alignContent="center"
				py="1rem"
				px="1.5rem"
				borderTop="1px"
				borderColor="gray.300"
				bg="white"
				zIndex={2}
			>
				<Box d="flex" alignItems="center" justifyContent="space-between" w="100%" h="100%">
					<Link _focus="none" as={RouterLink} to={ROUTES.HOME}>
						<BsHouse size={28} color={location.pathname === ROUTES.HOME ? statusColor.active : statusColor.notActive} />
					</Link>

					<Link _focus="none" as={RouterLink} to={ROUTES.BUSCAR}>
						<BsSearch
							size={28}
							color={location.pathname === ROUTES.BUSCAR ? statusColor.active : statusColor.notActive}
						/>
					</Link>

					<Link _focus="none" as={RouterLink} to={ROUTES.NEW_POST}>
						<BsPlusSquare
							size={28}
							color={location.pathname === ROUTES.NEW_POST ? statusColor.active : statusColor.notActive}
						/>
					</Link>

					<Link _focus="none" as={RouterLink} to="#">
						<BsChatDots size={28} color={statusColor.notActive} />
					</Link>

					<Box as="button" outline="none" onClick={() => setIsModal(state => !state)}>
						<BsPeopleCircle size={28} color={isModal ? statusColor.active : statusColor.notActive} />
					</Box>
				</Box>
			</Box>

			{isModal && (
				<React.Fragment>
					<Box
						pos="fixed"
						top="0"
						right="0"
						bottom="0"
						left="0"
						backgroundColor="rgba(0, 0, 0, 0.15)"
						onClick={() => setIsModal(false)}
					></Box>
					<AccountSidebar />
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Nav;
