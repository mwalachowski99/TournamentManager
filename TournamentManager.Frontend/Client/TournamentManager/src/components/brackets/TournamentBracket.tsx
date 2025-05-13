import { Box } from '@mui/material'
import { Bracket } from 'react-brackets'
import { MatchDto } from '../../models/matchDto'
import { useState, useEffect, useMemo, memo } from 'react'
import { useMediaQuery } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button } from '@mui/material'
import EliminationBracketSeed from './EliminationBracketSeed'
import { convertMatchesToRounds } from '../../helpers/BracketHelpers'
import LeagueKnockoutSeed from './LeagueKnockoutSeed'
import { TournamentMode } from '../../enums/tournamentMode'

interface TournamentBracketProps {
    matches: MatchDto[]
    previewMode: boolean
    tournamentMode: TournamentMode
}

export default memo(function TournamentBracket({
    matches,
    previewMode = false,
    tournamentMode,
}: TournamentBracketProps) {
    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        setTabIndex(0)
    }, [matches])

    const handleSwipeChange = (index: number) => {
        setTabIndex(index)
    }

    const isSmallScreen = useMediaQuery(
        `(max-width:${!previewMode ? 1050 : 1200}px)`
    )

    const rounds = useMemo(() => convertMatchesToRounds(matches), [matches])

    return (
        <Box>
            {isSmallScreen && (
                <Box display="flex" justifyContent="center" gap={2} mb={2}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        color="inherit"
                        onClick={() => setTabIndex((prev) => prev - 1)}
                        disabled={tabIndex === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        color="inherit"
                        onClick={() => setTabIndex((prev) => prev + 1)}
                        disabled={tabIndex === rounds.length - 1}
                    >
                        Next
                    </Button>
                </Box>
            )}
            <Box
                sx={{
                    '*': {
                        minHeight: 'unset !important',
                    },
                }}
            >
                <Bracket
                    rounds={rounds}
                    renderSeedComponent={(props) =>
                        tournamentMode === TournamentMode.leagueKnockout ? (
                            <LeagueKnockoutSeed
                                {...props}
                                previewMode={previewMode}
                                totalRounds={rounds.length}
                            />
                        ) : (
                            <EliminationBracketSeed
                                {...props}
                                previewMode={previewMode}
                            />
                        )
                    }
                    mobileBreakpoint={!previewMode ? 1050 : 1200}
                    swipeableProps={{
                        enableMouseEvents: true,
                        animateHeight: true,
                        index: tabIndex,
                        onChangeIndex: handleSwipeChange,
                    }}
                />
            </Box>
        </Box>
    )
})
