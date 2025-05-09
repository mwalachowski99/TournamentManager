import { Action } from '../actions/action'
import {
    ADD_TOURNAMENT,
    DELETE_TOURNAMENT,
    EDIT_TOURNAMENT,
    GET_TOURNAMENT_BY_ID,
    GET_TOURNAMENTS,
} from '../actions/types'
import { TournamentDto } from '../models/tournamentDto'

interface InitialState {
    tournaments: TournamentDto[]
    tournament: TournamentDto | null
}

const initialState: InitialState = {
    tournaments: [],
    tournament: null,
}

export default function (state: InitialState = initialState, action: Action) {
    switch (action.type) {
        case GET_TOURNAMENTS:
            return {
                ...state,
                tournaments: action.payload.tournamentDtos,
            }
        case GET_TOURNAMENT_BY_ID:
            return {
                ...state,
                tournament: action.payload.tournamentDto,
            }
        case ADD_TOURNAMENT:
            return {
                ...state,
                tournaments: [
                    ...state.tournaments,
                    action.payload.tournamentDto,
                ],
            }
        case DELETE_TOURNAMENT:
            return {
                ...state,
                tournaments: state.tournaments.filter(
                    (tournament) => tournament.id !== action.payload
                ),
            }
        case EDIT_TOURNAMENT:
            return {
                ...state,
                tournaments: [
                    ...state.tournaments.filter(
                        (tournament) =>
                            tournament.id !== action.payload.tournamentDto.id
                    ),
                    action.payload.tournamentDto,
                ],
            }
        default:
            return state
    }
}
