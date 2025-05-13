import ContentBox from '../../containers/ContentBox'
import { useEffect } from 'react'
import {
    getTournamentById,
    getTournamentLeagueTable,
    getTournamentResults,
} from '../../../actions/tournaments'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store/rootState'
import { useSelector } from 'react-redux'
import KonckoutPhaseResults from './KnockoutPhaseResults'
import {
    getKnockoutPhaseMatches,
    getLeaguePhaseMatches,
} from '../../../helpers/MatchHelpers'
import LeaguePhaseResults from './LeaguePhaseResults'
import { Box } from '@mui/material'
import { getTournamentPhases } from '../../../helpers/TournamentHelpers'

export default function TournamentResults() {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    const { tournamentResults, tournament, tournamentLeagueTable } =
        useSelector((state: RootState) => state.tournaments)

    const tournamentPhases = getTournamentPhases(tournament?.tournamentMode)

    useEffect(() => {
        {
            if (id) {
                dispatch(getTournamentById(id))
                dispatch(getTournamentResults(id))
                dispatch(getTournamentLeagueTable(id))
            }
        }
    }, [id])

    return (
        <>
            <ContentBox>
                <Box sx={{ padding: 2 }}>
                    {tournamentResults?.matches && (
                        <>
                            {tournamentPhases.includes('League') &&
                                tournamentLeagueTable?.teams && (
                                    <LeaguePhaseResults
                                        matches={getLeaguePhaseMatches(
                                            tournamentResults.matches
                                        )}
                                        teams={tournamentLeagueTable.teams}
                                    />
                                )}
                            {tournamentPhases.includes('Knockout') &&
                                tournament?.tournamentMode && (
                                    <KonckoutPhaseResults
                                        matches={getKnockoutPhaseMatches(
                                            tournamentResults.matches
                                        )}
                                        tournamentMode={
                                            tournament.tournamentMode
                                        }
                                    />
                                )}
                        </>
                    )}
                </Box>
            </ContentBox>
        </>
    )
}
