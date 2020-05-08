using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using IBlogmart.api.Data;
using IBlogmart.api.Dtos;
using IBlogmart.api.Helper;
using IBlogmart.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace IBlogmart.api.Controllers
{
    [Authorize]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private Cloudinary _cloudinary;
        public ICategoryRepository _repo;
        private readonly IMapper _mapper;
        public IOptions<CloudinarySettings> _cloudinaryConfig;
        public ImagesController(IMapper mapper,
        ICategoryRepository repo,
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
              _cloudinaryConfig.Value.CloudName,
              _cloudinaryConfig.Value.ApiKey,
              _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet]
        [Route("api/category/{categoryId}/Images")]
        public async Task<IActionResult> GetCategoryImages(int categoryId)
        {
            return Ok(await _repo.GetCategoryImages(categoryId));
        }

        [HttpGet("{id}", Name = "GetImage")]
        public async Task<IActionResult> GetImage(int id)
        {

            var imageFromRepo = await _repo.GetImage(id);
            var image = _mapper.Map<ImageForReturnDto>(imageFromRepo);

            return Ok(image);
        }


        [HttpPost]
        [Route("api/category/{categoryId}/{isMain}/Image")]
        public async Task<IActionResult> AddCategoryImage(int categoryId, int isMain, [FromForm]ImageForUploadDto imageForUploadDto)
        {

            var file = imageForUploadDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {

                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(800).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }

            }

            imageForUploadDto.Url = uploadResult.Uri.ToString();
            imageForUploadDto.PublicId = uploadResult.PublicId;

            //var image =  _mapper.Map<Image>(imageForUploadDto);

            bool isMainImage = true;

            if (isMain == 0)
                isMainImage = false;

            var image = new Image
            {
                CategoryId = categoryId,
                Url = imageForUploadDto.Url,
                PublicId = imageForUploadDto.PublicId,
                isMain = isMainImage
            };

            await _repo.AddImage(image);

            return Ok();
        }

        [HttpPost("api/image/setmain/{id}/{imageid}/{type}")]
        public async Task<IActionResult> SetMainImage(int id, int imageid, string type)
        {

            var imageFromRepo = await _repo.GetImage(imageid);

            if (imageFromRepo != null)
            {
                if (imageFromRepo.isMain)
                    return BadRequest("This is alreadya main image");
                var currentMainImage = await _repo.GetMainImage(id, type);
                currentMainImage.isMain = false;

                imageFromRepo.isMain = true;

                if (await _repo.SaveAll())
                    return NoContent();

                return BadRequest("Could not set image to main");


            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpDelete("api/image/delete/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var imageFromRepo = await _repo.GetImage(id);

            if (imageFromRepo.isMain)
                return BadRequest("You can't delete main image");

            if (imageFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(imageFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(imageFromRepo);
                }
            }

            if (imageFromRepo.PublicId != null)
            {
                _repo.Delete(imageFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the image");

        }
    }
}