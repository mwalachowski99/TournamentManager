import { Box, Stack, useMediaQuery } from '@mui/material'
import BaseModal from '../../modals/BaseModal'
import AddTournamentForm from './AddTournamentForm'
import { useState } from 'react'

interface TournamentFormModalProps {
    isOpen: boolean
    handleClose: () => void
}

export default function TournamentFormModal({
    isOpen,
    handleClose,
}: TournamentFormModalProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const [image, setImage] = useState('../../../../images/games/cs2/cover.png')

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
            <Box position="relative">
                <Stack
                    direction={isSmallScreen ? 'column' : 'row'}
                    spacing={2}
                    alignItems="flex-start"
                >
                    <Box flex={isSmallScreen ? 1 : 2} width="100%">
                        <AddTournamentForm
                            setImage={setImage}
                            handleClose={handleClose}
                        />
                    </Box>

                    <Box
                        flex={0.5}
                        display="flex"
                        width="100%"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <img
                            src={image}
                            alt="Game Cover"
                            style={{
                                maxWidth: isSmallScreen ? '100%' : '400px',
                                height: '400px',
                                borderRadius: 8,
                                width: '100%',
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
        </BaseModal>
    )
}
