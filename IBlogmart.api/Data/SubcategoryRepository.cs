using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IBlogmart.api.Models;
using Microsoft.EntityFrameworkCore;

namespace IBlogmart.api.Data
{
    public class SubcategoryRepository : ISubcategoryRepository
    {
        public IBlogmartRepository _repo;
        public DataContext _Context { get; set; }
       public SubcategoryRepository(IBlogmartRepository repo, DataContext context)
        {
            _repo = repo;
            _Context = context;
        }
        public async Task<bool> Create(SubCategory subCategory)
        {
           await _repo.Add(subCategory);
           return await _repo.SaveAll();
        }

        public Task<IEnumerable<SubCategory>> GetSubCategories(int CatId)
        {
            throw new System.NotImplementedException();
        }
        public async Task<bool> SubCategoryNameExists(string name, int catId)
        {
            return await _Context.SubCategories.AnyAsync(s => s.Name == name && s.CategoryId == catId);
        }
        public Task<SubCategory> GetSubCategory(int Id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Image>> GetSubCategoryImages(int subCatId)
        {
           var image = await _Context.Images.Where( p => p.SubCategoryId == subCatId).ToListAsync();
           return image;
        }
    }
}