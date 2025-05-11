import { MatchDto } from '../models/matchDto'
import { Round } from '../enums/round'

const roundTitles: Record<Round, string> = {
    [Round.final]: 'Final',
    [Round.semifinals]: 'Semifinals',
    [Round.quarterfinals]: 'Quarterfinals',
    [Round.roundOf16]: 'Round of 16',
    [Round.league]: 'League',
}

export function convertMatchesToRounds(matches: MatchDto[]) {
    const grouped = matches.reduce(
        (acc, match) => {
            const roundKey = match.round
            if (!acc[roundKey]) {
                acc[roundKey] = []
            }
            acc[roundKey].push(match)
            return acc
        },
        {} as Record<string, MatchDto[]>
    )

    const rounds = Object.entries(grouped).map(([round, seeds]) => ({
        title: roundTitles[round as Round] ?? round,
        seeds: seeds.map((match) => ({
            id: match.id ?? 0,
            date: new Date(match.startDate).toDateString(),
            teams: [
                {
                    id: match.homeTeamId ?? 0,
                    name: match.homeTeamName ?? '',
                    score: match.homeTeamScore,
                },
                {
                    id: match.awayTeamId ?? 0,
                    name: match.awayTeamName ?? '',
                    score: match.awayTeamScore,
                },
            ],
        })),
    }))

    return rounds
}
