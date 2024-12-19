using Users.Services.DTO;

namespace Users.Services;

public interface IUserService
{
    IEnumerable<UserDTO> GetAll();

    UserDTO Create(UserCreateDTO userCreateDto);

    void Update(UserDTO userDTO);

    void Delete(int userId);
}