using Users.Services.DTO;

namespace Users.Services;

public interface IUserService
{
    IEnumerable<UserDTO> GetAll();

    UserDTO GetById(int id);

    UserDTO Create(UserCreateDTO userCreateDto);

    void Update(UserDTO userDTO);

    void Delete(int userId);
}