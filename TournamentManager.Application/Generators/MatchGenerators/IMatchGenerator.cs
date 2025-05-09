using TournamentManager.Domain.Entities;

public interface IMatchGenerator
{
    Task<List<Match>> GenerateMatchesAsync(Tournament tournament, List<Team> teams, CancellationToken cancellationToken);
}