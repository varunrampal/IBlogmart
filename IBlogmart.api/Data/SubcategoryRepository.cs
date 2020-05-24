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
        public async Task<bool> SubCategoryNameExists(string name="", int subCatId=0)
        {
            
            if(name != "" && subCatId > 0) {
               return await _Context.SubCategories.AnyAsync(s => s.Name == name && s.Id != subCatId);
            }
            else if(name == "" && subCatId > 0) {
                return await _Context.SubCategories.AnyAsync(s => s.Id == subCatId);

            } else if(name != "" && subCatId == 0) {

                return await _Context.SubCategories.AnyAsync(s => s.Name == name);
            }

            return false;
           
        }
        public async Task<SubCategory> GetSubCategory(int Id)
        {
            return await _Context.SubCategories.Include( i => i.Images).Include(c => c.Category).FirstOrDefaultAsync(s => s.Id == Id);
        }

        public async Task<IEnumerable<Image>> GetSubCategoryImages(int subCatId)
        {
           var image = await _Context.Images.Where( p => p.SubCategoryId == subCatId).ToListAsync();
           return image;
        }

        public async Task<Image> GetMainImage(int id, string type)
        {
          return await _Context.Images.Where(i => i.SubCategoryId == id  && i.isMain == true && i.type == 1).FirstOrDefaultAsync();
        }

         public async Task<bool> UpdateSubcategory(SubCategory subCategory){

            var subCatFromRepo =  _Context.SubCategories.SingleOrDefault(s => s.Id == subCategory.Id);
            subCatFromRepo.Name = subCategory.Name;
            subCatFromRepo.Active = subCategory.Active;

            if (subCatFromRepo != null)
                 return await  _repo.SaveAll();
            return false;
            
        }

    }
}