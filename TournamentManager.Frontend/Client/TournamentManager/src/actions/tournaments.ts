import axios from 'axios'
import { API_BASE_URL } from '../../config'
import {
    ADD_TOURNAMENT,
    GET_TOURNAMENTS,
    DELETE_TOURNAMENT,
    EDIT_TOURNAMENT,
    GET_TOURNAMENT_BY_ID,
} from './types'
import { Action } from './action'
import { RootState } from '../store/rootState'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { TournamentDto } from '../models/tournamentDto'
import { apiRequest, tokenConfig } from './actionHelpers'

export const getTournaments =
    () => async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(
            () =>
                axios
                    .get(`${API_BASE_URL}/tournaments`, tokenConfig())
                    .then((res) => {
                        dispatch({
                            type: GET_TOURNAMENTS,
                            payload: res.data,
                        })
                    }),
            dispatch
        )
    }

export const getTournamentById =
    (id: string) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(
            () =>
                axios
                    .get(`${API_BASE_URL}/tournaments/${id}`, tokenConfig())
                    .then((res) => {
                        dispatch({
                            type: GET_TOURNAMENT_BY_ID,
                            payload: res.data,
                        })
                    }),
            dispatch
        )
    }

export const addTournament =
    (tournament: TournamentDto) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(
            () =>
                axios
                    .post(
                        `${API_BASE_URL}/tournaments`,
                        tournament,
                        tokenConfig()
                    )
                    .then((res) => {
                        dispatch({
                            type: ADD_TOURNAMENT,
                            payload: res.data,
                        })
                    }),
            dispatch
        )
    }

export const deleteTournament =
    (tournamentId: number) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(
            () =>
                axios
                    .delete(
                        `${API_BASE_URL}/tournaments/${tournamentId}`,
                        tokenConfig()
                    )
                    .then((res) => {
                        dispatch({
                            type: DELETE_TOURNAMENT,
                            payload: tournamentId,
                        })
                    }),
            dispatch
        )
    }

export const editTournament =
    (tournament: TournamentDto) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        console.log(tournament)
        await apiRequest(
            () =>
                axios
                    .put(
                        `${API_BASE_URL}/tournaments/${tournament.id}`,
                        tournament,
                        tokenConfig()
                    )
                    .then((res) => {
                        dispatch({
                            type: EDIT_TOURNAMENT,
                            payload: res.data,
                        })
                    }),
            dispatch
        )
    }
