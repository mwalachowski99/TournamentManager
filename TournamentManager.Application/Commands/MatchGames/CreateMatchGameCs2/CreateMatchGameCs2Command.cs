using MediatR;
using TournamentManager.Contracts.Responses.MatchGames;

namespace TournamentManager.Application.Commands.MatchGames.CreateMatchGameCs2
{
    public record CreateMatchGameCs2Command(int MatchId) : IRequest<CreateMatchGameCs2Response>;
}
