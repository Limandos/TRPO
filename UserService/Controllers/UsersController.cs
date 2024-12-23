using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public IEnumerable<UserDTO> GetUsers()
        {
            return _userService.GetAll();
        }

        [HttpGet("{id}")]
        [Authorize]
        public UserDTO GetUserById(int id)
        {
            return _userService.GetById(id);
        }

        [HttpPost]
        [Authorize]
        public UserDTO CreateUser([FromBody] UserCreateDTO userCreateDto)
        {
            return _userService.Create(userCreateDto);
        }

        [HttpPut]
        [Authorize]
        public void UpdateUser([FromBody] UserDTO userDto)
        {
            _userService.Update(userDto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public void DeleteUser(int id)
        {
            _userService.Delete(id);
        }
    }
}