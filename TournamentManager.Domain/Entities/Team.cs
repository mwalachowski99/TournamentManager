namespace TournamentManager.Domain.Entities
{
    public class Team : BaseEntity
    {
        public required string Name { get; set; }

        public required Tournament Tournament { get; set; }

    }
}
