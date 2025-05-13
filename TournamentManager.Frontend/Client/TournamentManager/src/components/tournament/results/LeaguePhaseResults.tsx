import { memo } from 'react'
import { MatchDto } from '../../../models/matchDto'
import { TeamStandingDto } from '../../../models/teamStandingDto'
import { Box, Typography, useMediaQuery } from '@mui/material'
import LeaguePhaseLeaderboards from './LeaguePhaseLeaderboards'
import LeaguePhaseMatches from './LeaguePhaseMatches'

interface LeaguePhaseResultsProps {
    matches: MatchDto[]
    teams: TeamStandingDto[]
}

export default memo(function LeaguePhaseResults({
    matches,
    teams,
}: LeaguePhaseResultsProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    return (
        <Box sx={{ marginBottom: 1 }}>
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
                League Phase
            </Typography>
            <LeaguePhaseLeaderboards teams={teams} />
            <LeaguePhaseMatches matches={matches} />
        </Box>
    )
})
