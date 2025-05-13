import { Round } from '../enums/round'
import { MatchDto } from '../models/matchDto'

export function getKnockoutPhaseMatches(matches: MatchDto[] | undefined) {
    if (!matches) {
        return []
    }
    const knockoutMatches = matches.filter(
        (match) => match.round !== Round.league
    )

    return knockoutMatches
}

export function getLeaguePhaseMatches(matches: MatchDto[] | undefined) {
    if (!matches) {
        return []
    }
    const knockoutMatches = matches.filter(
        (match) => match.round === Round.league
    )

    return knockoutMatches
}
