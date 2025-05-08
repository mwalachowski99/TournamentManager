import {
    Box,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Chip,
    useMediaQuery,
} from '@mui/material'

import { styled } from '@mui/material/styles'
import { TournamentDto } from '../../../models/tournamentDto'
import {
    formatDate,
    formatDateTime,
    isFutureDate,
    isPastDate,
} from '../../../helpers/DateHelpers'

interface TournamentListItemProps {
    tournament: TournamentDto
}
export default function TournamentInfoBox({
    tournament,
}: TournamentListItemProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const imageSize = isSmallScreen ? 151 : 251

    const StyledCard = styled(Card)(() => ({
        position: 'relative',
        display: 'flex',
        height: 'auto',
        width: '100%',
        padding: '2%',
    }))

    const TournamentStateChip = () => {
        if (isFutureDate(tournament.startDate)) {
            return <Chip label="Upcoming" color="warning" />
        } else if (isPastDate(tournament.endDate)) {
            return <Chip label="Finished" color="error" />
        } else {
            return <Chip label="Ongoing" color="success" />
        }
    }

    return (
        <StyledCard variant="outlined">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: `calc(100% - ${imageSize}px)`,
                    paddingRight: '16px',
                }}
            >
                <CardContent>
                    <Typography
                        component="div"
                        variant={!isSmallScreen ? 'h2' : 'h4'}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {tournament.name}{' '}
                        {!isSmallScreen && <TournamentStateChip />}
                    </Typography>

                    <Typography
                        component="div"
                        variant={!isSmallScreen ? 'h5' : 'h6'}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {isSmallScreen
                            ? `${formatDate(tournament.startDate)} - ${formatDate(tournament.endDate)}`
                            : `${formatDateTime(tournament.startDate)} - ${formatDateTime(tournament.endDate)}`}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                            color: 'text.secondary',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            lineHeight: '17px',
                            WebkitLineClamp: 5,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {tournament.description}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{
                    width: imageSize,
                    height: imageSize,
                }}
                image={`../../../public/images/games/${tournament.game}/logo.png`}
                alt="Game logo"
            />
        </StyledCard>
    )
}
