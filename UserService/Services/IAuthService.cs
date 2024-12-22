using Users.Services.DTO;

namespace Users.Services;

public interface IAuthService
{
    string Login(UserLoginDTO userLoginDto);
}