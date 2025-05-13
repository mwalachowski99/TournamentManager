import { TournamentMode } from '../enums/tournamentMode'

export const getTeamNumberOptions = (mode: TournamentMode): number[] => {
    switch (mode) {
        case TournamentMode.eliminationBracket:
            return [4, 8, 16]
        case TournamentMode.leagueKnockout:
            return [4]
        default:
            return []
    }
}

export const getTournamentPhases = (mode: TournamentMode): string[] => {
    switch (mode) {
        case TournamentMode.eliminationBracket:
            return ['Knockout']
        case TournamentMode.leagueKnockout:
            return ['League', 'Knockout']
        default:
            return []
    }
}
