namespace Users.Services;

public interface IAuthorizationService
{
    void EncryptPassword(string password, out byte[] passwordHash, out byte[] passwordSalt);

    bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt);
}