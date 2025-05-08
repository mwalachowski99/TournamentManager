import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { setupErrorHandlingInterceptor } from './interceptors/axiosInterceptor'
import { Provider } from 'react-redux'
import store from './store/store'
import { refreshToken } from './actions/auth'

function App() {
    const location = useLocation()

    useEffect(() => {
        setupErrorHandlingInterceptor()
        store.dispatch(refreshToken())
    }, [])

    return (
        <Provider store={store}>
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {location.pathname === '/' ? <></> : <Outlet />}
            </Box>
        </Provider>
    )
}

export default App
