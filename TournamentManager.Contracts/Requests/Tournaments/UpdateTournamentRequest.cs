
using TournamentManager.Domain.Enums;

namespace TournamentManager.Contracts.Requests.Tournaments
{
    public record UpdateTournamentRequest(string Name, string Description, DateTime StartDate, DateTime EndDate, Game Game);
}
