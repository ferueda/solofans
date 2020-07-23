import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/core';
import { BsPlusSquare, BsHouse, BsSearch, BsChatDots, BsPeopleCircle } from 'react-icons/bs';

import * as ROUTES from '../../constants/routes';

const breakpoints = ['30em', '48em', '62em', '80em'];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const statusColor = {
	active: '#3182CE',
	notActive: '#000',
};

const Nav = () => {
	const { location } = useHistory();

	return (
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
		>
			<Box d="flex" alignItems="center" justifyContent="space-between" w="100%" h="100%">
				<Link as={RouterLink} to={ROUTES.HOME}>
					<BsHouse size={28} color={location.pathname === ROUTES.HOME ? statusColor.active : statusColor.notActive} />
				</Link>

				<Link as={RouterLink} to={ROUTES.BUSCAR}>
					<BsSearch
						size={28}
						color={location.pathname === ROUTES.BUSCAR ? statusColor.active : statusColor.notActive}
					/>
				</Link>

				<Link as={RouterLink} to={ROUTES.NEW_POST}>
					<BsPlusSquare
						size={28}
						color={location.pathname === ROUTES.NEW_POST ? statusColor.active : statusColor.notActive}
					/>
				</Link>

				<Link as={RouterLink} to="#">
					<BsChatDots size={28} color={statusColor.notActive} />
				</Link>

				<Link
					as={RouterLink}
					to={{
						pathname: location.pathname === ROUTES.ACCOUNT ? location.state.background.pathname : ROUTES.ACCOUNT,
						state: location.pathname === ROUTES.ACCOUNT ? null : { background: location },
					}}
				>
					<BsPeopleCircle
						size={28}
						color={location.pathname === ROUTES.ACCOUNT ? statusColor.active : statusColor.notActive}
					/>
				</Link>
			</Box>
		</Box>
	);
};

export default Nav;
