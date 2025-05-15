using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TournamentManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class setTeaminPlayerasrequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchGameCs2s_Matches_MatchId",
                table: "MatchGameCs2s");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerStatsCs2_MatchGameCs2s_MatchGameId",
                table: "PlayerStatsCs2");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerStatsCs2_Players_PlayerId",
                table: "PlayerStatsCs2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayerStatsCs2",
                table: "PlayerStatsCs2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchGameCs2s",
                table: "MatchGameCs2s");

            migrationBuilder.RenameTable(
                name: "PlayerStatsCs2",
                newName: "PlayersStatsCs2");

            migrationBuilder.RenameTable(
                name: "MatchGameCs2s",
                newName: "MatchGamesCs2");

            migrationBuilder.RenameIndex(
                name: "IX_PlayerStatsCs2_PlayerId",
                table: "PlayersStatsCs2",
                newName: "IX_PlayersStatsCs2_PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_PlayerStatsCs2_MatchGameId",
                table: "PlayersStatsCs2",
                newName: "IX_PlayersStatsCs2_MatchGameId");

            migrationBuilder.RenameIndex(
                name: "IX_MatchGameCs2s_MatchId",
                table: "MatchGamesCs2",
                newName: "IX_MatchGamesCs2_MatchId");

            migrationBuilder.AlterColumn<int>(
                name: "TeamId",
                table: "Players",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayersStatsCs2",
                table: "PlayersStatsCs2",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchGamesCs2",
                table: "MatchGamesCs2",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchGamesCs2_Matches_MatchId",
                table: "MatchGamesCs2",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayersStatsCs2_MatchGamesCs2_MatchGameId",
                table: "PlayersStatsCs2",
                column: "MatchGameId",
                principalTable: "MatchGamesCs2",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayersStatsCs2_Players_PlayerId",
                table: "PlayersStatsCs2",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchGamesCs2_Matches_MatchId",
                table: "MatchGamesCs2");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayersStatsCs2_MatchGamesCs2_MatchGameId",
                table: "PlayersStatsCs2");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayersStatsCs2_Players_PlayerId",
                table: "PlayersStatsCs2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayersStatsCs2",
                table: "PlayersStatsCs2");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchGamesCs2",
                table: "MatchGamesCs2");

            migrationBuilder.RenameTable(
                name: "PlayersStatsCs2",
                newName: "PlayerStatsCs2");

            migrationBuilder.RenameTable(
                name: "MatchGamesCs2",
                newName: "MatchGameCs2s");

            migrationBuilder.RenameIndex(
                name: "IX_PlayersStatsCs2_PlayerId",
                table: "PlayerStatsCs2",
                newName: "IX_PlayerStatsCs2_PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_PlayersStatsCs2_MatchGameId",
                table: "PlayerStatsCs2",
                newName: "IX_PlayerStatsCs2_MatchGameId");

            migrationBuilder.RenameIndex(
                name: "IX_MatchGamesCs2_MatchId",
                table: "MatchGameCs2s",
                newName: "IX_MatchGameCs2s_MatchId");

            migrationBuilder.AlterColumn<int>(
                name: "TeamId",
                table: "Players",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayerStatsCs2",
                table: "PlayerStatsCs2",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchGameCs2s",
                table: "MatchGameCs2s",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchGameCs2s_Matches_MatchId",
                table: "MatchGameCs2s",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerStatsCs2_MatchGameCs2s_MatchGameId",
                table: "PlayerStatsCs2",
                column: "MatchGameId",
                principalTable: "MatchGameCs2s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerStatsCs2_Players_PlayerId",
                table: "PlayerStatsCs2",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
