using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Users.Domain;
using Users.Services.DTO;

namespace Users.Services;

public class AuthService
    (IConfiguration configuration,
    IEncryptionService encryptionService,
    DatabaseContext databaseContext) : IAuthService
{
    public string Login(UserLoginDTO userLoginDto)
    {
        var user = databaseContext.Users.Where(user => user.Login == userLoginDto.Login).FirstOrDefault() ?? throw new Exception($"Пользователь {userLoginDto.Login} не найден.");

        if (!encryptionService.VerifyPassword(userLoginDto.Password, user.PasswordHash, user.PasswordSalt))
        {
            throw new Exception("Неверный пароль.");
        }

        return CreateToken(user);
    }

    private string CreateToken(User user)
    {
        var claimList = new List<Claim>
        {
            new("name", user.Name),
            new("role", "ADMIN")
        };

        var token = new JwtSecurityToken(
            claims: claimList,
            expires: DateTime.UtcNow.Add(TimeSpan.FromHours(1)),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:JWTKey").Value)), SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}