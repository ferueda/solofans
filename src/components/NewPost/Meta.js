import React from 'react';
import { Box, Text } from '@chakra-ui/core';

import { formatNumber } from '../../utils/helpers';

function Meta({ isLocked, price }) {
	return (
		<Box my="0.5rem" ml="1rem" width="100%">
			<Text textAlign="left">
				Precio:{' '}
				{isLocked && price > 0 ? (
					<strong style={{ color: 'green' }}>${formatNumber(price)}</strong>
				) : (
					<React.Fragment>
						<strong style={{ color: 'orange' }}>Gratis (Abierto)</strong>
					</React.Fragment>
				)}
			</Text>
		</Box>
	);
}

export default Meta;
