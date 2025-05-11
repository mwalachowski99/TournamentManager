import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { TournamentMode } from '../../../enums/tournamentMode'
import EliminationBracket from '../../brackets/TournamentBracket'
import { generateMatchesForMode } from '../../../utils/matchGenerator'
import { useEffect, useMemo } from 'react'
import { getTeamNumberOptions } from '../../../helpers/TournamentHelpers'
import { configureTournament } from '../../../actions/tournaments'

interface FormValues {
    tournamentMode: TournamentMode
    teamNumber: number
}

interface AddTournamentFormProps {
    handleClose: () => void
    tournamentId: string
}

export default function ConfigureTournamentForm({
    handleClose,
    tournamentId,
}: AddTournamentFormProps) {
    const { errorMessage } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object().shape({})

    const onSubmit = (values: FormValues) => {
        dispatch(
            configureTournament(
                tournamentId,
                values.tournamentMode,
                values.teamNumber
            )
        ).then(() => {
            handleClose()
        })
    }

    const formik = useFormik({
        initialValues: {
            tournamentMode: TournamentMode.leagueKnockout,
            teamNumber: 4,
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    })

    const generateMatches = useMemo(
        () =>
            generateMatchesForMode(
                formik.values.tournamentMode,
                formik.values.teamNumber
            ),
        [formik.values.tournamentMode, formik.values.teamNumber]
    )

    const teamOptions = useMemo(
        () => getTeamNumberOptions(formik.values.tournamentMode),
        [formik.values.tournamentMode]
    )

    useEffect(() => {
        const defaultValue = 4
        if (formik.values.teamNumber !== defaultValue) {
            formik.setFieldValue('teamNumber', defaultValue)
        }
    }, [formik.values.tournamentMode])

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}
        >
            <FormControl>
                <InputLabel>Tournament Mode</InputLabel>
                <Select
                    id="tournamentMode"
                    name="tournamentMode"
                    value={formik.values.tournamentMode}
                    label="Tournament Mode"
                    onChange={(e) => {
                        const newValue = e.target.value
                        formik.setFieldValue('tournamentMode', newValue)
                    }}
                >
                    <MenuItem value={TournamentMode.leagueKnockout}>
                        League knockout
                    </MenuItem>
                    <MenuItem value={TournamentMode.eliminationBracket}>
                        Elimination bracket
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Team Number</InputLabel>
                <Select
                    id="teamNumber"
                    name="teamNumber"
                    value={formik.values.teamNumber}
                    label="Team Number"
                    onChange={(e) => {
                        const newValue = e.target.value
                        formik.setFieldValue('teamNumber', newValue)
                    }}
                >
                    {teamOptions.map((val) => (
                        <MenuItem key={val} value={val}>
                            {val}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <EliminationBracket
                matches={generateMatches}
                previewMode={true}
                tournamentMode={formik.values.tournamentMode}
            />

            <Button type="submit" fullWidth variant="contained">
                Zapisz
            </Button>
        </Box>
    )
}
