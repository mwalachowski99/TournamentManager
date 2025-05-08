import axios, { AxiosResponse } from 'axios'
import { TournamentDto } from '../models/tournamentDto'
import { GetTournamentsResponse } from '../models/getTournamentsResponse'
import { API_BASE_URL, BASE_URL } from '../../config.ts'
import { GetTournamentByIdResponse } from '../models/getTournamentByIdResponse.ts'
import { LoginResponse } from '../models/loginResponse.ts'

const apiConnector = {
    getTournaments: async (): Promise<TournamentDto[]> => {
        const response: AxiosResponse<GetTournamentsResponse> = await axios.get(
            `${API_BASE_URL}/tournaments`
        )
        const tournaments = response.data.tournamentDtos

        return tournaments
    },

    createTournament: async (tournament: TournamentDto): Promise<void> => {
        await axios.post<number>(`${API_BASE_URL}/tournaments`, tournament)
    },

    editTournament: async (tournament: TournamentDto): Promise<void> => {
        await axios.put<number>(`${API_BASE_URL}/tournaments`, tournament)
    },

    deleteTournament: async (tournamentId: number): Promise<void> => {
        await axios.delete<number>(`${API_BASE_URL}/tournaments/${tournamentId}`)
    },

    getTournamentById: async (tournamentId: string): Promise<TournamentDto> => {
        const response = await axios.get<GetTournamentByIdResponse>(
            `${API_BASE_URL}/tournaments/${tournamentId}`
        )
        const tournament = response.data.tournamentDto

        return tournament
    },
    login: async (
        email: string,
        password: string,
        rememberMe: boolean
    ): Promise<void> => {
        const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, {
            email,
            password,
        })
        const tokens = {
            access: response.data.accessToken,
            refresh: response.data.refreshToken,
        }

        localStorage.setItem('access', tokens.access)
        rememberMe
            ? sessionStorage.setItem('refresh', tokens.refresh)
            : localStorage.setItem('refresh', tokens.refresh)
    },
}

export default apiConnector
