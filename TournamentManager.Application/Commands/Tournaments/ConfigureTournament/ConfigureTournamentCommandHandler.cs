using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TournamentManager.Contracts.Exceptions;
using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Dictionaries;
using TournamentManager.Infrastructure;
using TournamentManager.Contracts.Errors;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Contracts.Dtos;

namespace TournamentManager.Application.Commands.Tournaments.ConfigureTournament
{
    public class ConfigureTournamentCommandHandler : IRequestHandler<ConfigureTournamentCommand, ConfigureTournamentResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly MatchGeneratorFactory _matchGeneratorFactory;

        public ConfigureTournamentCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor, MatchGeneratorFactory matchGeneratorFactory)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _matchGeneratorFactory = matchGeneratorFactory;
        }

        public async Task<ConfigureTournamentResponse> Handle(ConfigureTournamentCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }


            var tournament = await _context.Tournaments.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken)
               ?? throw new NotFoundException($"{nameof(Tournament)} with {nameof(Tournament.Id)}: {request.Id} was not found in database");

            if (tournament.IsConfigured)
            {
                throw new CustomValidationException(new List<ValidationError>
                    {
                        new ValidationError
                        {
                            Property = "TournamentId",
                            ErrorMessage = "This tournament has already been configured."
                        }
                    });
            }



            var teams = new List<Team>();

            for (int i = 0; i < request.TeamNumber; i++)
            {
                char teamLetter = (char)('A' + i);
                var team = new Team
                {
                    Name = $"Team {teamLetter}",
                    Tournament = tournament
                };
                teams.Add(team);
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


            var matchGenerator = _matchGeneratorFactory.GetGenerator(request.TournamentMode);
            var matches = await matchGenerator.GenerateMatchesAsync(tournament, teams, cancellationToken);

            

            tournament.TournamentMode = request.TournamentMode;
            tournament.IsConfigured = true;

            _context.Tournaments.Update(tournament);


            await _context.Matches.AddRangeAsync(matches, cancellationToken);


            await _context.SaveChangesAsync(cancellationToken);

            var tournamentDto = new DetailedTournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.StartDate, tournament.EndDate, tournament.Game, tournament.TournamentMode, tournament.IsConfigured);

            return new ConfigureTournamentResponse(tournamentDto);
        }
    }
}
