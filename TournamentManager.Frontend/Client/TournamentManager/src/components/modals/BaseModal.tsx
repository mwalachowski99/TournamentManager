import React from 'react'
import { Modal, Box } from '@mui/material'
import { lightBackground } from '../../styles/colors'

interface BaseModalProps {
    children: React.ReactElement
    isOpen: boolean
    handleClose: () => void
}

export default function BaseModal({
    children,
    isOpen,
    handleClose,
}: BaseModalProps) {
    return (
        <Modal open={isOpen} onClose={handleClose} closeAfterTransition>
            <Box
                sx={{
                    background: lightBackground,
                    margin: '10%',
                    padding: '2%',
                    borderRadius: '15px',
                    boxShadow: '3px 6px 7px 0px rgba(0, 0, 0, 0.09)',
                    position: 'relative',
                }}
            >
                {children}
            </Box>
        </Modal>
    )
}
