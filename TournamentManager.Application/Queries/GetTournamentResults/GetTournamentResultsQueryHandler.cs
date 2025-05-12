using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TournamentManager.Application.Queries.GetTournamentResults;
using TournamentManager.Contracts.Dtos;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Queries.GetTournamentById
{
    public class GetTournamentResultsQueryHandler : IRequestHandler<GetTournamentResultsQuery, GetTournamentResultsResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetTournamentResultsQueryHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GetTournamentResultsResponse> Handle(GetTournamentResultsQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var matches = await _context.Matches
               .Include(m => m.HomeTeam)
               .Include(m => m.AwayTeam)
               .Where(m => m.Tournament.Id == request.Id)
               .ToListAsync(cancellationToken);

            var matchDtos = matches
                .Select(m => new MatchDto(
                    Id: m.Id,
                    HomeTeamId: m.HomeTeam?.Id,
                    AwayTeamId: m.AwayTeam?.Id,
                    HomeTeamName: m.HomeTeam?.Name,
                    AwayTeamName: m.AwayTeam?.Name,
                    HomeTeamScore: null,
                    AwayTeamScore: null,
                    StartDate: m.StartDate,
                    Round: m.Round
                ))
                .ToArray();

            var tournamentResults = new TournamentResultsDto(
                Matches: matchDtos
            );

            return new GetTournamentResultsResponse(tournamentResults);
        }
    }
}
