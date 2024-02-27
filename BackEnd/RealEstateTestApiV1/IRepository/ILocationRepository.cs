using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface ILocationRepository
    {
        public List<Location> getAllLocation();
        public Task<Location> createLocationAsync(Location location);

        public void updateLocationById(Location location);
        public Location findLocationById(int id);

    }
}
