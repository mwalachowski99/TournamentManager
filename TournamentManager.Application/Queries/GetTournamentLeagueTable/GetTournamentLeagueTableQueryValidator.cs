using FluentValidation;
using TournamentManager.Application.Queries.GetTournamentResults;
using TournamentManager.Domain.Entities;

namespace TournamentManager.Application.Queries.GetTournamentLeagueTable
{
    public class GetTournamentLeagueTableQueryValidator : AbstractValidator<GetTournamentLeagueTableQuery>
    {
        public GetTournamentLeagueTableQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Tournament.Id)} cannot be empty");
        }
    }
}
