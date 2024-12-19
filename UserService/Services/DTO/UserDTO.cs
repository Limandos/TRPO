using Users.Domain;

namespace Users.Services.DTO;

public class UserDTO
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string? Department { get; set; }

    public static UserDTO FromDomain(User user)
    {
        var result = new UserDTO()
        {
            Id = user.Id,
            Name = user.Name,
            Department = user.Department
        };

        return result;
    }
}