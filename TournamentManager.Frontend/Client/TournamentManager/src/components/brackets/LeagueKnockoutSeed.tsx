import type { IRenderSeedProps } from 'react-brackets'
import { SingleLineSeed, Seed, SeedItem, SeedTeam } from 'react-brackets'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface EliminationBracketSeedProps extends IRenderSeedProps {
    previewMode: boolean
    totalRounds: number
}

export default function LeagueKnockoutSeed({
    seed,
    breakpoint,
    roundIndex,
    previewMode,
    totalRounds,
}: EliminationBracketSeedProps): JSX.Element {
    const homeTeam = seed.teams[0]
    const awayTeam = seed.teams[1]

    const navigate = useNavigate()

    const onMatchClick = () => {
        if (!previewMode) {
            navigate(`/match/${seed.id}`)
        }
    }

    const isLineConnector = roundIndex < totalRounds - 1

    const Wrapper = isLineConnector ? SingleLineSeed : Seed

    return (
        <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
            <Box
                component={SeedItem}
                onClick={() => {
                    onMatchClick()
                }}
                sx={{
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                    '&:active': {
                        border: '1px solid red',
                        opacity: 0.6,
                    },
                }}
            >
                <div>
                    <SeedTeam
                        style={{
                            backgroundColor:
                                homeTeam.score > awayTeam.score && 'red',
                        }}
                    >
                        <div>{homeTeam.name ? homeTeam.name : '----'}</div>
                        <div>{homeTeam.score ?? ''}</div>
                    </SeedTeam>
                    <SeedTeam
                        style={{
                            backgroundColor:
                                homeTeam.score < awayTeam.score && 'red',
                        }}
                    >
                        <div>{awayTeam.name ? awayTeam.name : '----'}</div>
                        <div>{awayTeam.score ?? ''}</div>
                    </SeedTeam>
                </div>
            </Box>
        </Wrapper>
    )
}
