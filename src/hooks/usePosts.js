import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../GlobalState/FirebaseContext';

const usePosts = () => {
	const [posts, setPosts] = useState([]);

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
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
			});
		return () => {
			unsubscribe();
		};
	}, [firebase.db]);

	return {
		posts,
	};
};

export default usePosts;
