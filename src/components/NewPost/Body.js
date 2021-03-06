import React from 'react';
import { Box, Stack, PseudoBox, Textarea } from '@chakra-ui/core';
import { BsImages } from 'react-icons/bs';
import { FaLockOpen, FaLock } from 'react-icons/fa';

const iconProps = {
	mainBlue: '#3182CE',
	size: 28,
};

const Body = ({ caption, isLocked, dispatch, captionShouldLength, imageInputRef, isLoading }) => {
	const handleCaptionChange = ({ target }) => {
		dispatch({ type: 'UPDATE_CAPTION', payload: { caption: target.value } });
	};

	const handleLock = () => {
		dispatch({ type: 'HANDLE_LOCK' });
	};

	const handleAddImage = () => imageInputRef.current.click();

	return (
		<Box d="flex" flexDir="column" width="100%" px="0.5rem">
			<Box>
				<Textarea
					isDisabled={isLoading}
					size="xs"
					outline="none"
					focusBorderColor="none"
					border="none"
					placeholder="Escribe una descripción..."
					value={caption}
					onChange={handleCaptionChange}
					zIndex={0}
					pb={0}
				/>
				<span
					style={{
						fontSize: '0.75rem',
						display: 'flex',
						justifyContent: 'flex-end',
						fontWeight: 500,
						color: caption.length >= captionShouldLength ? 'red' : 'black',
						paddingRight: '1rem',
					}}
				>
					{captionShouldLength - caption.length}
				</span>
			</Box>
			<Stack isInline spacing={4} width="100%" px="1rem" my="0.5rem">
				<PseudoBox
					as="button"
					isDisabled={isLoading}
					outline="none"
					onClick={handleAddImage}
					_hover={{ color: iconProps.fillColor }}
				>
					<BsImages size={iconProps.size} />
				</PseudoBox>
				<PseudoBox as="button" outline="none" onClick={handleLock} _hover={{ color: iconProps.fillColor }} ml="auto">
					{isLocked ? (
						<FaLock size={iconProps.size} color={iconProps.mainBlue} />
					) : (
						<FaLockOpen size={iconProps.size} color={isLocked ? iconProps.mainBlue : ''} />
					)}
				</PseudoBox>
			</Stack>
		</Box>
	);
};

export default Body;
