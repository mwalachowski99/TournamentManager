namespace TournamentManager.Domain.Entities
{
    public abstract class MatchGame : BaseEntity
    {
        public DateTime? StartDate { get; set; }
        public int? HomeTeamScore { get; set; }
        public int? AwayTeamScore { get; set; }

        public required Match Match { get; set; }
    }
}
