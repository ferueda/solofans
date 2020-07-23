import React, { useContext } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Box } from '@chakra-ui/core';

import { AuthContext } from '../../GlobalState/AuthContext';

import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

const Post = ({ caption, photoUrl, createdAt, tips, likesCount, username }) => {
	const { user } = useContext(AuthContext);

	const time = moment(createdAt).locale('es').fromNow();

	if (!user) return null;

	console.log(user);

	return (
		<Box
			as="article"
			d="flex"
			flexDir="column"
			alignItems="center"
			maxW="600px"
			my="1rem"
			border={{ base: 'none', sm: '1px' }}
			borderColor={{ base: '#fff', sm: 'gray.300' }}
			borderRadius="3px"
			bg={{ base: '#fafafa', sm: '#fff' }}
		>
			<PostHeader username={username} />
			<PostBody src={photoUrl} user={user} caption={caption} />
			<PostFooter meta={{ likesCount, tips, time }} />
		</Box>
	);
};

export default Post;
