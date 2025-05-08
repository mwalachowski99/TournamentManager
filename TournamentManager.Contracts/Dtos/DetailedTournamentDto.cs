

using TournamentManager.Domain.Enums;

namespace TournamentManager.Contracts.Dtos
{
    public record DetailedTournamentDto(int Id, string Name, string Description, DateTime StartDate, DateTime EndDate, Game Game, TournamentMode TournamentMode, bool IsConfigured );
}
