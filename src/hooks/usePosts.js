import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../GlobalState/FirebaseContext';

const usePosts = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const unsubscribe = firebase.db
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
	}, [firebase.db]);

	return {
		posts,
		isLoading,
		error,
	};
};

export default usePosts;
