

using System.Diagnostics;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Contracts.Exceptions;
using TournamentManager.Domain.Entities;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Commands.Tournaments.DeleteTournament
{
    internal class DeleteTournamentCommandHandler : IRequestHandler<DeleteTournamentCommand, Unit>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DeleteTournamentCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Unit> Handle(DeleteTournamentCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var tournamentToDelete = await _context.Tournaments.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Tournament)} with {nameof(Tournament.Id)}: {request.Id} was not found in database");

            _context.Tournaments.Remove(tournamentToDelete);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
