using System.Text;
using System.Threading.Tasks;
using IBlogmart.api.Data;
using IBlogmart.api.Dtos;
using IBlogmart.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net;

namespace IBlogmart.api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        public ISubcategoryRepository _repo;
        public IConfiguration _Config;
        public SubCategoryController(ISubcategoryRepository repo, IConfiguration config)
        {
            _Config = config;
            _repo = repo;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(SubCategoryDto subCategoryDto)
        {
           if (await _repo.SubCategoryNameExists(subCategoryDto.Name.ToLower(),subCategoryDto.CategoryId ))
                return BadRequest("SubCategory already exists");

            var subCategoryToCreate = new SubCategory
            {
                Name = subCategoryDto.Name,
                Active = subCategoryDto.Active,
                CategoryId = subCategoryDto.CategoryId
            };

           if(await _repo.Create(subCategoryToCreate))
           {
               return Ok(subCategoryToCreate);
           }

           return BadRequest(subCategoryToCreate);

        }

        [HttpGet("images/{subCatId}")]
        public async Task<IActionResult> GetImages(int subCatId) {
           
          return Ok(await _repo.GetSubCategoryImages(subCatId));
        }

        [HttpGet("get/{subCatId}")]
        public async Task<IActionResult> GetSubcategory(int subCatId) {

            if(await _repo.GetSubCategory(subCatId) == null)
            {
               return NotFound();
            }
           
          return Ok(await _repo.GetSubCategory(subCatId));
        }

        
         [HttpGet("Exists/{name}/{id}")]
         public async Task<IActionResult> Exists(string name, int id)
         {
            return Ok(await _repo.SubCategoryNameExists(name.ToLower(), id));
         }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateSubcategory(SubCategoryDto subCategoryDto)
        {
            if(!await _repo.SubCategoryNameExists("",subCategoryDto.Id))
                return BadRequest("Subcategory doesn't exists");
            
             if (await _repo.SubCategoryNameExists(subCategoryDto.Name.ToLower(), subCategoryDto.Id))
                return BadRequest("Subcategory with the same name already exists");

           var subCategoryToUpdate = new SubCategory
            {
                Id = subCategoryDto.Id,
                Name = subCategoryDto.Name,
                Active = subCategoryDto.Active
            };

            if(await _repo.UpdateSubcategory(subCategoryToUpdate))
              return Ok();

           return BadRequest("Unable to update");

        }


    }
}