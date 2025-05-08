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
import ButtonBase from '@mui/material/ButtonBase'
import { TournamentDto } from '../../models/tournamentDto'
import {
    formatDate,
    formatDateTime,
    isFutureDate,
    isPastDate,
} from '../../helpers/DateHelpers'
import { useNavigate } from 'react-router-dom'

interface TournamentListItemProps {
    tournament: TournamentDto
}
export default function TournamentListItem({
    tournament,
}: TournamentListItemProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const navigate = useNavigate()

    const StyledCard = styled(Card)(({ theme }) => ({
        position: 'relative',
        display: 'flex',
        width: '100%',

        '&:hover': {
            border: '2px solid black',
        },
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

    const handleTournamentClick = () => {
        navigate(`/tournament/${tournament.id}`)
    }

    return (
        <StyledCard variant="outlined">
            <ButtonBase
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    textAlign: 'left',
                    width: '100%',
                    height: '100%',
                }}
                onClick={handleTournamentClick}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 'calc(100% - 151px)',
                        paddingRight: '16px',
                    }}
                >
                    <CardContent>
                        <Typography
                            component="div"
                            variant="h4"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {tournament.name}{' '}
                            {!isSmallScreen && <TournamentStateChip />}
                        </Typography>

                        <Typography
                            component="div"
                            variant="h6"
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
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {tournament.description}
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={`../../../public/images/games/${tournament.game}/logo.png`}
                    alt="Game logo"
                />
            </ButtonBase>
        </StyledCard>
    )
}
