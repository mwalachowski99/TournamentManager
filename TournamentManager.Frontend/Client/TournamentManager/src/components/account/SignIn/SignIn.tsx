import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccountCard from '../AccountCard'
import { darkGrey } from '../../../styles/colors'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { signIn } from '../../../actions/auth'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import signInBackground from '../../../../public/images/auth/signInBackground.jpg'

import * as Yup from 'yup'

interface FormValues {
    email: string
    password: string
    remember: boolean
}

export default function SignIn() {
    const { isAuthenticated, errorMessage } = useSelector(
        (state: RootState) => state.auth
    )

    const dispatch = useAppDispatch()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    })

    const onSubmit = (values: FormValues) => {
        dispatch(
            signIn(values.email ?? '', values.password ?? '', values.remember)
        )
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    })

    return isAuthenticated ? (
        <Navigate to="/tournaments" />
    ) : (
        <Box
            sx={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${signInBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <AccountCard variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                    }}
                >
                    Sign in
                </Typography>
                {errorMessage && (
                    <Typography color="error" sx={{ textAlign: 'center' }}>
                        {errorMessage}
                    </Typography>
                )}
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
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            (formik.touched.email && formik.errors.email) ||
                                errorMessage
                        )}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                            (formik.touched.password &&
                                formik.errors.password) ||
                                errorMessage
                        )}
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <FormControlLabel
                        id="remember"
                        name="remember"
                        value={formik.values.remember}
                        onChange={formik.handleChange}
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button type="submit" fullWidth variant="contained">
                        Sign in
                    </Button>
                    <Link
                        component="button"
                        type="button"
                        //onClick={handleClickOpen}
                        sx={{
                            alignSelf: 'center',
                            color: darkGrey,
                        }}
                    >
                        Forgot your password?
                    </Link>
                    <Divider>or</Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/SignUp/"
                                sx={{
                                    alignSelf: 'center',
                                    color: darkGrey,
                                }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </AccountCard>
        </Box>
    )
}
