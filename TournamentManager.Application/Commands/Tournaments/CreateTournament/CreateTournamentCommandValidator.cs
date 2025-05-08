using FluentValidation;
using TournamentManager.Domain.Entities;

namespace TournamentManager.Application.Commands.Tournaments.CreateTournament
{
    public class CreateTournamentCommandValidator : AbstractValidator<CreateTournamentCommand>
    {
        public CreateTournamentCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage($"{nameof(Tournament.Name)} cannot be empty")
                .MaximumLength(30)
                .WithMessage($"{nameof(Tournament.Name)} cannot be longer than 30 characters");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage($"{nameof(Tournament.Description)} cannot be empty")
                .MaximumLength(500)
                .WithMessage($"{nameof(Tournament.Description)} cannot be longer than 500 characters");

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate)
                .WithMessage("End date must be after start date");

            RuleFor(x => x.Game)
                .IsInEnum()
                .WithMessage("Invalid game");

        }
    }
}
