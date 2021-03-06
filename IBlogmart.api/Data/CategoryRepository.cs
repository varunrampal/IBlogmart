using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IBlogmart.api.Models;
using Microsoft.EntityFrameworkCore;

namespace IBlogmart.api.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        public DataContext _Context { get; set; }

        public CategoryRepository(DataContext context)
        {
            _Context = context;
        }
        public async Task<Category> Create(Category category)
        {
            await _Context.Categories.AddAsync(category);
            await _Context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> CategoryNameExists(string categoryName, int Id)
        {
          if(Id !=0)
          {
                return await _Context.Categories.AnyAsync(x => x.Name == categoryName && x.Id!= Id);
          }
          else
          {
               return await _Context.Categories.AnyAsync(x => x.Name == categoryName);
          }
        }
        public async Task<bool> CategoryExists(int id)
        {
            if (await _Context.Categories.AnyAsync(x => x.Id == id))
                return true;

            return false;
        }
        public async Task<IEnumerable<Category>> GetAll()
        {
           return  await _Context.Categories.Include(i => i.Images).Include(s => s.SubCategories).ToListAsync();
        }
        public async Task<Category> GetCategory(int catId)
        {
           return  await _Context.Categories.Include(i => i.Images).Include(s => s.SubCategories).FirstOrDefaultAsync(c => c.Id == catId);
        }

        public async Task<bool> AddImage(Image image)
        {
           await _Context.Images.AddAsync(image);
           await _Context.SaveChangesAsync();
           return true;
        }

        public async Task<Image> GetImage(int id)
        {
           var image = await _Context.Images.FirstOrDefaultAsync( p => p.Id == id);
           return image;
        }

        public async Task<IEnumerable<Image>> GetCategoryImages(int catId)
        {
           var image = await _Context.Images.Where( p => p.CategoryId == catId).ToListAsync();
           return image;
        }

        public async Task<Image> GetMainImage(int id, string type)
        {
           if(type == "cat")
           {
              return await _Context.Images.Where( i => i.CategoryId == id && i.isMain == true).FirstOrDefaultAsync();
           }
           else if(type == "subcat")
           {
             return await _Context.Images.Where(i => i.CategoryId == id  && i.isMain == true).FirstOrDefaultAsync();
           }
           else
           {
                return await _Context.Images.Where( i => i.CategoryId == id && i.isMain == true).FirstOrDefaultAsync();
           }
        }

        public async Task<bool> SaveAll()
        {
           return await _Context.SaveChangesAsync() > 0;
        }

        public void Delete<T>(T entity) where T : class
        {
           _Context.Remove(entity);
        }

        public async Task<bool> UpdateCategory(Category category){

            var catFromRepo =  _Context.Categories.SingleOrDefault(c => c.Id == category.Id);
            catFromRepo.Name = category.Name;
            catFromRepo.Active = category.Active;
            if (catFromRepo != null)
                 return await  SaveAll();
            return false;
            
        }
    }
}