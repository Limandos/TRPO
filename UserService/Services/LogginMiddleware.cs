using Users.Services.RabbitMQ;

namespace Users.Services
{
    public class LogginMiddleware(RequestDelegate _next, IRabbitMqService _rabbitMqService)
    {
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            finally
            {
                _rabbitMqService.SendMessage($"{DateTime.Now}: [{context.Request.Method}] \"{context.Request.Path}\" - {context.Response.StatusCode}");
            }
        }
    }
}