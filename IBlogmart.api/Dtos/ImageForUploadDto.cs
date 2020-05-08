using Microsoft.AspNetCore.Http;

namespace IBlogmart.api.Dtos
{
    public class ImageForUploadDto
    {
        public string Url {get;set;}

        public int categoryId {get;set;}
        public IFormFile File {get;set;}
        public string PublicId {get;set;}
        public bool isMain {get; set;}
        public ImageForUploadDto()
        {
            
        }
    }
}