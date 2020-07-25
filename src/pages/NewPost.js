import React, { useState, useEffect } from 'react';
import { Box, Divider, Text } from '@chakra-ui/core';

import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';
import Header from '../components/NewPost/Header';
import Body from '../components/NewPost/Body';
import Meta from '../components/NewPost/Meta';
import PriceModal from '../components/NewPost/PriceModal';

const captionShouldLength = 150;

const NewPost = () => {
	const [caption, setCaption] = useState('');
	const [images, setImages] = useState([]);
	const [isLocked, setIsLocked] = useState(false);
	const [price, setPrice] = useState(0);
	const [isModal, setIsModal] = useState(false);
	const [error, setError] = useState(null);

	useProtectedRoute();

	useEffect(() => {
		setIsModal(() => isLocked);
	}, [isLocked]);

	const handleLock = () => {
		setIsLocked(state => !state);
		setPrice(0);
	};

	const handlePostSubmit = () => {
		if (caption.length > captionShouldLength) {
			return setError({ message: `La descripción debe tener un máximo de ${captionShouldLength} letras` });
		}
		console.log(caption);
	};

	const handleCaptionChange = ({ target }) => {
		setCaption(target.value);
		setError(null);
	};

	const handleModalClose = () => {
		setIsModal(false);
		setIsLocked(false);
		setPrice(0);
	};

	const handleSubmitPrice = value => {
		setPrice(value);
		setIsLocked(true);
		setIsModal(false);
	};

	const isButtonActive = caption.length > 0 || images.length > 0;

	return (
		<Box d="flex" flexDir="column" alignItems="center" alignContent="center" width="100%" p="1rem" mb="4rem">
			<Header title="Crear post" buttonLabel="Publicar" buttonIsActive={isButtonActive} onSubmit={handlePostSubmit} />

			{error && (
				<Text d="flex" mt="0.5rem" textAlign="center" fontSize="sm" color="red.500">
					{error.message}
				</Text>
			)}

			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<Body caption={caption} isLocked={isLocked} handleLock={handleLock} handleCaptionChange={handleCaptionChange} />
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<Meta isLocked={isLocked} price={price} />
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<PriceModal isOpen={isModal} onClose={handleModalClose} onSubmit={handleSubmitPrice} />
			<Nav />
		</Box>
	);
};

export default NewPost;
