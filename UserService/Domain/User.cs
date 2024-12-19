namespace Users.Domain;

public class User
{
    public int Id { get; set; }

    public string Login { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public string Name { get; set; }

    public string? Department { get; set; }
}
