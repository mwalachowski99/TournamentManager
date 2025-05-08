using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Enums;

namespace TournamentManager.Application.Commands.Tournaments.CreateTournament
{
    public record CreateTournamentCommand(string Name, string Description, DateTime StartDate, DateTime EndDate, Game Game) : IRequest<CreateTournamentResponse>;
}
