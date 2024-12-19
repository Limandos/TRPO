namespace Users.Services;

public static class BuilderServicesExtensions
{
    public static IServiceCollection AddUserServices(this IServiceCollection services)
    {
        services
            .AddTransient<IAuthorizationService, AuthorizationService>()
            .AddTransient<IUserService, UserService>();

        return services;
    }
}