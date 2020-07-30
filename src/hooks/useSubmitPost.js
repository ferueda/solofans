import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { FirebaseContext } from '../GlobalState/FirebaseContext';
import { AuthContext } from '../GlobalState/AuthContext';

import * as ROUTES from '../constants/routes';

const useSubmitPost = () => {
	const firebase = useContext(FirebaseContext);
	const { user } = useContext(AuthContext);
	const history = useHistory();

	const [postObject, setPostObject] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!postObject) return;

		const source = axios.CancelToken.source();

		setIsLoading(true);
		setError(false);

		const images = [...postObject.photos];

		(async () => {
			try {
				const userTokenId = await firebase.auth.currentUser.getIdToken();

				const imageUploadPromises = [];

				images.forEach(image => {
					const formData = new FormData();
					formData.append('image', image, image.name);

					const promise = axios.post('http://localhost:5000/solofans/us-central1/api/photos', formData, {
						headers: { Authorization: `Bearer ${userTokenId}` },
						cancelToken: source.token,
					});

					imageUploadPromises.push(promise);
				});

				const uploadedImages = await Promise.all(imageUploadPromises);
				const uploadedImageNames = uploadedImages.map(image => image.data.name);

				const storageRef = firebase.storage.ref();
				const imagesRef = uploadedImageNames.map(img => storageRef.child(img));

				const imageDonwloadLinkPromises = imagesRef.map(imageRef => imageRef.getDownloadURL());
				const imagesUrl = await Promise.all(imageDonwloadLinkPromises);

				const newPostObject = {
					...postObject,
					photos: [...imagesUrl],
				};

				const followersRef = firebase.db.collection('followers');
				const followersDocRef = followersRef.doc(user.uid);

				const followersDoc = await followersDocRef.get();
				const recentPosts = followersDoc.data().recentPosts;

				if (recentPosts.length >= 5) {
					await followersDocRef.update({
						recentPosts: firebase.app.firestore.FieldValue.arrayRemove(recentPosts[recentPosts.length - 1]),
					});
				}

				const postUploadPromise = firebase.db.collection('posts').add(newPostObject);

				const followersDocUpdatePromise = followersDocRef.update({
					lastPost: newPostObject.createdAt,
					recentPosts: firebase.app.firestore.FieldValue.arrayUnion(newPostObject),
				});

				await Promise.all([postUploadPromise, followersDocUpdatePromise]);

				setIsLoading(false);
				setError(null);

				history.push(ROUTES.HOME);
			} catch (error) {
				setError(axios.isCancel(error) ? null : error);
			}
		})();
	}, [postObject]);

	return {
		setPostObject,
		isLoading,
		error,
	};
};

export default useSubmitPost;
