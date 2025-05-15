using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Enums.Cs2;

namespace TournamentManager.Contracts.Dtos
{
    public record MatchGameCs2Dto(int Id, Match Match, int? HomeTeamScore, int? AwayTeamScore, DateTime? StartDate, PlayerStatsCs2Dto[] HomeTeamPlayersStatsCs2, PlayerStatsCs2Dto[] AwayTeamPlayersStatsCs2, Map? Map);
}
