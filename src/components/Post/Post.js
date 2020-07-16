import React from 'react';
import { Box, Link, Avatar, Stack, Text } from '@chakra-ui/core';

const PostHeader = () => {
	return (
		<Box mx="1rem">
			<Stack isInline spacing="4">
				<Avatar size="md" src="https://bit.ly/dan-abramov" />
				<Stack>
					<div>
						<Text fontWeight="500"> Dan Abramov</Text>
					</div>
					<div>@danAbramov</div>
				</Stack>
			</Stack>
		</Box>
	);
};

const Post = () => {
	return (
		<Box my="1rem">
			<PostHeader />
		</Box>
	);
};

export default Post;
