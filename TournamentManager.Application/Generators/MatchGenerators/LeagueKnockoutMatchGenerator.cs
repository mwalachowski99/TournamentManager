using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentManager.Domain.Entities;
using TournamentManager.Domain.Enums;

namespace TournamentManager.Application.Generators.MatchGenerators
{
    public class LeagueKnockoutMatchGenerator : IMatchGenerator
    {


        public Task<List<Match>> GenerateMatchesAsync(Tournament tournament, List<Team> teams, CancellationToken cancellationToken)
        {
            var matches = new List<Match>();

            matches.Add(new Match { Round = Round.league, HomeTeam = teams[0], AwayTeam = teams[3] }); 
            matches.Add(new Match { Round = Round.league, HomeTeam = teams[1], AwayTeam = teams[2] }); 
            matches.Add(new Match { Round = Round.league, HomeTeam = teams[3], AwayTeam = teams[2] }); 
            matches.Add(new Match { Round = Round.league, HomeTeam = teams[0], AwayTeam = teams[1] }); 
            matches.Add(new Match { Round = Round.league, HomeTeam = teams[1], AwayTeam = teams[3] }); 
            matches.Add(new Match { Round = Round.league, HomeTeam = teams[2], AwayTeam = teams[0] });

            matches.Add(new Match { Round = Round.final });
            matches.Add(new Match { Round = Round.semifinals, NextMatch = matches.Last() });
            matches.Add(new Match { Round = Round.quarterfinals, NextMatch = matches.Last() });

            return Task.FromResult(matches);
        }
    }
}
