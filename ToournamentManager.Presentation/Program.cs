using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.BearerToken;
using TournamentManager.Infrastructure;
using TournamentManager.Presentation.Handlers;
using TournamentManager.Presentation.Modules;
using TournamentManager.Application;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policyBuilder =>
    {
        policyBuilder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173");
    });
});

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddApplication();
builder.Services.AddExceptionHandler<ExceptionHandler>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AppDbContext>();


builder.Services.ConfigureAll<BearerTokenOptions>(option =>
{
    option.BearerTokenExpiration = TimeSpan.FromMinutes(15);
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseExceptionHandler(_ => { });
app.UseCors("CorsPolicy");
app.MapIdentityApi<IdentityUser>();
app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

//app.MapControllers();

app.AddTournamentsEndpoints();
app.AddMatchGamesEndpoints();
app.Run();
