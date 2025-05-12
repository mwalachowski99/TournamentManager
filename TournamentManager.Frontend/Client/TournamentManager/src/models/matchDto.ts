import { Round } from '../enums/round'

export interface MatchDto {
    id: number | undefined
    homeTeamId: number | undefined
    awayTeamId: number | undefined
    homeTeamName: string | undefined
    awayTeamName: string | undefined
    homeTeamScore: number | undefined
    awayTeamScore: number | undefined
    startDate: string
    round: Round
}
