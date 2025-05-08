using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Contracts.Dtos;
using TournamentManager.Contracts.Exceptions;
using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Dictionaries;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Commands.Tournaments.ConfigureTournament
{
    public class ConfigureTournamentCommandHandler : IRequestHandler<ConfigureTournamentCommand, Unit>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ConfigureTournamentCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(ConfigureTournamentCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var tournament = await _context.Tournaments
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken);

            if (tournament == null)
            {
                throw new NotFoundException($"{nameof(Tournament)} with {nameof(Tournament.Id)}: {request.Id} was not found in database");
            }

            for (int i = 0; i < request.TeamNumber; i++)
            {
                char teamLetter = (char)('A' + i);
                var team = new Team
                {
                    Name = $"Team {teamLetter}",
                    Tournament = tournament
                };
                await _context.Teams.AddAsync(team, cancellationToken);

                for(int j = 0; j < GameTeamSizes.GetTeamSize(tournament.Game); j++)
                {
                    var player = new Player
                    {
                        Name = $"Player {teamLetter}{j + 1}",
                        Team = team,
                    };
                    await _context.Players.AddAsync(player, cancellationToken);
                }
            }


          
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
