import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignIn from '../components/account/SignIn/SignIn'
import SignUp from '../components/account/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import TournamentList from '../components/tournaments/TournamentList'
import NavigationLayout from '../components/layout/navigation/NavigationLayout'
import TournamentDashboard from '../components/tournament/dashboard/TournamentDashboard'
import TournamentBracket from '../components/tournament/bracket/TournamentBracket'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'signIn', element: <SignIn /> },
            { path: 'signUp', element: <SignUp /> },
            {
                path: '',
                element: (
                    <PrivateRoute>
                        <NavigationLayout />
                    </PrivateRoute>
                ),
                children: [
                    { path: 'tournaments', element: <TournamentList /> },
                    {
                        path: 'tournament/:id',
                        element: <TournamentDashboard />,
                    },
                    {
                        path: 'tournament/:id/bracket',
                        element: <TournamentBracket />,
                    },
                    // dodaj kolejne ścieżki zalogowanych tu
                ],
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
