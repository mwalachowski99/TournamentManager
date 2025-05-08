using TournamentManager.Domain.Enums;

namespace TournamentManager.Domain.Entities
{
    public class Match : BaseEntity
    {
        public Team? HomeTeam { get; set; }
        public Team? AwayTeam { get; set; }
        public DateTime StartDate { get; set; }
        public Round Round { get; set; }
    }
}
