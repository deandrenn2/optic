using Carter;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Optic.Application.Infrastructure.Files;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Authentications;
using Optic.Infrastructure.Authentications;
using System.Text;

namespace Optic.Application;

public static class DependencyConfig
{


    public static void AddAutenticationServices(this WebApplicationBuilder builder)
    {

        // Agrega el servicio de autorización
        builder.Services.AddAuthorization();

        // Optener JwtSettings desde appsettings.json
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");

        // Congiguración del servicio de autenticación JWT
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
            };
        });
    }

    public static void AddInfraestructure(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IManagerToken, ManagerToken>();
        builder.Services.AddScoped<IFileManager, FileManager>();
    }

    public static IServiceCollection AddApplicationCore(this IServiceCollection services)
    {
        services.AddCarter();
        services.AddAutoMapper(typeof(Application));
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(typeof(Application).Assembly);
            //config.AddOpenBehavior(typeof(TransactionBehaviour<,>));
        });
        services.AddValidatorsFromAssemblyContaining(typeof(Application));


        return services;
    }

    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config.GetConnectionString("SqliteConn");

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(connectionString));

        return services;
    }


    public static IServiceCollection ConfigureServices(this IServiceCollection services)
    {
        // Configuración de CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin", builder =>
            {
                builder.WithOrigins("http://localhost:5173", "https://localhost:5173")  // Permite cualquier origen
                       .AllowAnyMethod()  // Permite cualquier método HTTP (GET, POST, PUT, DELETE, etc.)
                       .AllowAnyHeader(); // Permite cualquier cabecera
            });
        });

        return services;
    }


}