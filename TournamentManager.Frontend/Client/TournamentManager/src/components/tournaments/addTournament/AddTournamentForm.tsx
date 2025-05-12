import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
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

interface FormValues {
    name: string
    description: string
    startDate: Dayjs
    endDate: Dayjs
    game: Game
}

interface AddTournamentFormProps {
    setImage: React.Dispatch<React.SetStateAction<string>>
    handleClose: () => void
}

export default function AddTournamentForm({
    setImage,
    handleClose,
}: AddTournamentFormProps) {
    const { addTournamentErrorMessage } = useSelector(
        (state: RootState) => state.tournaments
    )
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.mixed<Dayjs>()
            .required('End date is required')
            .test(
                'is-after-start',
                'End date must be after start date',
                function (value) {
                    const { startDate } = this.parent
                    return (
                        dayjs(value).isValid() &&
                        dayjs(startDate).isValid() &&
                        dayjs(value).isAfter(dayjs(startDate))
                    )
                }
            ),
    })

    const onSubmit = (values: FormValues) => {
        const tournament = {
            id: undefined,
            name: values.name,
            description: values.description,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
            game: values.game,
        }
        dispatch(addTournament(tournament)).then(handleClose)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            startDate: dayjs(),
            endDate: dayjs().add(1, 'day'),
            game: Game.cs2,
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
            {addTournamentErrorMessage && (
                <Typography color="error" sx={{ textAlign: 'center' }}>
                    {addTournamentErrorMessage}
                </Typography>
            )}
            <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                    (formik.touched.name && formik.errors.name) ||
                        addTournamentErrorMessage
                )}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                type="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                    (formik.touched.description && formik.errors.description) ||
                        addTournamentErrorMessage
                )}
                helperText={
                    formik.touched.description && formik.errors.description
                }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start Date"
                    value={formik.values.startDate}
                    onChange={(value) =>
                        formik.setFieldValue('startDate', value)
                    }
                    onError={(reason) => {
                        if (reason) {
                            formik.setFieldError('startDate', 'Invalid date')
                        }
                    }}
                    slotProps={{
                        textField: {
                            onBlur: formik.handleBlur,
                            error: Boolean(
                                (formik.touched.startDate &&
                                    formik.errors.startDate) ||
                                    addTournamentErrorMessage
                            ),
                            helperText:
                                formik.touched.startDate &&
                                typeof formik.errors.startDate === 'string'
                                    ? formik.errors.startDate
                                    : undefined,
                        },
                    }}
                />

                <DateTimePicker
                    label="End Date"
                    value={formik.values.endDate}
                    onChange={(value) => formik.setFieldValue('endDate', value)}
                    onError={(reason) => {
                        if (reason) {
                            formik.setFieldError('endDate', 'Invalid date')
                        }
                    }}
                    slotProps={{
                        textField: {
                            onBlur: formik.handleBlur,
                            error: Boolean(
                                (formik.touched.endDate &&
                                    formik.errors.endDate) ||
                                    addTournamentErrorMessage
                            ),
                            helperText:
                                formik.touched.endDate &&
                                typeof formik.errors.endDate === 'string'
                                    ? formik.errors.endDate
                                    : undefined,
                        },
                    }}
                />
            </LocalizationProvider>
            <FormControl
                error={Boolean(
                    (formik.touched.game && formik.errors.game) ||
                        addTournamentErrorMessage
                )}
            >
                <InputLabel>Game</InputLabel>
                <Select
                    id="game"
                    name="game"
                    value={formik.values.game}
                    label="Game"
                    onChange={(e) => {
                        const newValue = e.target.value
                        formik.setFieldValue('game', newValue)
                        setImage(
                            `../../../../images/games/${newValue}/cover.png`
                        )
                    }}
                >
                    <MenuItem value={Game.cs2}>Counter Strike 2</MenuItem>
                    <MenuItem value={Game.lol}>League of Legends</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
                Zapisz
            </Button>
        </Box>
    )
}
