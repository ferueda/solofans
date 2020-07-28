import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	Input,
	FormControl,
	FormLabel,
	Box,
	InputLeftElement,
	InputGroup,
	Stack,
} from '@chakra-ui/core';

import { formatNumber } from '../../utils/helpers';

const PriceModal = ({ isOpen, dispatch }) => {
	const [price, setPrice] = useState('');
	const [error, setError] = useState(null);

	const handleInputChange = value => {
		const reg = /[^0-9]+/g;
		setError(null);
		setPrice(formatNumber(value.replace(reg, '')));
	};

	const handleSuggestion = value => {
		setError(null);
		setPrice(formatNumber(value));
	};

	const handleSubmit = event => {
		event.preventDefault();

		const reg = /[^0-9]+/g;

		const value = Number(price.replace(reg, ''));

		if (value < 1000) {
			return setError({ message: 'El precio debe ser mayor o igual a $1.000' });
		}

		if (value > 100000) {
			return setError({ message: 'El precio debe ser menor o igual a $100.000' });
		}

		dispatch({ type: 'UPDATE_PRICE', payload: { price } });
		setPrice('');
	};

	const handleModalClose = () => dispatch({ type: 'CLOSE_MODAL' });

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Precio del post</ModalHeader>

				<ModalBody mb="1rem">
					<form onSubmit={handleSubmit}>
						<FormLabel htmlFor="price" mb="0.5rem">
							Ingresa el precio que tendrá tu post.
						</FormLabel>

						<Stack isInline spacing={2} mb="1rem">
							<Button _focus="none" variant="outline" size="sm" onClick={() => handleSuggestion(3500)}>
								$3.500
							</Button>
							<Button _focus="none" variant="outline" size="sm" onClick={() => handleSuggestion(5000)}>
								$5.000
							</Button>
							<Button _focus="none" variant="outline" size="sm" onClick={() => handleSuggestion(10000)}>
								$10.000
							</Button>
							<Button _focus="none" variant="outline" size="sm" onClick={() => handleSuggestion(15000)}>
								$15.000
							</Button>
						</Stack>

						<FormControl isInvalid={!!error}>
							<InputGroup>
								<InputLeftElement color="gray.400" fontSize="1.2em" children="$" />
								<Input
									name="price"
									type="text"
									min="1"
									max="500"
									placeholder="Ingresa otro valor"
									value={price}
									onChange={({ target }) => handleInputChange(target.value)}
									borderColor="gray.300"
								/>
							</InputGroup>
						</FormControl>
						<Text textAlign="right" color="gray.500" fontSize="0.7rem">
							Mínimo $1.000 - Máximo $100.000
						</Text>

						{error && (
							<Text d="flex" justifyContent="center" fontSize="sm" color="red.500" my="0.25rem">
								{error.message}
							</Text>
						)}

						<Box w="100%" d="flex" justifyContent="center" mt="1rem">
							<Button type="submit" variantColor="blue" mx="auto">
								Aceptar
							</Button>
						</Box>
					</form>
				</ModalBody>

				<ModalCloseButton />
			</ModalContent>
		</Modal>
	);
};

export default PriceModal;
