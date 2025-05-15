using FluentValidation;
namespace TournamentManager.Application.Commands.MatchGames.CreateMatchGameCs2
{
   
        public class ConfigureTournamentCommandValidator : AbstractValidator<CreateMatchGameCs2Command>
        {
            public ConfigureTournamentCommandValidator()
            {
                RuleFor(x => x.MatchId)
                    .NotEmpty()
                    .WithMessage("MatchId cannot be empty");
            }
        }
}
