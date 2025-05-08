
using FluentValidation;
using TournamentManager.Domain.Entities;

namespace TournamentManager.Application.Commands.Tournaments.DeleteTournament
{
    public class DeleteTournamentCommandValidator : AbstractValidator<DeleteTournamentCommand>
    {
        public DeleteTournamentCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Tournament.Id)} cannot be empty");
        }
    }
}
