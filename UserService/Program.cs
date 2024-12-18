using Steeltoe.Discovery.Client;
using Steeltoe.Discovery.Eureka;

namespace UserService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddServiceDiscovery(options =>
            {
                options.UseEureka();
            });

            var app = builder.Build();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}"
            );

            app.Run();
        }
    }
}
