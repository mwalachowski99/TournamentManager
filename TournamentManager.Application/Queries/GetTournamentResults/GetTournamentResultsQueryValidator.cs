using FluentValidation;
using TournamentManager.Domain.Entities;

namespace TournamentManager.Application.Queries.GetTournamentResults
{
    public class GetTournamentResultsQueryValidator : AbstractValidator<GetTournamentResultsQuery>
    {
        public GetTournamentResultsQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Tournament.Id)} cannot be empty");
        }
    }
}
