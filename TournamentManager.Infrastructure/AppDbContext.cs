
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Entities.cs2;


namespace TournamentManager.Infrastructure
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext(options)
    {
        public DbSet<Tournament> Tournaments => Set<Tournament>();
        public DbSet<Team> Teams => Set<Team>();
        public DbSet<Player> Players => Set<Player>();
        public DbSet<Match> Matches => Set<Match>();
        public DbSet<MatchGameCs2> MatchGamesCs2 => Set<MatchGameCs2>();
        public DbSet<PlayerStatsCs2> PlayersStatsCs2 => Set<PlayerStatsCs2>();

    }
}
