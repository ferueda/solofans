import React from 'react';
import { Box, Image, Text } from '@chakra-ui/core';

const PostBody = ({ src, username, date, caption }) => {
	return (
		<Box d="flex" flexDir="column" alignItems="stretch" justifyItems="stretch" maxW="600px">
			<Box px="1rem" pb="1rem" width="100%">
				<Text>{caption}</Text>
			</Box>
			<Image src={src} alt={`Foto de ${username} subida el ${date}`}></Image>
		</Box>
	);
};

export default PostBody;
