using MediatR;
using TournamentManager.Application.Commands.Tournaments.ConfigureTournament;
using TournamentManager.Application.Commands.Tournaments.CreateTournament;
using TournamentManager.Application.Commands.Tournaments.DeleteTournament;
using TournamentManager.Application.Commands.Tournaments.UpdateTournament;
using TournamentManager.Application.Queries.GetTournamentById;
using TournamentManager.Application.Queries.GetTournaments;
using TournamentManager.Contracts.Requests.Tournaments;

namespace TournamentManager.Presentation.Modules
{
    public static class TournamentModule
    {
        public static void AddTournamentsEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/api/tournaments", async (IMediator mediator, CancellationToken ct) =>
            {
                var tournaments = await mediator.Send(new GetTournamentsQuery(), ct);
                return Results.Ok(tournaments);
            }).WithTags("Tournaments").RequireAuthorization();

            app.MapGet("/api/tournaments/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
            {
                var tournament = await mediator.Send(new GetTournamentByIdQuery(id));
                return Results.Ok(tournament);

            }).WithTags("Tournaments").RequireAuthorization();

            app.MapPost("/api/tournaments", async (IMediator mediator, CreateTournamentRequest createTournamentRequest, CancellationToken ct) =>
            {
                var command = new CreateTournamentCommand(createTournamentRequest.Name, createTournamentRequest.Description, createTournamentRequest.StartDate, createTournamentRequest.EndDate, createTournamentRequest.Game);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Tournaments").RequireAuthorization();

            app.MapPut("/api/tournaments/{id}", async (IMediator mediator, int id, UpdateTournamentRequest updateTournamentRequest, CancellationToken ct) =>
            {
                var command = new UpdateTournamentCommand(id, updateTournamentRequest.Name, updateTournamentRequest.Description, updateTournamentRequest.StartDate, updateTournamentRequest.EndDate, updateTournamentRequest.Game);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Tournaments").RequireAuthorization();

            app.MapDelete("/api/tournaments/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
            {
                var command = new DeleteTournamentCommand(id);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Tournaments").RequireAuthorization();

            app.MapPut("/api/tournaments/configure/{id}", async (IMediator mediator, int id, ConfigureTournamentRequest configureTournamentRequest, CancellationToken ct) =>
            {
                var command = new ConfigureTournamentCommand(id, configureTournamentRequest.TournamentMode, configureTournamentRequest.TeamNumber);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Tournaments").RequireAuthorization();
        }
    }
}
