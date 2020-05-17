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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public ICategoryRepository _repo { get; }
        public IConfiguration _Config { get; }
        public CategoryController(ICategoryRepository repo, IConfiguration config)
        {
            _Config = config;
            _repo = repo;
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create(CategoryDto categoryDto)
        {
           if (await _repo.CategoryNameExists(categoryDto.Name.ToLower()))
                return BadRequest("Category already exists");

            var categoryToCreate = new Category
            {
                Name = categoryDto.Name,
                Active = categoryDto.Active

            };

            var createdCategory = await _repo.Create(categoryToCreate);

            return StatusCode(201);

        }

         [HttpGet("Exists/{name}/{id}")]
         public async Task<IActionResult> Exists(string name, int id)
         {
            return Ok(await _repo.CategoryNameExists(name.ToLower(), id));
         }

        [AllowAnonymous]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
           return Ok(await _repo.GetAll());
        }

        [HttpGet("getcategory/{catId}")]
        public async Task<IActionResult> GetCategory(int catId)
        {
           return Ok(await _repo.GetCategory(catId));
        }

        [HttpPut("updatecategory")]
        public async Task<IActionResult> UpdateCategory(CategoryDto categoryDto)
        {
            if(!await _repo.CategoryExists(categoryDto.Id))
                return BadRequest("Category doesn't exists");
            
             if (await _repo.CategoryNameExists(categoryDto.Name.ToLower(), categoryDto.Id))
                return BadRequest("Category with the same name already exists");

           var categoryToUpdate = new Category
            {
                Id = categoryDto.Id,
                Name = categoryDto.Name,
                Active = categoryDto.Active
            };

            if(await _repo.UpdateCategory(categoryToUpdate))
              return Ok();

           return BadRequest("Unable to update");

        }

    }
}