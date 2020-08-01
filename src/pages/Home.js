import React from 'react';
import { Box, Skeleton } from '@chakra-ui/core';

import usePosts from '../hooks/usePosts';
import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';
import LogoHeader from '../components/shared/LogoHeader';
import Post from '../components/Post/Post';
import PostSkeleton from '../components/Skeletons/PostSkeleton';

const Home = () => {
	const { posts, isLoading, error } = usePosts();

	useProtectedRoute();

	return (
		<Box mb="4rem" d="flex" flexDir="column" alignItems="center" bg="#fafafa">
			<Nav />
			<LogoHeader />

			{posts.map(post => (
				<Post key={post.id} {...post.post} />
			))}

			{isLoading && <PostSkeleton />}
		</Box>
	);
};

export default Home;
