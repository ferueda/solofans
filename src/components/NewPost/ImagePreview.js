import React from 'react';
import { Box, PseudoBox, Image } from '@chakra-ui/core';
import { BsX } from 'react-icons/bs';

const ImagePreview = ({ image, preview, dispatch, imageInputRef }) => {
	const handleRemoveImage = () => {
		dispatch({ type: 'REMOVE_IMAGE', payload: { image: image.name } });
		imageInputRef.current.value = '';
	};

	return (
		<Box pos="relative" d="inline-block">
			<Image borderRadius="0.25rem" w="120px" h="120px" src={preview} alt="image preview" />
			<PseudoBox
				as="button"
				outline="none"
				d="flex"
				alignItems="center"
				onClick={handleRemoveImage}
				position="absolute"
				top="5px"
				right="5px"
				bg="blue.500"
				borderRadius="9999px"
				_hover={{ bg: 'blue.600' }}
			>
				<BsX size={20} color="white" />
			</PseudoBox>
		</Box>
	);
};

export default ImagePreview;
