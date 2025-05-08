

using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Enums;

namespace TournamentManager.Application.Commands.Tournaments.UpdateTournament
{
    public record UpdateTournamentCommand(int Id, string Name, string Description, DateTime StartDate, DateTime EndDate, Game Game) : IRequest<UpdateTournamentResponse>;
}
