import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useLocationBlocker = () => {
	const history = useHistory();
	useEffect(
		() =>
			history.block(
				(location, action) => action !== 'PUSH' || getLocationId(location) !== getLocationId(history.location)
			),
		[] // eslint-disable-line react-hooks/exhaustive-deps
	);
};

const getLocationId = ({ pathname, search, hash }) => {
	return pathname + (search ? '?' + search : '') + (hash ? '#' + hash : '');
};

export default useLocationBlocker;
