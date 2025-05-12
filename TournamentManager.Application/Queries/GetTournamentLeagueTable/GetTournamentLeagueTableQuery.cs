using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;

namespace TournamentManager.Application.Queries.GetTournamentResults
{
    public record GetTournamentLeagueTableQuery(int Id) : IRequest<GetTournamentLeagueTableResponse>;
}
