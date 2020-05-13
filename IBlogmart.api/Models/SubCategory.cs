using System.ComponentModel.DataAnnotations;

namespace IBlogmart.api.Models
{
    public class SubCategory
    {
        [Key]
        public int Id { get; set; }
        public string Name {get;set;}
        public bool Active {get;set;}
        public Category Category {get;set;}
        public int CategoryId {get; set;}
    }
}