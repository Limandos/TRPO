using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Users.Services;

public class EncryptionService : IEncryptionService
{
    public void EncryptPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        var hmac = new HMACSHA256();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        var hmac = new HMACSHA256(passwordSalt);
        var loginHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

        return loginHash.SequenceEqual(passwordHash);
    }

    public TokenContent ParseJwt(string requestToken)
    {
        var content = new TokenContent();

        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(requestToken);
        var tokenS = jsonToken as JwtSecurityToken;

        content.Name = tokenS.Claims.First(claim => claim.Type == "name").Value;
        content.Scope = [tokenS.Claims.First(claim => claim.Type == "role").Value];

        return content;
    }
}