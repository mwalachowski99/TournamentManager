import { Box } from '@mui/material'
import { useState } from 'react'
import {
    Bracket,
    Seed,
    SeedItem,
    SeedTeam,
    SingleLineSeed,
} from 'react-brackets'

export default function EliminationBracket() {
    const CustomSeed = ({ seed, title, breakpoint, roundIndex, seedIndex }) => {
        // breakpoint passed to Bracket component
        // to check if mobile view is triggered or not
        // mobileBreakpoint is required to be passed down to a seed
        const homeTeam = seed.teams[0]
        const awayTeam = seed.teams[1]
        console.log(seed.type)

        return (
            <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
                <Box
                    component={SeedItem}
                    onClick={() => console.log(seed.id)}
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
                            <div>{homeTeam.score}</div>
                        </SeedTeam>
                        <SeedTeam
                            style={{
                                backgroundColor:
                                    homeTeam.score < awayTeam.score && 'red',
                            }}
                        >
                            <div>{awayTeam.name ? awayTeam.name : '----'}</div>
                            <div>{awayTeam.score}</div>
                        </SeedTeam>
                    </div>
                </Box>
            </Seed>
        )
    }

    const rounds = [
        {
            seeds: [
                {
                    id: 1,
                    teams: [
                        { id: 1, name: '', score: null },
                        { id: 3, name: '', score: null },
                    ],
                },
                {
                    id: 1,
                    teams: [
                        { id: 1, name: '測試高中B', score: 2 },
                        { id: 3, name: '測試高中C', score: 1 },
                    ],
                },
            ],
        },
        {
            seeds: [
                {
                    id: 1,
                    teams: [
                        { id: 1, name: '泰山高中', score: 10 },
                        { id: 3, name: '測試高中B', score: 6 },
                    ],
                },
            ],
        },
        {
            seeds: [
                {
                    id: 1,
                    teams: [
                        { id: 1, name: '泰山高中', score: 0 },
                        { id: 3, name: '成功高中', score: 6 },
                    ],
                },
            ],
        },
    ]

    return (
        <div className="App">
            <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
        </div>
    )
}
