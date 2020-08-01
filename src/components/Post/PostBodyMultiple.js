import React, { useState } from 'react';
import { Box, Image, Text, PseudoBox } from '@chakra-ui/core';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const iconProps = {
	size: 15,
	fill: 'white',
};

const pseudoBoxProps = {
	as: 'button',
	outline: 'none',
	bg: 'rgba(205,201,196,0.35)',
	borderRadius: '9999px',
	padding: '0.2rem',
};

const PostBodyMultiple = ({ photos, username, date, caption }) => {
	const [position, setPosition] = useState(0);

	return (
		<Box d="flex" flexDir="column" alignItems="stretch" justifyItems="stretch" maxW="600px">
			<Box d="flex" flexWrap="wrap" px="1rem" pb="1rem" width="100%">
				<Text wordBreak="break-word">{caption}</Text>
			</Box>
			<Box pos="relative">
				<Image src={photos[0]} alt={`foto de ${username} subida el ${date}`}></Image>

				{position === 0 ? null : (
					<PseudoBox
						onClick={() => console.log('left click')}
						{...pseudoBoxProps}
						pos="absolute"
						top="50%"
						left="0.75rem"
						transform="translateY(-50%)"
					>
						<BsChevronLeft size={iconProps.size} fill={iconProps.fill} />
					</PseudoBox>
				)}

				{position === photos.length - 1 ? null : (
					<PseudoBox
						onClick={() => setPosition(pos => (pos === photos.length - 1 ? pos : pos + 1))}
						{...pseudoBoxProps}
						p="absolute"
						top="50%"
						right="0.75rem"
						transform="translateY(-50%)"
					>
						<BsChevronRight size={iconProps.size} fill={iconProps.fill} />
					</PseudoBox>
				)}
			</Box>
		</Box>
	);
};

export default PostBodyMultiple;
