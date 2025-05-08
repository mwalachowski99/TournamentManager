import React from 'react'
import { Box } from '@mui/material'
import { lightBackground } from '../../styles/colors'

interface ContentBoxProps {
    children: React.ReactNode
}
export default function ContentBox({ children }: ContentBoxProps) {
    return (
        <Box
            sx={{
                background: lightBackground,
                margin: '3%',
                padding: '1%',
                borderRadius: '15px',
                boxShadow: '3px 6px 7px 0px rgba(0, 0, 0, 0.09)',
            }}
        >
            {children}
        </Box>
    )
}
