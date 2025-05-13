import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { MatchDto } from '../../../models/matchDto'
import { memo } from 'react'
import { formatDateTime } from '../../../helpers/DateHelpers'

interface LeaguePhaseMatchesProps {
    matches: MatchDto[]
}

export default memo(function LeaguePhaseMatches({
    matches,
}: LeaguePhaseMatchesProps) {
    const handleMatchClick = (matchId: number | undefined) => {
        if (matchId) console.log('Test', matchId) // Wypisanie w konsoli ID meczu (lub innej informacji)
    }

    return (
        <Box mt={4}>
            <Typography variant="h4" sx={{ paddingY: 1 }}>
                Matches
            </Typography>
            <Grid container spacing={3}>
                {matches.map((match) => (
                    <Grid
                        key={
                            match.id ??
                            `${match.homeTeamName}-${match.awayTeamName}-${match.startDate}`
                        }
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2,
                                height: 100,
                                background:
                                    'linear-gradient(to right, #bbdefb, #f8bbd0)',
                                cursor: 'pointer',
                                '&:hover': {
                                    background:
                                        'linear-gradient(to right, #90caf9, #f48fb1)',
                                },
                            }}
                            onClick={() => handleMatchClick(match.id)}
                        >
                            <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <Box
                                        display="flex"
                                        width="100%"
                                        alignItems="center"
                                    >
                                        <Box
                                            flex={1}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                textAlign="center"
                                            >
                                                {match.homeTeamName ?? '----'}
                                            </Typography>
                                        </Box>

                                        <Box
                                            minWidth={80}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                            >
                                                {match.homeTeamScore ?? '–'} :{' '}
                                                {match.awayTeamScore ?? '–'}
                                            </Typography>
                                        </Box>

                                        <Box
                                            flex={1}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                textAlign="center"
                                            >
                                                {match.awayTeamName ?? '----'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {match.startDate && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            mt={1}
                                            textAlign="center"
                                        >
                                            {formatDateTime(match.startDate)}
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
})
