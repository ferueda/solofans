//min. 2:27:06
//min. 2::35:39

let db = {
	users: [
		{
			email: 'email@email.com',
			firstName: 'First',
			lastName: 'Last',
			username: 'ferueda',
			photoURL: 'www.url.com',
			createdAt: '2020-07-22T20:35:52.145Z',
			creditBalance: 37400,
			totalSales: 0,
			totalWithdrawals: 0,
			lastActive: 'april 22',
			purchasedPosts: [
				//array
				'postId',
			],
		},
	],
	usernames: [
		{
			uid: 'yYLYI1azG2WtrYKIMYAl7cA9plm1',
		},
	],
	posts: [
		{
			caption: 'the message',
			createdAt: '2020-07-22T20:35:52.145Z',
			photos: [{ url: 'www.photourl.com' }],
			locked: true,
			price: 67000,
			user: {
				firstName: 'First',
				lastName: 'Last',
				id: 'yYLYI1azG2WtrYKIMYAl7cA9plm1',
				photoURL: 'www.url.com',
				username: 'ferueda',
			},
		},
	],
	following: [
		{
			totalFollowing: 207,
			following: [
				//array
				'uid',
			],
		},
	],
	followers: [
		{
			totalFollowers: 1732,
			lastPost: 'april 22',
			recentPosts: [
				//array
				{
					caption: 'the message',
					createdAt: '2020-07-22T20:35:52.145Z',
					photos: [{ url: 'www.photourl.com' }],
					locked: true,
					user: {
						firstName: 'First',
						lastName: 'Last',
						id: 'yYLYI1azG2WtrYKIMYAl7cA9plm1',
						photoURL: 'www.url.com',
						username: 'ferueda',
					},
				},
			],
			followers: [
				//array
				'uid',
			],
		},
	],
};

//when creating unique likes, you could create your own likeId combining the userId and the post id. It makes sure that a user can't heart a post more than once. The likesId would look like something like this: userOne_post21312

// use firebase cloud functions to aggregate data like tips, likeCounts and balance. Refer to firebase trigger functions or firestore increment https://firebase.google.com/docs/firestore/solutions/counters
