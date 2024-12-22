namespace Users.Services;

public interface IEncryptionService
{
    void EncryptPassword(string password, out byte[] passwordHash, out byte[] passwordSalt);
    bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt);
    TokenContent ParseJwt(string requestToken);
}