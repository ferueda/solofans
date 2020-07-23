import React, { useState } from 'react';
import { Box, Stack, Text, PseudoBox, Divider, Textarea } from '@chakra-ui/core';
import { AiOutlineDollar } from 'react-icons/ai';
import { BsImages, BsUnlock, BsLock } from 'react-icons/bs';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';
import SectionHeader from '../components/shared/SectionHeader';

const iconProps = {};

const NewPost = () => {
	const [isLocked, setIsLocked] = useState(false);
	const [images, setImages] = useState([]);

	useProtectedRoute();

	return (
		<Box d="flex" flexDir="column" alignItems="center" alignContent="center" width="100%" p="1rem" mb="4rem">
			<SectionHeader title="Crear post" />
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />
			<Box d="flex" flexDir="column" width="100%" px="0.5rem">
				<Textarea
					size="xs"
					h="1rem"
					outline="none"
					focusBorderColor="none"
					border="none"
					placeholder="Escribe una descripción..."
				/>
				<Stack isInline spacing={2} width="100%" px="1rem">
					<PseudoBox
						as="button"
						outline="none"
						onClick={() => console.log('clicked')}
						_hover={{ color: iconProps.fillColor }}
					>
						<BsImages size={28} />
					</PseudoBox>
				</Stack>
			</Box>
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />
			<Nav />
		</Box>
	);
};

export default NewPost;
