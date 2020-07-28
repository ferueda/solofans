import React from 'react';
import { Box, Stack, Text, PseudoBox } from '@chakra-ui/core';
import { AiOutlineDollar } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

import { formatNumber } from '../../utils/helpers';

const iconProps = {
	fillColor: '#ed4956',
	mainBlue: '#3182CE',
	color: 'red',
	size: 30,
};

const PostFooter = ({ meta }) => {
	const [isLike, setIsLike] = React.useState(false);

	return (
		<Box d="flex" flexDir="column" alignItems="center" maxW="600px" width="100%" px="1rem" pb="0.5rem">
			{/* <Stack as="section" isInline spacing={2} width="100%" py="0.5rem">
				<PseudoBox
					as="button"
					outline="none"
					onClick={() => setIsLike(state => !state)}
					_hover={{ color: iconProps.fillColor }}
				>
					{isLike ? (
						<IoMdHeart size={iconProps.size} fill={iconProps.fillColor} />
					) : (
						<IoMdHeartEmpty size={iconProps.size} />
					)}
				</PseudoBox>
				<PseudoBox
					as="button"
					outline="none"
					d="flex"
					alignItems="center"
					onClick={() => console.log('clicked')}
					_hover={{ color: iconProps.mainBlue }}
				>
					<AiOutlineDollar size={iconProps.size} />
					<Text fontSize="0.9rem" fontWeight="500" ml="0.25rem">
						Propina
					</Text>
				</PseudoBox>
			</Stack>
			<Box as="section" d="flex" width="100%" py="0.5rem">
				<Text fontSize="0.85rem">
					<strong>{formatNumber(meta.likesCount)}</strong> Me gusta
				</Text>
				<Box>
					<BsDot size={20} />
				</Box>
				<Text fontSize="0.85rem">
					<strong>${formatNumber(meta.tips)}</strong> En propinas
				</Text>
			</Box> */}
			<Box width="100%" fontSize="0.8rem" color="gray.500" px="0.1rem">
				{meta.time}
			</Box>
		</Box>
	);
};

export default PostFooter;
