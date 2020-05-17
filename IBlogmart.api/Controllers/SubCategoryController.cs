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

    }
}