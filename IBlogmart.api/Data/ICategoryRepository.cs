using System.Collections.Generic;
using System.Threading.Tasks;
using IBlogmart.api.Models;

namespace IBlogmart.api.Data
{
    public interface ICategoryRepository
    {
         Task<Category> Create(Category category);
         Task<IEnumerable<Category>> GetAll();
         Task<bool> CategoryExists(string categoryName);
         Task<bool> AddImage(Image image);
         Task<Image> GetImage(int id);
         Task<IEnumerable<Image>> GetCategoryImages(int catId);
         Task<Category> GetCategory(int catId);
         Task<Image> GetMainImage(int id, string type);
         Task<bool> SaveAll();

         void Delete<T>(T entity) where T: class;
         
        
    }
}