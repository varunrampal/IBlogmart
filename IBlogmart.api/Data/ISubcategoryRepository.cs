using System.Collections.Generic;
using System.Threading.Tasks;
using IBlogmart.api.Models;

namespace IBlogmart.api.Data
{
    public interface ISubcategoryRepository
    {
       Task<SubCategory> GetSubCategory(int Id);
       Task<IEnumerable<SubCategory>> GetSubCategories(int CatId);
       Task<IEnumerable<Image>> GetSubCategoryImages(int subCatId);
       Task<bool> Create(SubCategory subCategory);
       Task<bool> SubCategoryNameExists(string name, int catId);
    }
}