import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import { BsThreeDots } from 'react-icons/bs';

import AccountAvatar from '../shared/AccountAvatar';

const PostHeader = ({ user }) => {
	const { username, firstName, lastName, photoURL } = user;
	return (
		<Box as="header" mx="1rem" w="100%" maxW="600px" p="1rem">
			<Box d="flex">
				<Link href={`/${username}`}>
					<AccountAvatar size="md" src={photoURL} />
				</Link>
				<Box d="flex" w="100%" justifyContent="space-between" ml="1rem">
					<Box d="flex" flexDir="column">
						<Box fontWeight="500">{`${firstName} ${lastName}`}</Box>
						<Link href={`/${username}`}> @{username}</Link>
					</Box>
					<Box>
						<Box
							as="button"
							outline="none"
							height="100%"
							d="flex"
							alignItems="center"
							onClick={() => console.log('clicked')}
						>
							<BsThreeDots size={20} />
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default PostHeader;
