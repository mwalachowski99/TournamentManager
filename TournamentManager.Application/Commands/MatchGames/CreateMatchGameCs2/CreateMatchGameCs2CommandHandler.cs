using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TournamentManager.Contracts.Dtos;
using TournamentManager.Contracts.Exceptions;
using TournamentManager.Contracts.Responses.MatchGames;
using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Entities.cs2;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Commands.MatchGames.CreateMatchGameCs2
{
    public class CreateMatchGameCs2CommandHandler : IRequestHandler<CreateMatchGameCs2Command, CreateMatchGameCs2Response>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateMatchGameCs2CommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CreateMatchGameCs2Response> Handle(CreateMatchGameCs2Command request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var match = await _context.Matches
                .Include(x => x.HomeTeam)
                .Include(x => x.AwayTeam)
                .FirstOrDefaultAsync(x => x.Id == request.MatchId && x.Tournament.UserId == userId, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Match)} with {nameof(Match.Id)}: {request.MatchId} was not found in database");

            if (match.HomeTeam == null || match.AwayTeam == null)
                throw new InvalidOperationException("A match must have two teams assigned before adding a game.");

            var players = await _context.Players
                .Where(p =>
                    p.Team.Id == match.HomeTeam.Id || p.Team.Id == match.AwayTeam.Id)
                .ToListAsync(cancellationToken);


            var matchGameCs2 = new MatchGameCs2
            {
                Match = match,
            };

            await _context.MatchGamesCs2.AddAsync(matchGameCs2, cancellationToken);

            var playerStatsList = new List<PlayerStatsCs2>();

            foreach (var player in players)
            {
                var stats = new PlayerStatsCs2
                {
                    MatchGame = matchGameCs2,
                    Player = player
                };
                playerStatsList.Add(stats);
                await _context.PlayersStatsCs2.AddAsync(stats, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);

            PlayerStatsCs2Dto MapToDto(PlayerStatsCs2 stats) => new PlayerStatsCs2Dto(
                new PlayerDto(
                    stats.Player.Id,
                    stats.Player.Name,
                    stats.Player.Team.Name
                ),
                stats.Kills,
                stats.Deaths,
                stats.Assists,
                stats.Enemy5ks,
                stats.Enemy4ks,
                stats.Enemy3ks,
                stats.Enemy2ks,
                stats.UtilityCount,
                stats.UtilityDamage,
                stats.UtilitySuccesses,
                stats.UtilityEnemies,
                stats.FlashCount,
                stats.FlashSuccesses,
                stats.HealthPointsRemovedTotal,
                stats.HealthPointsDealtTotal,
                stats.ShotsFiredTotal,
                stats.ShotsOnTargetTotal,
                stats.V1Count,
                stats.V1Wins,
                stats.V2Count,
                stats.V2Wins,
                stats.EntryCount,
                stats.EntryWins,
                stats.EquipmentValue,
                stats.MoneySaved,
                stats.KillReward,
                stats.LiveTime,
                stats.HeadShotKills,
                stats.CashEarned,
                stats.EnemiesFlashed
            );

            var homeStats = playerStatsList
                .Where(ps => ps.Player.Team?.Id == match.HomeTeam.Id)
                .Select(MapToDto)
                .ToArray();

            var awayStats = playerStatsList
                .Where(ps => ps.Player.Team?.Id == match.AwayTeam.Id)
                .Select(MapToDto)
                .ToArray();

            var matchGameCs2Dto = new MatchGameCs2Dto(
                matchGameCs2.Id,
                match,
                matchGameCs2.HomeTeamScore,
                matchGameCs2.AwayTeamScore,
                matchGameCs2.StartDate,
                homeStats,
                awayStats,
                matchGameCs2.Map
            );

            return new CreateMatchGameCs2Response(matchGameCs2Dto);
        }
    }
}
