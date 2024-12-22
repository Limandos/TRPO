namespace Users.Services;

public class TokenContent
{
    public string Name { get; set; }
    public IEnumerable<string> Scope { get; set; }
}