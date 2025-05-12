import { Action } from '../actions/action'
import {
    AUTH_ERROR,
    LOGOUT,
    REFRESH_TOKEN,
    SIGN_IN,
    SIGN_UP,
} from '../actions/types'

interface InitialState {
    isAuthenticated: boolean
    isAuthChecking: boolean
    errorMessage?: string
}

const initialState: InitialState = {
    isAuthenticated: false,
    isAuthChecking: true,
}

export default function (state: InitialState = initialState, action: Action) {
    switch (action.type) {
        case REFRESH_TOKEN:
            return {
                ...state,
                isAuthenticated: true,
                isAuthChecking: false,
                ErrorMessage: null,
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                isAuthChecking: false,
            }
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null,
                isAuthChecking: false,
            }
        case SIGN_UP:
            return {
                ...state,
                ErrorMessage: action.payload,
                isAuthChecking: false,
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload,
                isAuthChecking: false,
            }
        default:
            return state
    }
}
