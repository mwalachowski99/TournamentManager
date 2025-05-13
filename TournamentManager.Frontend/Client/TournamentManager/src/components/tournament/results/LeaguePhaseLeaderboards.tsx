import { memo } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TeamStandingDto } from '../../../models/teamStandingDto'

interface LeaguePhaseResultsProps {
    teams: TeamStandingDto[]
}

export default memo(function LeaguePhaseResults({
    teams,
}: LeaguePhaseResultsProps) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }))

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ maxWidth: 70 }}>
                            Position
                        </StyledTableCell>
                        <StyledTableCell align="left">Team</StyledTableCell>
                        <StyledTableCell align="right" sx={{ maxWidth: 90 }}>
                            Big Points
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ maxWidth: 1000 }}>
                            Small Points
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team, i) => (
                        <StyledTableRow key={team.teamId}>
                            <StyledTableCell component="th" scope="row">
                                {i + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {team.teamName}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {team.bigPoints}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {team.smallPoints}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})
