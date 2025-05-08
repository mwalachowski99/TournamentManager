
using System.Security.Claims;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Entities;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Queries.GetTournaments
{
    public class GetTournamentsQueryHandler : IRequestHandler<GetTournamentsQuery, GetTournamentsResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetTournamentsQueryHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GetTournamentsResponse> Handle(GetTournamentsQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var tournaments = await _context.Tournaments.Where(a => a.UserId == userId).ToListAsync(cancellationToken);

            return tournaments.Adapt<GetTournamentsResponse>();
        }
    }
}
