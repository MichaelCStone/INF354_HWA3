using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        // Data Members
      
        private readonly UserManager<AppUser> _userManager;


        // Default Contructors
        public AuthenticationController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }


        // Methods

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] UserViewModel model)
        {
            try
            {
                //verifies that the model is valid
                if (!ModelState.IsValid)
                {
                    return BadRequest("Incorrect, error occured");
                }

                //Verifies user is in system already 
                var checkUser = await _userManager.FindByEmailAsync(model.emailaddress);
                if (checkUser != null)
                {
                    return BadRequest("Error, account already registered");
                }


                // Creates the new user
                AppUser user = new AppUser();
                user.UserName = model.emailaddress;
                user.Email = model.emailaddress;
                var result = await _userManager.CreateAsync(user, model.password);
                if(result.Succeeded)
                {
                    return Ok("Registered successfully");
                }
                else
                {
                    return BadRequest(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] UserViewModel model)
        {
            try
            {
                //verifies that the model is valid
                if (!ModelState.IsValid)
                {
                    return BadRequest("wrong, not sure what but wrong");
                }

                //Verifies user email is in system already 
                AppUser checkUser = await _userManager.FindByEmailAsync(model.emailaddress);
                if (checkUser == null)
                {
                    return BadRequest("Error, try again later");
                }

    
                // Check if user password already exists 
                bool checkPassword = await _userManager.CheckPasswordAsync(checkUser, model.password);
                if (!checkPassword)
                {
                    return BadRequest("Username or Password is Incorrect");
                }

                return Ok("Logged In successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
