using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;
using System.Reflection.Metadata.Ecma335;

namespace RealEstateTestApi.Repository
{
    public class RoleRepository:IRoleRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public RoleRepository(SWPRealEstateContext swpRealEstateContext) {
            this.swpRealEstateContext = swpRealEstateContext;
        }

        public void createRole(Role role)
        {
            swpRealEstateContext.Roles.Add(role);
            swpRealEstateContext.SaveChanges();
        }

        public Role findRoleById(int id)
        {
            Role role = swpRealEstateContext.Roles.Find(id);
            return role;
        }

        public List<Role> getAllRole()
        {
            List<Role> roleList = swpRealEstateContext.Roles.ToList();
            return roleList;
        }

        public void updateRoleById(Role role)
        {
            swpRealEstateContext.Roles.Update(role);
            swpRealEstateContext.SaveChanges();
        }
    }
}
