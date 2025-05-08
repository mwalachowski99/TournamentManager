
using Mapster;
using TournamentManager.Contracts.Responses.Tournaments;
using TournamentManager.Domain.Entities;

namespace TournamentManager.Application.Mapping
{
    public class MappingConfig
    {
        public static void Configure()
        {
            TypeAdapterConfig<List<Tournament>, GetTournamentsResponse>.NewConfig()
                .Map(dest => dest.TournamentDtos, src => src);

            TypeAdapterConfig<Tournament, GetTournamentByIdResponse>.NewConfig()
                .Map(dest => dest.TournamentDto, src => src);
        }
    }
}
