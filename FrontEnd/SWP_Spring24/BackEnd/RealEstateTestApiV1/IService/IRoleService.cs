using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IRoleService
    {
        public Role createRoleName(String role);
        public void updateRoleById(Role role);
        public Role findRoleById(int id);
    }
}
