
using TournamentManager.Domain.Enums;

namespace TournamentManager.Contracts.Dtos
{
    public record MatchDto(int Id, int? HomeTeamId, int? AwayTeamId, string? HomeTeamName, string? AwayTeamName, int? HomeTeamScore, int? AwayTeamScore, DateTime? StartDate, Round Round);
}
