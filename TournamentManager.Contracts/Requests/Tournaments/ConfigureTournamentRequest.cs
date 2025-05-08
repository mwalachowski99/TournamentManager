using TournamentManager.Domain.Enums;

namespace TournamentManager.Contracts.Requests.Tournaments
{
    public record ConfigureTournamentRequest(TournamentMode TournamentMode, int TeamNumber);
}
