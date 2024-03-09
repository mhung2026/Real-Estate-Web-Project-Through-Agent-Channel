using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/role/")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private IRoleRepository roleRepository;
        private IRoleService roleService;
        public RoleController(IRoleRepository roleRepository,IRoleService roleService)
        {
            this.roleRepository = roleRepository;
            this.roleService = roleService;
        }

        [HttpGet]
        [Route("getAllRole")]
        public IActionResult getAllRole()
        {
            try
            {
                List<Role> listRole = roleRepository.getAllRole();
                return Ok(listRole);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("CreateRole")]
        public IActionResult createRole(String roleName)
        {
            try
            {
                roleService.createRoleName(roleName);
                return Ok("Tạo mới vai trò thành công");
            }
            catch (Exception)
            {
                return BadRequest("Không thể tạo mới vai trò");
            }
        }

        [HttpPut]
        [Route("UpdateRoleById/{id}")]
        public IActionResult updateRolebyId(int id, RoleDto roleDto)
        {
            try
            {
                Role role = roleService.findRoleById(id);
                if (role == null)
                {
                    return BadRequest("Không tìm thấy id của vai trò");
                }
                role.RoleName = roleDto.RoleName;
                role.Status = roleDto.Status;
                roleService.updateRoleById(role);
                return Ok("Chỉnh sửa thành công");
            }
            catch
            {
                return BadRequest("Không thể chỉnh sửa trạng thái");
            }
        }

        [HttpGet]
        [Route("getRoleById/{id}")]
        public IActionResult getRoleById(int id)
        {
            try
            {
                Role role = roleService.findRoleById(id);
                if (role == null)
                {
                    return BadRequest("Không tìm thấy id");
                }
                return Ok(role);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
