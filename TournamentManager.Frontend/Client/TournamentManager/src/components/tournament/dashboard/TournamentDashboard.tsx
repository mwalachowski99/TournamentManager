import { Stack } from '@mui/material'

import ContentBox from '../../containers/ContentBox'

import TournamentInfoBox from './TournamentInfoBox'

import { RootState } from '../../../store/rootState'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTournamentById } from '../../../actions/tournaments'
import { useAppDispatch } from '../../../store/useAppDispatch'
import TournamentNotConfiguredBox from './TournamentNotConfiguredBox'
import ConfigureTournamentModal from '../configureTournament/ConfigureTournamentModal'

export default function TournamentDashboard() {
    const { tournament } = useSelector((state: RootState) => state.tournaments)
    const [isConfigureModalOpen, setIsConfigureModalOpen] =
        useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        {
            if (id) dispatch(getTournamentById(id))
        }
    }, [id])

    return (
        <>
            <ContentBox>
                {tournament && (
                    <Stack
                        spacing={{ xs: 1, sm: 3 }}
                        direction="row"
                        useFlexGap
                        sx={{ flexWrap: 'wrap' }}
                        padding="2%"
                        justifyContent="center"
                    >
                        <TournamentInfoBox tournament={tournament} />
                        {!tournament.isConfigured && (
                            <TournamentNotConfiguredBox
                                openModal={() => setIsConfigureModalOpen(true)}
                            />
                        )}
                    </Stack>
                )}

                <Link to={`/tournament/${id}/bracket`}> test</Link>
            </ContentBox>
            <ConfigureTournamentModal
                isOpen={isConfigureModalOpen}
                handleClose={() => setIsConfigureModalOpen(false)}
            />
        </>
    )
}
