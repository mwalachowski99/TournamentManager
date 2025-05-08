
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using TournamentManager.Infrastructure;
using TournamentManager.Application;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.BearerToken;
using TournamentManager.Presentation.Handlers;
using TournamentManager.Presentation.Modules;

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
builder.Services.AddApplication();
builder.Services.AddExceptionHandler<ExceptionHandler>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.ConfigureAll<BearerTokenOptions>(option =>
{
    option.BearerTokenExpiration = TimeSpan.FromMinutes(5);
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
app.Run();
