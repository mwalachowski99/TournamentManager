import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from './rootState'
import { useDispatch } from 'react-redux'
import { Action } from '../actions/action'

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>

export const useAppDispatch = () => useDispatch<AppDispatch>()
