import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Box } from '@chakra-ui/core';

import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostBodyMultiple from './PostBodyMultiple';

const Post = ({ caption, photos, createdAt, user }) => {
	const time = moment(createdAt).locale('es').fromNow();

	return (
		<Box
			as="article"
			d="flex"
			flexDir="column"
			alignItems="center"
			maxW="602px"
			my="1rem"
			border={{ base: 'none', sm: '1px' }}
			borderColor={{ base: '#fff', sm: 'gray.300' }}
			borderRadius="3px"
			bg={{ base: '#fafafa', sm: '#fff' }}
		>
			<PostHeader user={user} />

			{photos.length === 1 ? (
				<PostBody src={photos[0]} date={createdAt} username={user.username} caption={caption} />
			) : (
				<PostBodyMultiple photos={photos} date={createdAt} username={user.username} caption={caption} />
			)}

			{/* <PostFooter meta={{ time }} /> */}
		</Box>
	);
};

export default Post;
