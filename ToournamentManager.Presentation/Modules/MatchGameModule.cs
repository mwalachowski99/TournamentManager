using MediatR;
using TournamentManager.Application.Commands.MatchGames.CreateMatchGameCs2;
using TournamentManager.Contracts.Requests.Matches;

namespace TournamentManager.Presentation.Modules
{
    public static class MatchGameModule
    {
        public static void AddMatchGamesEndpoints(this IEndpointRouteBuilder app)
        {
            

            app.MapPost("/api/matchGames/cs2", async (IMediator mediator, CreateMatchGameCs2Request createMatchGameCs2Request, CancellationToken ct) =>
            {
                var command = new CreateMatchGameCs2Command(createMatchGameCs2Request.MatchId);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("MatchGames").RequireAuthorization();

           
        }
    }
}
