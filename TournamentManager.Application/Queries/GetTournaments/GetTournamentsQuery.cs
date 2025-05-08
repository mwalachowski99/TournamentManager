
using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;

namespace TournamentManager.Application.Queries.GetTournaments
{
    public record GetTournamentsQuery() : IRequest<GetTournamentsResponse>;
}
