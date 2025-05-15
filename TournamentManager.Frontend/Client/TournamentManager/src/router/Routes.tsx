import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignIn from '../components/account/SignIn/SignIn'
import SignUp from '../components/account/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import TournamentList from '../components/tournaments/TournamentList'
import NavigationLayout from '../components/layout/navigation/NavigationLayout'
import TournamentDashboard from '../components/tournament/dashboard/TournamentDashboard'
import TournamentResults from '../components/tournament/results/TournamentResults'
import { MatchOverview } from '../components/match/MatchOverview'

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
                        path: 'tournament/:id/results',
                        element: <TournamentResults />,
                    },
                    {
                        path: 'match/:id',
                        element: <MatchOverview />,
                    },
                ],
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
