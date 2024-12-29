namespace Users.Services.RabbitMQ;

public interface IRabbitMqService
{
    Task SendMessage(string message);
}