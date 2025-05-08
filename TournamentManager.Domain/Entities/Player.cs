namespace TournamentManager.Domain.Entities
{
    public class Player : BaseEntity
    {
        public string? Name { get; set; }
        public Team? Team { get; set; }
    }
}
