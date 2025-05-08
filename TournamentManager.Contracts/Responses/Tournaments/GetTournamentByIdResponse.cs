
using TournamentManager.Contracts.Dtos;

namespace TournamentManager.Contracts.Responses.Tournaments
{
    public record GetTournamentByIdResponse(DetailedTournamentDto TournamentDto);
    
}
