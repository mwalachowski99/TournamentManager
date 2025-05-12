using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Application.Queries.GetTournamentResults;
using TournamentManager.Contracts.Dtos;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Queries.GetTournamentLeagueTable
{
    public class GetTournamentLeagueTableQueryHandler : IRequestHandler<GetTournamentLeagueTableQuery, GetTournamentLeagueTableResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetTournamentLeagueTableQueryHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GetTournamentLeagueTableResponse> Handle(GetTournamentLeagueTableQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var teams = await _context.Teams
               .Where(m => m.Tournament.Id == request.Id)
               .ToListAsync(cancellationToken);

            var teamStandings = teams
                .Select(m => new TeamStandingDto(
                    TeamId: m.Id,
                    TeamName: m.Name,
                    BigPoints: 0,
                    SmallPoints: 0
                ))
                .ToArray();

            var leagueTable = new TournamentLeagueTableDto(
                Teams: teamStandings
            );

            return new GetTournamentLeagueTableResponse(leagueTable);
        }
    }
}
