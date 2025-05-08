
using TournamentManager.Contracts.Dtos;

namespace TournamentManager.Contracts.Responses.Tournaments
{
    public record GetTournamentsResponse(List<TournamentDto> TournamentDtos);
    
}
