using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IRoleRepository
    {
        public List<Role> getAllRole();
        public void createRole(Role role);
        public void updateRoleById(Role role);
        public Role findRoleById(int id);
    }
}
