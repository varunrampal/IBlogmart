using System.ComponentModel.DataAnnotations;

namespace IBlogmart.api.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
    
    }
}