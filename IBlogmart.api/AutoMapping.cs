using AutoMapper;
using IBlogmart.api.Dtos;
using IBlogmart.api.Models;

namespace IBlogmart.api
{
   public class AutoMapping : Profile
   {
    public AutoMapping()
    {
        CreateMap<Image, ImageForUploadDto>(); // means you want to map from User to UserDTO
    }
  }
}