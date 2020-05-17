using System.Threading.Tasks;

namespace IBlogmart.api.Data
{
    public interface IBlogmartRepository
    {
         Task Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
    }
}