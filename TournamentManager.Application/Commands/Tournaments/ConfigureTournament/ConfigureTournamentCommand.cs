using MediatR;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Enums;

namespace TournamentManager.Application.Commands.Tournaments.ConfigureTournament
{
    public record ConfigureTournamentCommand(int Id, TournamentMode TournamentMode, int TeamNumber) : IRequest<ConfigureTournamentResponse>;
}
