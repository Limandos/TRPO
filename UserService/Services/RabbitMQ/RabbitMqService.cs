using RabbitMQ.Client;
using System.Text;

namespace Users.Services.RabbitMQ;

public class RabbitMqService : IRabbitMqService
{
    private const string HostName = "localhost";

    public async Task SendMessage(string message)
    {
        var factory = new ConnectionFactory() { HostName = HostName };
        using var connection = await factory.CreateConnectionAsync();
        using var channel = await connection.CreateChannelAsync();
        await channel.QueueDeclareAsync("logQueue", false, false, false, null);

        var body = Encoding.UTF8.GetBytes(message);

        await channel.BasicPublishAsync("", "logQueue", body);
    }
}