import { Box, useMediaQuery } from '@mui/material'
import BaseModal from '../../modals/BaseModal'
import ConfigureTournamentForm from './ConfigureTournamentForm'

interface TournamentFormModalProps {
    isOpen: boolean
    handleClose: () => void
}

export default function ConfigureTournamentModal({
    isOpen,
    handleClose,
}: TournamentFormModalProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
            <Box position="relative">
                <Box flex={isSmallScreen ? 1 : 2} width="100%">
                    <ConfigureTournamentForm handleClose={handleClose} />
                </Box>
            </Box>
        </BaseModal>
    )
}
