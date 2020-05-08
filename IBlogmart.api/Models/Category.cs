using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IBlogmart.api.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name {get;set;}
        public bool Active {get;set;}
        public ICollection<Image> Images {get;set;}
       
    }
}