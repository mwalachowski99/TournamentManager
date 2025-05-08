import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    CardMedia,
    ButtonBase,
} from '@mui/material'

import { styled } from '@mui/material/styles'

interface TournamentNotConfiguredBoxProps {
    openModal: () => void
}

export default function TournamentNotConfiguredBox({
    openModal,
}: TournamentNotConfiguredBoxProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const imageSize = isSmallScreen ? 100 : 150

    const StyledCard = styled(Card)(() => ({
        position: 'relative',
        display: 'flex',
        height: 'auto',
        width: '100%',
        borderColor: 'orange',
        '&:hover': {
            border: '2px solid orange',
        },
    }))

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
                onClick={openModal}
            >
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
                            variant={!isSmallScreen ? 'h3' : 'h4'}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                color: 'orange',
                            }}
                        >
                            The tournament has not been configured yet.
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
                            Click this card to configure it.
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{
                        width: imageSize,
                        height: imageSize,
                        alignSelf: 'center',
                        marginRight: '10px',
                    }}
                    image={`../../../public/images/common/warning.png`}
                    alt="Warning icon"
                />
            </ButtonBase>
        </StyledCard>
    )
}
