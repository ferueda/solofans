import React from 'react';
import { Box } from '@chakra-ui/core';

import usePosts from '../hooks/usePosts';
import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';
import LogoHeader from '../components/shared/LogoHeader';
import Post from '../components/Post/Post';

const Home = () => {
	const { posts } = usePosts();

	useProtectedRoute();

	console.log(posts);

	return (
		<Box mb="4rem" d="flex" flexDir="column" alignItems="center" bg="#fafafa">
			<LogoHeader />

			{posts.map(post => (
				<Post key={post.id} {...post.post} />
			))}

			<Nav />
		</Box>
	);
};

export default Home;
