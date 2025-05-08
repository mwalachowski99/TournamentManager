
using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;

namespace TournamentManager.Application.Queries.GetTournamentById
{
    public record GetTournamentByIdQuery(int Id) : IRequest<GetTournamentByIdResponse>;
}
