using Microsoft.AspNetCore.Mvc;
using Users.Services;
using Users.Services.DTO;

namespace Users.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsersController(IUserService _userService) : ControllerBase
    {
        [HttpGet]
        public IEnumerable<UserDTO> GetUsers()
        {
            return _userService.GetAll();
        }

        [HttpPost]
        public UserDTO CreateUser([FromBody] UserCreateDTO userCreateDto)
        {
            return _userService.Create(userCreateDto);
        }

        [HttpPut]
        public void UpdateUser([FromBody] UserDTO userDto)
        {
            _userService.Update(userDto);
        }

        [HttpDelete("{id}")]
        public void DeleteUser(int id)
        {
            _userService.Delete(id);
        }
    }
}