using Microsoft.Extensions.DependencyInjection;
using TournamentManager.Application.Generators.MatchGenerators;
using TournamentManager.Domain.Enums;

public class MatchGeneratorFactory
{
    private readonly IServiceProvider _serviceProvider;

    public MatchGeneratorFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public IMatchGenerator GetGenerator(TournamentMode mode)
    {
        return mode switch
        {
            TournamentMode.eliminationBracket => _serviceProvider.GetRequiredService<EliminationBracketMatchGenerator>(),
            TournamentMode.leagueKnockout => _serviceProvider.GetRequiredService<LeagueKnockoutMatchGenerator>(),
            _ => throw new NotImplementedException($"No match scheduler implemented for mode {mode}")
        };
    }
}