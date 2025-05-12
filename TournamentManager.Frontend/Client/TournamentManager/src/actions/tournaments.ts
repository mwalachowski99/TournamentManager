import axios from 'axios'
import { API_BASE_URL } from '../../config'
import {
    ADD_TOURNAMENT,
    GET_TOURNAMENTS,
    DELETE_TOURNAMENT,
    EDIT_TOURNAMENT,
    GET_TOURNAMENT_BY_ID,
    CONFIGURE_TOURNAMENT,
    CONFIGURE_TOURNAMENT_ERROR,
    ADD_TOURNAMENT_ERROR,
} from './types'
import { Action } from './action'
import { RootState } from '../store/rootState'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { TournamentDto } from '../models/tournamentDto'
import { apiRequest, tokenConfig } from './actionHelpers'
import { TournamentMode } from '../enums/tournamentMode'

export const getTournaments =
    () => async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(() =>
            axios
                .get(`${API_BASE_URL}/tournaments`, tokenConfig())
                .then((res) => {
                    dispatch({
                        type: GET_TOURNAMENTS,
                        payload: res.data,
                    })
                })
        )
    }

export const getTournamentById =
    (id: string) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(() =>
            axios
                .get(`${API_BASE_URL}/tournaments/${id}`, tokenConfig())
                .then((res) => {
                    dispatch({
                        type: GET_TOURNAMENT_BY_ID,
                        payload: res.data,
                    })
                })
        )
    }

export const addTournament =
    (tournament: TournamentDto) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(() =>
            axios
                .post(`${API_BASE_URL}/tournaments`, tournament, tokenConfig())
                .then((res) => {
                    dispatch({
                        type: ADD_TOURNAMENT,
                        payload: res.data,
                    })
                })
                .catch((err) => {
                    const errors =
                        (err.response?.data?.errors as {
                            property: string
                            errorMessage: string
                        }[]) || []

                    const errorMessage =
                        errors.length > 0
                            ? errors[0].errorMessage
                            : 'Unknown error occured'
                    dispatch({
                        type: ADD_TOURNAMENT_ERROR,
                        payload: errorMessage,
                    })

                    throw err
                })
        )
    }

export const deleteTournament =
    (tournamentId: number) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(() =>
            axios
                .delete(
                    `${API_BASE_URL}/tournaments/${tournamentId}`,
                    tokenConfig()
                )
                .then(() => {
                    dispatch({
                        type: DELETE_TOURNAMENT,
                        payload: tournamentId,
                    })
                })
        )
    }

export const editTournament =
    (tournament: TournamentDto) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(() =>
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
                })
        )
    }

export const configureTournament =
    (
        tournamentId: string,
        tournamentMode: TournamentMode,
        teamNumber: number
    ) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(() =>
            axios
                .put(
                    `${API_BASE_URL}/tournaments/configure/${tournamentId}`,
                    { tournamentMode, teamNumber },
                    tokenConfig()
                )
                .then((res) => {
                    dispatch({
                        type: CONFIGURE_TOURNAMENT,
                        payload: res.data,
                    })
                })
                .catch((err) => {
                    const errors =
                        (err.response?.data?.errors as {
                            property: string
                            errorMessage: string
                        }[]) || []

                    const errorMessage =
                        errors.length > 0
                            ? errors[0].errorMessage
                            : 'Unknown error occured'
                    dispatch({
                        type: CONFIGURE_TOURNAMENT_ERROR,
                        payload: errorMessage,
                    })

                    throw err
                })
        )
    }
