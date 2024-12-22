using Microsoft.AspNetCore.Mvc;
using Users.Services;
using Users.Services.DTO;

namespace Users.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController(IAuthService _authenticationService, IEncryptionService _encryptionService) : ControllerBase
{
    [HttpPost]
    public IActionResult Login([FromBody] UserLoginDTO userLoginDto)
    {
        try
        {
            return Ok(_authenticationService.Login(userLoginDto));
        }
        catch (Exception e)
        {
            return Unauthorized(e.Message);
        }
    }

    [HttpPost]
    public TokenContent Decrypt([FromBody] RequestTokenDto requestTokenDto)
    {
        return _encryptionService.ParseJwt(requestTokenDto.Token);
    }
}