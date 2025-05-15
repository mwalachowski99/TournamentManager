namespace TournamentManager.Domain.Entities.cs2
{
    public class PlayerStatsCs2 : PlayerStats
    {
        public required MatchGameCs2 MatchGame { get; set; }
        public int? Kills { get; set; }
        public int? Deaths { get; set; }
        public int? Assists { get; set; }
        public int? Enemy5ks { get; set; }
        public int? Enemy4ks { get; set; }
        public int? Enemy3ks { get; set; }
        public int? Enemy2ks { get; set; }
        public int? UtilityCount { get; set; }
        public int? UtilityDamage { get; set; }
        public int? UtilitySuccesses { get; set; }
        public int? UtilityEnemies { get; set; }
        public int? FlashCount { get; set; }
        public int? FlashSuccesses { get; set; }
        public int? HealthPointsRemovedTotal { get; set; }
        public int? HealthPointsDealtTotal { get; set; }
        public int? ShotsFiredTotal { get; set; }
        public int? ShotsOnTargetTotal { get; set; }
        public int? V1Count { get; set; }
        public int? V1Wins { get; set; }
        public int? V2Count { get; set; }
        public int? V2Wins { get; set; }
        public int? EntryCount { get; set; }
        public int? EntryWins { get; set; }
        public int? EquipmentValue { get; set; }
        public int? MoneySaved { get; set; }
        public int? KillReward { get; set; }
        public int? LiveTime { get; set; }
        public int? HeadShotKills { get; set; }
        public int? CashEarned { get; set; }
        public int? EnemiesFlashed { get; set; }


    }
}