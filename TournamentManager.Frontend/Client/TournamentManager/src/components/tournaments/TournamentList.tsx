import { Box, Paper, Stack } from '@mui/material'
import TournamentListItem from './TournamentListItem'
import { TournamentDto } from '../../models/tournamentDto'
import { useState, useEffect } from 'react'
import apiConnector from '../../api/apiConnector'
import ContentBox from '../containers/ContentBox'
import AddIcon from '@mui/icons-material/Add'
import TournamentFormModal from './addTournament/AddTournamentModal'
import { getTournaments } from '../../actions/tournaments'
import { useAppDispatch } from '../../store/useAppDispatch'
import RegularButton from '../buttons/RegularButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'

export default function TournamentList() {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const { tournaments } = useSelector((state: RootState) => state.tournaments)

    useEffect(() => {
        dispatch(getTournaments())
    }, [])

    return (
        <>
            <ContentBox>
                <Stack
                    spacing={{ xs: 1, sm: 3 }}
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: 'wrap' }}
                    padding="2%"
                    justifyContent="center"
                >
                    {tournaments?.length !== 0 &&
                        tournaments?.map((tournament: TournamentDto) => (
                            <TournamentListItem
                                key={tournament.id}
                                tournament={tournament}
                            />
                        ))}
                </Stack>
                <Box>
                    <RegularButton
                        text={'NEW TOURNAMENT'}
                        image={<AddIcon />}
                        onClick={() => setIsAddModalOpen(true)}
                    />
                </Box>
            </ContentBox>
            <TournamentFormModal
                isOpen={isAddModalOpen}
                handleClose={() => setIsAddModalOpen(false)}
            />
        </>
    )
}
