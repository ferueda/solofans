export const newPostReducer = (state, action) => {
	switch (action.type) {
		case 'HANDLE_LOCK':
			return {
				...state,
				isLocked: !state.isLocked,
				price: 0,
			};

		case 'SUBMIT_POST_INIT':
			return {
				...state,
				error: null,
				isLoading: true,
			};

		case 'SUBMIT_POST_SUCCESS':
			console.log('success');
			return {
				...state,
				isLoading: false,
				error: null,
				caption: '',
				price: 0,
				images: [],
				isLocked: false,
				isModal: false,
			};

		case 'SUBMIT_POST_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			};

		case 'UPDATE_CAPTION':
			return {
				...state,
				caption: action.payload.caption,
				error: null,
			};

		case 'CLOSE_MODAL':
			return {
				...state,
				isModal: false,
				isLocked: false,
				price: 0,
			};

		case 'UPDATE_MODAL':
			return {
				...state,
				isModal: state.isLocked,
			};

		case 'UPDATE_PRICE':
			return {
				...state,
				price: action.payload.price,
				isLocked: true,
				isModal: false,
			};

		case 'FORMAT_ERROR':
			return {
				...state,
				error: { message: action.payload.error.message },
			};

		default:
			return state;
	}
};
