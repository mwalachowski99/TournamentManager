
using TournamentManager.Domain.Enums;

namespace TournamentManager.Contracts.Requests.Tournaments
{
    public record CreateTournamentRequest(string Name, string Description, DateTime StartDate, DateTime EndDate, Game Game);
}
