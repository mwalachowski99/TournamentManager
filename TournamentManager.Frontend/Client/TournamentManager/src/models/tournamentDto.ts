import { Game } from '../enums/game'

export interface TournamentDto {
    id: number | undefined
    name: string
    description: string
    startDate: string
    endDate: string
    game: Game
}
