using System.Threading.Tasks;

namespace IBlogmart.api.Data
{
    public class BlogmartRepository : IBlogmartRepository
    {
        private DataContext _context;
        public BlogmartRepository(DataContext context)
        { 
           _context = context;
        }
         
        public async Task Add<T>(T entity) where T : class
        {
            await _context.AddAsync(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
             _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}