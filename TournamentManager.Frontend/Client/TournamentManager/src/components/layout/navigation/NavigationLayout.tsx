import * as React from 'react'
import Box from '@mui/material/Box'
import { createTheme } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import {
    AppProvider,
    type Session,
    type Navigation,
} from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useLocation, Outlet } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { logout } from '../../../actions/auth'

const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'tournaments',
        title: 'Tournaments',
        icon: <DashboardIcon />,
    },
]

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
})

export default function DashboardLayoutAccount() {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const [session, setSession] = React.useState({
        user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    })

    const authentication = React.useMemo(
        () => ({
            signIn: () => {
                setSession({
                    user: {
                        name: 'Bharat Kashyap',
                        email: 'bharatkashyap@outlook.com',
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                })
            },
            signOut: () => {
                handleLogout()
                setSession(null)
            },
        }),
        []
    )

    function CustomAppTitle() {
        return (
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">Tournament Manager</Typography>
            </Stack>
        )
    }

    const location = useLocation()

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={NAVIGATION}
            theme={demoTheme}
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </Box>
            </DashboardLayout>
        </AppProvider>
    )
}
