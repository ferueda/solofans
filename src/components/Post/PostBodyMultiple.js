import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Image, Text } from '@chakra-ui/core';

const PostBodyMultiple = ({ photos, username, date, caption }) => {
	return (
		<Box d="flex" flexDir="column" alignItems="stretch" justifyItems="stretch" maxW="600px" overflowX="hidden">
			<Box d="flex" flexWrap="wrap" px="1rem" pb="1rem" width="100%">
				<Text wordBreak="break-word">{caption}</Text>
			</Box>
			<Box pos="relative">
				<Carousel showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
					{photos.map(photo => (
						<Image objectFit="contain" key={photo} src={photo} alt={`foto de ${username} subida el ${date}`} />
					))}
				</Carousel>
			</Box>
		</Box>
	);
};

export default PostBodyMultiple;
