import rootReducer from '../reducers/rootReducer'
import { configureStore } from '@reduxjs/toolkit'

const initialState = {}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
