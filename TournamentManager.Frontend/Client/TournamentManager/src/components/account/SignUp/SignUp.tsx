import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccountCard from '../AccountCard'
import { darkGrey } from '../../../styles/colors'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { signUp, signIn } from '../../../actions/auth'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import signUpBackground from '../../../../public/images/auth/signUpBackground.jpg'
import * as Yup from 'yup'

interface FormValues {
    email: string
    password: string
}

export default function SignUp() {
    const { isAuthenticated, errorMessage } = useSelector(
        (state: RootState) => state.auth
    )

    const dispatch = useAppDispatch()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, 'Passwords must be at least 6 characters')
            .max(30, 'Passwords must be at most 30 characters')
            .matches(/.*[1-9].*/, 'Password must contain at least one number')
            .matches(
                /.*[A-Z].*/,
                'Password must contain at least one uppercase letter'
            )
            .matches(
                /^(?=.*[^a-zA-Z0-9]).+$/,
                'Passwords must have at least one non alphanumeric character.'
            ),
    })

    const onSubmit = (values: FormValues) => {
        dispatch(signUp(values.email ?? '', values.password ?? ''))
            .then(() =>
                dispatch(
                    signIn(values.email ?? '', values.password ?? '', false)
                )
            )
            .catch()
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                backgroundImage: `url(${signUpBackground})`,
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
                    Sign up
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

                    <Button type="submit" fullWidth variant="contained">
                        Register
                    </Button>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/SignIn/"
                                sx={{
                                    alignSelf: 'center',
                                    color: darkGrey,
                                }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </AccountCard>
        </Box>
    )
}
