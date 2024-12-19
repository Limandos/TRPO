using Users.Domain;
using Users.Services.DTO;

namespace Users.Services;

public class UserService
    (
        IAuthorizationService _authorizationService,
        DatabaseContext _databaseContext
    ) : IUserService
{
    public IEnumerable<UserDTO> GetAll()
    {
        return _databaseContext.Users.Select(UserDTO.FromDomain);
    }

    public UserDTO Create(UserCreateDTO userCreateDto)
    {
        var user = new User()
        {
            Name = userCreateDto.Name,
            Login = userCreateDto.Login
        };

        _authorizationService.EncryptPassword(userCreateDto.Password, out var passwordHash, out var passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        _databaseContext.Users.Add(user);
        _databaseContext.SaveChanges();

        return UserDTO.FromDomain(user);
    }

    public void Update(UserDTO userDTO)
    {
        if (_databaseContext.Users.FirstOrDefault(u => u.Id == userDTO.Id) is var user && user == null)
        {
            throw new Exception("Такого юзера нет.");
        }

        user.Name = userDTO.Name;
        user.Department = userDTO.Department;

        _databaseContext.Users.Update(user);
        _databaseContext.SaveChanges();
    }

    public void Delete(int userId)
    {
        if (_databaseContext.Users.FirstOrDefault(u => u.Id == userId) is var user && user == null)
        {
            throw new Exception("Такого юзера нет.");
        }

        _databaseContext.Users.Remove(user);
        _databaseContext.SaveChanges();
    }
}