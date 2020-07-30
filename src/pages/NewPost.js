import React, { useReducer, useContext, useRef } from 'react';
import { Box, Divider, Text } from '@chakra-ui/core';

import { AuthContext } from '../GlobalState/AuthContext';

import useProtectedRoute from '../hooks/useProtectedRoute';
import useSubmitPost from '../hooks/useSubmitPost';

import { newPostReducer } from '../GlobalState/reducers';

import Nav from '../components/shared/Nav';
import Header from '../components/NewPost/Header';
import Body from '../components/NewPost/Body';
import Meta from '../components/NewPost/Meta';
import PriceModal from '../components/NewPost/PriceModal';
import ImagePreview from '../components/NewPost/ImagePreview';

const captionShouldLength = 150;

const initialState = {
	caption: '',
	images: [],
	imagePreview: null,
	isLocked: false,
	price: 0,
	isModal: false,
	error: null,
};

const NewPost = () => {
	useProtectedRoute();
	const { user } = useContext(AuthContext);

	const { setPostObject, isLoading } = useSubmitPost();

	const [{ caption, images, isLocked, price, isModal, error }, dispatch] = useReducer(newPostReducer, initialState);

	const imageInputRef = useRef();

	const handleSubmit = async () => {
		if (caption.length > captionShouldLength) {
			return dispatch({
				type: 'FORMAT_ERROR',
				payload: { error: { message: `La descripción debe tener un máximo de ${captionShouldLength} letras` } },
			});
		}

		const postObject = {
			caption,
			createdAt: new Date().toISOString(),
			photos: images.map(({ image }) => image),
			locked: isLocked,
			price: price > 0 ? Number(price.replace(/[^0-9]+/g, '')) : 0,
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				uid: user.uid,
				photoURL: user.photoURL,
				username: user.displayName,
			},
		};

		setPostObject(postObject);
	};

	const handleAddImage = ({ target }) => {
		const image = target.files[0];

		if (image && images.some(img => img.image.name === image.name)) {
			return dispatch({ type: 'FORMAT_ERROR', payload: { error: { message: 'La imagen ya fue seleccionada' } } });
		}

		if (image && images.length >= 6) {
			return dispatch({ type: 'FORMAT_ERROR', payload: { error: { message: 'El máximo de fotos por post es de 6' } } });
		}

		if (image) {
			dispatch({ type: 'ADD_IMAGE', payload: { image, preview: URL.createObjectURL(image) } });
			target.value = '';
		}
	};

	const isButtonActive = images.length > 0;

	console.log(images);

	return (
		<Box d="flex" flexDir="column" alignItems="center" alignContent="center" width="100%" p="1rem" mb="4rem">
			<Header
				title="Crear post"
				buttonLabel="Publicar"
				buttonIsActive={isButtonActive}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
			/>

			{error && (
				<Text d="flex" mt="0.5rem" textAlign="center" fontSize="sm" color="red.500">
					{error.message}
				</Text>
			)}

			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<Body
				caption={caption}
				isLocked={isLocked}
				dispatch={dispatch}
				captionShouldLength={captionShouldLength}
				imageInputRef={imageInputRef}
			/>
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<input type="file" onChange={handleAddImage} ref={imageInputRef} style={{ display: 'none' }} />

			<Meta isLocked={isLocked} price={price} />
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			{images.map(({ image, preview }) => (
				<ImagePreview
					key={image.name}
					imageInputRef={imageInputRef}
					image={image}
					preview={preview}
					dispatch={dispatch}
				/>
			))}

			<PriceModal isOpen={isModal} isLocked={isLocked} dispatch={dispatch} />
			<Nav />
		</Box>
	);
};

export default NewPost;
