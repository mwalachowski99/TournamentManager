using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TournamentManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedMatchGameCs2andcs2playerstats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MatchGameCs2s",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Map = table.Column<int>(type: "integer", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    HomeTeamScore = table.Column<int>(type: "integer", nullable: true),
                    AwayTeamScore = table.Column<int>(type: "integer", nullable: true),
                    MatchId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchGameCs2s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchGameCs2s_Matches_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerStatsCs2",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MatchGameId = table.Column<int>(type: "integer", nullable: false),
                    Kills = table.Column<int>(type: "integer", nullable: true),
                    Deaths = table.Column<int>(type: "integer", nullable: true),
                    Assists = table.Column<int>(type: "integer", nullable: true),
                    Enemy5ks = table.Column<int>(type: "integer", nullable: true),
                    Enemy4ks = table.Column<int>(type: "integer", nullable: true),
                    Enemy3ks = table.Column<int>(type: "integer", nullable: true),
                    Enemy2ks = table.Column<int>(type: "integer", nullable: true),
                    UtilityCount = table.Column<int>(type: "integer", nullable: true),
                    UtilityDamage = table.Column<int>(type: "integer", nullable: true),
                    UtilitySuccesses = table.Column<int>(type: "integer", nullable: true),
                    UtilityEnemies = table.Column<int>(type: "integer", nullable: true),
                    FlashCount = table.Column<int>(type: "integer", nullable: true),
                    FlashSuccesses = table.Column<int>(type: "integer", nullable: true),
                    HealthPointsRemovedTotal = table.Column<int>(type: "integer", nullable: true),
                    HealthPointsDealtTotal = table.Column<int>(type: "integer", nullable: true),
                    ShotsFiredTotal = table.Column<int>(type: "integer", nullable: true),
                    ShotsOnTargetTotal = table.Column<int>(type: "integer", nullable: true),
                    V1Count = table.Column<int>(type: "integer", nullable: true),
                    V1Wins = table.Column<int>(type: "integer", nullable: true),
                    V2Count = table.Column<int>(type: "integer", nullable: true),
                    V2Wins = table.Column<int>(type: "integer", nullable: true),
                    EntryCount = table.Column<int>(type: "integer", nullable: true),
                    EntryWins = table.Column<int>(type: "integer", nullable: true),
                    EquipmentValue = table.Column<int>(type: "integer", nullable: true),
                    MoneySaved = table.Column<int>(type: "integer", nullable: true),
                    KillReward = table.Column<int>(type: "integer", nullable: true),
                    LiveTime = table.Column<int>(type: "integer", nullable: true),
                    HeadShotKills = table.Column<int>(type: "integer", nullable: true),
                    CashEarned = table.Column<int>(type: "integer", nullable: true),
                    EnemiesFlashed = table.Column<int>(type: "integer", nullable: true),
                    PlayerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerStatsCs2", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayerStatsCs2_MatchGameCs2s_MatchGameId",
                        column: x => x.MatchGameId,
                        principalTable: "MatchGameCs2s",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerStatsCs2_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MatchGameCs2s_MatchId",
                table: "MatchGameCs2s",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerStatsCs2_MatchGameId",
                table: "PlayerStatsCs2",
                column: "MatchGameId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerStatsCs2_PlayerId",
                table: "PlayerStatsCs2",
                column: "PlayerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerStatsCs2");

            migrationBuilder.DropTable(
                name: "MatchGameCs2s");
        }
    }
}
