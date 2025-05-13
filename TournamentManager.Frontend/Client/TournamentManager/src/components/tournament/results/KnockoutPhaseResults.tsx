import { memo } from 'react'
import { TournamentMode } from '../../../enums/tournamentMode'
import { MatchDto } from '../../../models/matchDto'
import TournamentBracket from '../../brackets/TournamentBracket'
import { Typography, useMediaQuery } from '@mui/material'

interface KnockoutPhaseResultsProps {
    matches: MatchDto[]
    tournamentMode: TournamentMode
}

export default memo(function KonckoutPhaseResults({
    matches,
    tournamentMode,
}: KnockoutPhaseResultsProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    return (
        <>
            <Typography
                component="div"
                variant={!isSmallScreen ? 'h2' : 'h4'}
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    paddingY: 1,
                }}
            >
                Knockout Phase
            </Typography>
            <TournamentBracket
                matches={matches}
                previewMode={false}
                tournamentMode={tournamentMode}
            />
        </>
    )
})
