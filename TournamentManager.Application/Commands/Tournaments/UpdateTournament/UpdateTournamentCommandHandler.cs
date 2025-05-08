
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Contracts.Dtos;
using TournamentManager.Contracts.Exceptions;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Entities;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Commands.Tournaments.UpdateTournament
{
    public class UpdateTournamentCommandHandler : IRequestHandler<UpdateTournamentCommand, UpdateTournamentResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateTournamentCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UpdateTournamentResponse> Handle(UpdateTournamentCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var tournamentToUpdate = await _context.Tournaments.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Tournament)} with {nameof(Tournament.Id)}: {request.Id} was not found in database");

            tournamentToUpdate.Description = request.Description;
            tournamentToUpdate.Name = request.Name;
            tournamentToUpdate.StartDate = request.StartDate;
            tournamentToUpdate.EndDate = request.EndDate;
            tournamentToUpdate.Game = request.Game;

            _context.Tournaments.Update(tournamentToUpdate);

            await _context.SaveChangesAsync(cancellationToken);

            var tournamentDto = new TournamentDto(tournamentToUpdate.Id, tournamentToUpdate.Name, tournamentToUpdate.Description, tournamentToUpdate.StartDate, tournamentToUpdate.EndDate, tournamentToUpdate.Game);

            return new UpdateTournamentResponse(tournamentDto);
        }
    }
}
