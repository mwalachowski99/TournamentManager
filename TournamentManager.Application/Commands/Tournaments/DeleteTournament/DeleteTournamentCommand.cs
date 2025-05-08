using MediatR;

namespace TournamentManager.Application.Commands.Tournaments.DeleteTournament
{
    public record DeleteTournamentCommand(int Id) : IRequest<Unit>;
}
