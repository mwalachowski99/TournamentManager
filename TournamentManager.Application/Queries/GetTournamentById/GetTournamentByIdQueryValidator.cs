
using FluentValidation;
using TournamentManager.Domain.Entities;

namespace TournamentManager.Application.Queries.GetTournamentById
{
    public class GetTournamentByIdQueryValidator : AbstractValidator<GetTournamentByIdQuery>
    {
        public GetTournamentByIdQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Tournament.Id)} cannot be empty");
        }
    }
}
