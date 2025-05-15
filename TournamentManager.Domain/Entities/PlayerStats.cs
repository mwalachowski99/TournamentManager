namespace TournamentManager.Domain.Entities
{
    public abstract class PlayerStats : BaseEntity
    {
        public required Player Player { get; set; }
    }
}
