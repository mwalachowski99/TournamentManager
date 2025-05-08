using TournamentManager.Domain.Enums;

namespace TournamentManager.Domain.Entities
{
    public class Tournament : BaseEntity
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public Game Game { get; set; }
        public TournamentMode TournamentMode { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IsConfigured { get; set; } = false;

        public required string UserId { get; set; }
    }
}
