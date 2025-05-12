import store from '../store/store'
import { refreshToken } from './auth'

export const apiRequest = async <T>(
    requestFn: () => Promise<T>
): Promise<T> => {
    try {
        return await requestFn()
    } catch (err: any) {
        console.error('API Error:', err)

        if (err.response?.status === 401) {
            return store.dispatch(refreshToken()).then(() => {
                const isAuthenticated = store.getState().auth.isAuthenticated
                if (isAuthenticated) {
                    return requestFn()
                }
                return Promise.reject(err)
            })
        }

        return Promise.reject(err)
    }
}

export const tokenConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
    }
}
