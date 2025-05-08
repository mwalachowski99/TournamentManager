

using TournamentManager.Domain.Enums;

namespace TournamentManager.Contracts.Dtos
{
    public record TournamentDto(int Id, string Name, string Description, DateTime StartDate, DateTime EndDate, Game Game);
}
