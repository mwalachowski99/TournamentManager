
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using TournamentManager.Contracts.Dtos;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Entities;
using TournamentManager.Infrastructure;

namespace TournamentManager.Application.Commands.Tournaments.CreateTournament
{
    public class CreateTournamentCommandHandler : IRequestHandler<CreateTournamentCommand, CreateTournamentResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateTournamentCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CreateTournamentResponse> Handle(CreateTournamentCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var tournament = new Tournament
            {
                Name = request.Name,
                Description = request.Description,
                StartDate = DateTime.SpecifyKind(request.StartDate, DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(request.EndDate, DateTimeKind.Utc),
                Game = request.Game,
                UserId = userId,        
            };

            await _context.Tournaments.AddAsync(tournament, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            var tournamentDto = new TournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.StartDate, tournament.EndDate, tournament.Game);

            return new CreateTournamentResponse(tournamentDto);
        }
    }
}
