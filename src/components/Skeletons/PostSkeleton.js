import React from 'react';
import { Box, Skeleton } from '@chakra-ui/core';

const HeaderSkeleton = () => {
	return (
		<Box mx="1rem" w="100%" maxW="600px" p="1rem">
			<Box d="flex">
				<Skeleton width="48px" height="48px" borderRadius="9999px" />
				<Box d="flex" ml="1rem">
					<Box d="flex" flexDir="column" justifyItems="center" justifyContent="center">
						<Skeleton width="9rem" height="1rem" mb="0.5rem" />
						<Skeleton width="5rem" height="1rem" />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const BodySkeleton = () => {
	return (
		<Box d="flex" flexDir="column" maxW="600px" width="100%">
			<Skeleton h="1rem" mx="1rem" mb="1rem" width="6rem" />
			<Box width="100%">
				<Skeleton>
					<Box px="1rem" pb="1rem" minWidth="300px" h={{ base: '400px', sm: '450px', md: '500px', lg: '600px' }}></Box>
				</Skeleton>
			</Box>
		</Box>
	);
};

const PostSkeleton = () => {
	return (
		<Box
			d="flex"
			flexDir="column"
			alignItems="center"
			maxW="602px"
			width="100%"
			my="1rem"
			border={{ base: 'none', sm: '1px' }}
			borderColor={{ base: '#fff', sm: 'gray.300' }}
			borderRadius="3px"
			bg={{ base: '#fafafa', sm: '#fff' }}
		>
			<HeaderSkeleton />
			<BodySkeleton />
		</Box>
	);
};

export default PostSkeleton;
