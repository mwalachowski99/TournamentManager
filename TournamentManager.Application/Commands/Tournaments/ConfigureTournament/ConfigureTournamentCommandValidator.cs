using FluentValidation;
using TournamentManager.Domain.Enums;

namespace TournamentManager.Application.Commands.Tournaments.ConfigureTournament
{
    public class ConfigureTournamentCommandValidator : AbstractValidator<ConfigureTournamentCommand>
    {
        public ConfigureTournamentCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Id cannot be empty");

            RuleFor(x => x.TournamentMode)
                .IsInEnum()
                .WithMessage("Invalid tournament mode");


            RuleFor(x => x.TeamNumber)
            .Equal(4)
            .When(x => x.TournamentMode == TournamentMode.leagueKnockout)
            .WithMessage("For League knockout, team number must be exactly 4");

            RuleFor(x => x.TeamNumber)
                .Must(n => n == 4 || n == 8 || n == 16)
                .When(x => x.TournamentMode == TournamentMode.eliminationBracket)
                .WithMessage("For Elimination bracket, team number must be 4, 8, or 16");

        }
    }
}
