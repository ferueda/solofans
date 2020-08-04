import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';

const usePosts = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const unsubscribe = db
			.collection('posts')
			.orderBy('createdAt', 'desc')
			.onSnapshot(snapshot => {
				setPosts(
					snapshot.docs.map(doc => ({
						id: doc.id,
						post: doc.data(),
					}))
				);

				setIsLoading(false);
				setError(null);
			});

		return () => {
			unsubscribe();
		};
	}, []);

	return {
		posts,
		isLoading,
		error,
	};
};

export default usePosts;
