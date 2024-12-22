namespace Users.Services;

public static class BuilderServicesExtensions
{
    public static IServiceCollection AddUserServices(this IServiceCollection services)
    {
        services
            .AddTransient<IEncryptionService, EncryptionService>()
            .AddTransient<IUserService, UserService>()
            .AddTransient<IAuthService, AuthService>();

        return services;
    }
}