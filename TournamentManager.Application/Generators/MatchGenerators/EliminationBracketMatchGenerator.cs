using System;
using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Enums;

namespace TournamentManager.Application.Generators.MatchGenerators
{
    public class EliminationBracketMatchGenerator : IMatchGenerator
    {
        

        public Task<List<Match>> GenerateMatchesAsync(Tournament tournament, List<Team> teams, CancellationToken cancellationToken)
        {
            var matches = new List<Match>();
            var roundNumber = (int)Math.Log2(teams.Count);

            var roundNames = new[] { Round.roundOf16, Round.quarterfinals, Round.semifinals, Round.final   };

            var rounds = new List<List<Match>>();

            for (int i = 0; i < roundNumber; i++)
            {
                var currentRoundMatches = new List<Match>();
                var round = roundNames[i];
                int matchCount = (int)Math.Pow(2, roundNumber - i - 1); 

                for (int j = 0; j < matchCount; j++)
                {
                    Match match;
                    if (i == 0) 
                    {
                        match = new Match
                        {
                            Round = round,
                            HomeTeam = teams[j * 2],
                            AwayTeam = teams[j * 2 + 1]
                        };
                    }
                    else
                    {
                        match = new Match
                        {
                            Round = round
                        };
                    }

                    currentRoundMatches.Add(match);
                    matches.Add(match);
                }

                rounds.Add(currentRoundMatches);
            }

            for (int i = 0; i < rounds.Count - 1; i++)
            {
                var current = rounds[i];
                var next = rounds[i + 1];

                for (int j = 0; j < current.Count; j++)
                {
                    int nextIndex = j / 2;
                    current[j].NextMatch = next[nextIndex];
                }
            }




            return Task.FromResult(matches);
        }
    }
}
