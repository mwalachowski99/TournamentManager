import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootState'

interface PrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated, isAuthChecking } = useSelector(
        (state: RootState) => state.auth
    )

    if (!isAuthenticated && !isAuthChecking) {
        return <Navigate to="/signIn" replace />
    }

    return children
}

export default PrivateRoute
