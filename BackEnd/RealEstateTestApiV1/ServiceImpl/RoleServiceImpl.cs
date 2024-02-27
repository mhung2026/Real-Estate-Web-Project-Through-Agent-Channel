using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class RoleServiceImpl:IRoleService
    {
        private IRoleRepository roleRepository;
        public RoleServiceImpl(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        public Role createRoleName(string roleName)
        {
            Role role = new Role()
            {
                RoleName = roleName,
                Status = true
            };
            roleRepository.createRole(role);
            return role;
        }

        public Role findRoleById(int id)
        {
            return roleRepository.findRoleById(id);
        }

        public void updateRoleById(Role role)
        {
            roleRepository.updateRoleById(role);
        }
    }
}
