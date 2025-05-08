using TournamentManager.Domain.Enums;

namespace TournamentManager.Domain.Dictionaries { 
    public static class GameTeamSizes
    {
        public static readonly Dictionary<Game, int> TeamSizes = new()
        {
            { Game.cs2, 5 },
            { Game.lol, 5 },
        };

        public static int GetTeamSize(Game game)
        {
            if (TeamSizes.TryGetValue(game, out var size))
                return size;

            throw new ArgumentOutOfRangeException(nameof(game), $"Team size not defined for game: {game}");
        }
    }
}