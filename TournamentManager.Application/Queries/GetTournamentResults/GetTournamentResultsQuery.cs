using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;

namespace TournamentManager.Application.Queries.GetTournamentResults
{
    public record GetTournamentResultsQuery(int Id) : IRequest<GetTournamentResultsResponse>;
}
