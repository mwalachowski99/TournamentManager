using TournamentManager.Domain.Enums;

namespace TournamentManager.Domain.Entities
{
    public class Match : BaseEntity
    {
        public required Tournament Tournament { get; set; }
        public Team? HomeTeam { get; set; }
        public Team? AwayTeam { get; set; }
        public DateTime? StartDate { get; set; }
        public Round Round { get; set; }

        public Match? NextMatch { get; set; }

    }
}
