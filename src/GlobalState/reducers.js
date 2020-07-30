export const newPostReducer = (state, action) => {
	switch (action.type) {
		case 'HANDLE_LOCK':
			return {
				...state,
				isLocked: !state.isLocked,
				price: 0,
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

		case 'ADD_IMAGE':
			return {
				...state,
				error: null,
				images: state.images.concat(action.payload),
			};

		case 'REMOVE_IMAGE':
			return {
				...state,
				error: null,
				images: state.images.filter(imageObject => imageObject.image.name !== action.payload.image),
			};

		default:
			return state;
	}
};
