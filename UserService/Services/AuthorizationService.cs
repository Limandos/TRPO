using System.Security.Cryptography;
using System.Text;

namespace Users.Services;

public class AuthorizationService : IAuthorizationService
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
}