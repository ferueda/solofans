import React, { useEffect, useReducer, useContext } from 'react';
import { Box, Divider, Text } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../GlobalState/FirebaseContext';
import { AuthContext } from '../GlobalState/AuthContext';

import useProtectedRoute from '../hooks/useProtectedRoute';

import * as ROUTES from '../constants/routes';

import { newPostReducer } from '../GlobalState/reducers';

import Nav from '../components/shared/Nav';
import Header from '../components/NewPost/Header';
import Body from '../components/NewPost/Body';
import Meta from '../components/NewPost/Meta';
import PriceModal from '../components/NewPost/PriceModal';

const captionShouldLength = 150;

const initialState = {
	caption: '',
	images: [],
	isLocked: false,
	price: 0,
	isModal: false,
	isLoading: false,
	error: null,
};

const NewPost = () => {
	const [{ caption, images, isLocked, price, isModal, isLoading, error }, dispatch] = useReducer(
		newPostReducer,
		initialState
	);

	const firebase = useContext(FirebaseContext);
	const { user } = useContext(AuthContext);

	const history = useHistory();

	useProtectedRoute();

	useEffect(() => {
		dispatch({ type: 'UPDATE_MODAL' });
	}, [isLocked]);

	const handleSubmit = async () => {
		if (caption.length > captionShouldLength) {
			return dispatch({
				type: 'FORMAT_ERROR',
				payload: { error: { message: `La descripción debe tener un máximo de ${captionShouldLength} letras` } },
			});
		}

		dispatch({ type: 'SUBMIT_POST_INIT' });

		const postObject = {
			caption,
			createdAt: new Date().toISOString(),
			photos: [...images],
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

		try {
			const followersRef = firebase.db.collection('followers');
			const followersDocRef = followersRef.doc(user.uid);

			const followerDoc = await followersDocRef.get();
			const recentPosts = followerDoc.data().recentPosts;

			if (recentPosts.length >= 5) {
				await followersDocRef.update({
					recentPosts: firebase.app.firestore.FieldValue.arrayRemove(recentPosts[recentPosts.length - 1]),
				});
			}

			const p1 = firebase.db.collection('posts').add(postObject);

			const p2 = followersDocRef.update({
				lastPost: postObject.createdAt,
				recentPosts: firebase.app.firestore.FieldValue.arrayUnion(postObject),
			});

			await Promise.all([p1, p2]);

			dispatch({ type: 'SUBMIT_POST_SUCCESS' });
			history.push(ROUTES.HOME);
		} catch (error) {
			dispatch({ type: 'SUBMIT_POST_ERROR', payload: { error } });
		}
	};

	const isButtonActive = caption.length > 0 || images.length > 0;

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

			<Body caption={caption} isLocked={isLocked} dispatch={dispatch} captionShouldLength={captionShouldLength} />
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<Meta isLocked={isLocked} price={price} />
			<Divider borderColor="gray.200" width="100%" my="0.5rem" />

			<PriceModal isOpen={isModal} dispatch={dispatch} />
			<Nav />
		</Box>
	);
};

export default NewPost;
