using System.ComponentModel.DataAnnotations;

namespace IBlogmart.api.Dtos
{
    public class CategoryDto
    {
        [Required]
        public string Name { get; set; }
        public bool Active { get; set; }
    
    }
}