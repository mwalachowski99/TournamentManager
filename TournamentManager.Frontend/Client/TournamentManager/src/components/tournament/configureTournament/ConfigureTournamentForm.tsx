import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Game } from '../../../enums/game'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { addTournament } from '../../../actions/tournaments'
import { TournamentMode } from '../../../enums/tournamentMode'
import tournaments from '../../../reducers/tournaments'
import EliminationBracket from '../../../brackets/EliminationBracket'

interface FormValues {
    tournamentMode: TournamentMode
    teamNumber: number
}

interface AddTournamentFormProps {
    handleClose: () => void
}

export default function ConfigureTournamentForm({
    handleClose,
}: AddTournamentFormProps) {
    const { errorMessage } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object().shape({})

    const onSubmit = (values: FormValues) => {
        const data = {
            id: undefined,
            tournamentMode: values.tournamentMode,
            teamNumber: values.teamNumber,
        }
        console.log('values', values)
        console.log('data', data)
    }

    const formik = useFormik({
        initialValues: {
            tournamentMode: TournamentMode.leagueKnockout,
            teamNumber: 4,
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    })

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
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                </Select>
            </FormControl>
            <EliminationBracket />

            <Button type="submit" fullWidth variant="contained">
                Zapisz
            </Button>
        </Box>
    )
}
