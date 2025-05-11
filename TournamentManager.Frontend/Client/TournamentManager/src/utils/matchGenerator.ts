import { TournamentMode } from '../enums/tournamentMode'
import { Round } from '../enums/round'
import { MatchDto } from '../models/matchDto'

export function generateMatchesForMode(
    mode: TournamentMode,
    teamNumber: number
): MatchDto[] {
    switch (mode) {
        case TournamentMode.eliminationBracket:
            return generateEliminationBracketMatches(teamNumber)
        case TournamentMode.leagueKnockout:
            return generateLeagueKnockoutMatches()
        default:
            return []
    }
}

const roundNames: Round[] = [
    Round.final,
    Round.semifinals,
    Round.quarterfinals,
    Round.roundOf16,
]

function getTeamName(index: number): string {
    return `team ${String.fromCharCode(65 + index)}`
}

function generateEliminationBracketMatches(teamNumber: number): MatchDto[] {
    const matches: MatchDto[] = []

    const roundNumber = Math.log2(teamNumber)
    let currentId = 1
    let teamIndex = 0

    for (let i = 0; i < roundNumber; i++) {
        const round = roundNames[roundNumber - i - 1]
        const matchCount = Math.pow(2, roundNumber - i - 1)

        for (let j = 0; j < matchCount; j++) {
            let match: MatchDto

            if (i === 0) {
                match = {
                    id: currentId++,
                    round: round,
                    homeTeamId: currentId * 10 + 1,
                    awayTeamId: currentId * 10 + 2,
                    homeTeamName: getTeamName(teamIndex++),
                    awayTeamName: getTeamName(teamIndex++),
                    homeTeamScore: 1,
                    awayTeamScore: 0,
                    startDate: '2025-05-11T14:30:00Z',
                    nextMatchId: 0,
                }
            } else {
                match = {
                    id: currentId++,
                    round: round,
                    homeTeamId: undefined,
                    awayTeamId: undefined,
                    homeTeamName: undefined,
                    awayTeamName: undefined,
                    homeTeamScore: undefined,
                    awayTeamScore: undefined,
                    startDate: '2025-05-11T14:30:00Z',
                    nextMatchId: 0,
                }
            }

            matches.push(match)
        }
    }

    return matches
}

function generateLeagueKnockoutMatches(): MatchDto[] {
    const matches: MatchDto[] = [
        {
            id: 0,
            round: roundNames[2],
            homeTeamId: 0,
            awayTeamId: 1,
            homeTeamName: 'League round 4st place',
            awayTeamName: 'League round 3st place',
            homeTeamScore: undefined,
            awayTeamScore: undefined,
            startDate: '2025-05-11T14:30:00Z',
            nextMatchId: 0,
        },
        {
            id: 2,
            round: roundNames[1],
            homeTeamId: 2,
            awayTeamId: undefined,
            homeTeamName: 'League round 2st place',
            awayTeamName: undefined,
            homeTeamScore: undefined,
            awayTeamScore: undefined,
            startDate: '2025-05-11T14:30:00Z',
            nextMatchId: 0,
        },
        {
            id: 3,
            round: roundNames[0],
            homeTeamId: 3,
            awayTeamId: undefined,
            homeTeamName: 'League round 1st place',
            awayTeamName: undefined,
            homeTeamScore: undefined,
            awayTeamScore: undefined,
            startDate: '2025-05-11T14:30:00Z',
            nextMatchId: 0,
        },
    ]

    return matches
}
