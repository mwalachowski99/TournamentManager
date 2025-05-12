

using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TournamentManager.Contracts.Exceptions;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Entities;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Queries.GetTournamentById
{
    public class GetTournamentByIdQueryHandler : IRequestHandler<GetTournamentByIdQuery, GetTournamentByIdResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetTournamentByIdQueryHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GetTournamentByIdResponse> Handle(GetTournamentByIdQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var tournament = await _context.Tournaments.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Tournament)} with {nameof(Tournament.Id)}: {request.Id} was not found in database");

            return tournament.Adapt<GetTournamentByIdResponse>();
        }
    }
}
