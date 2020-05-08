using System.ComponentModel.DataAnnotations;

namespace IBlogmart.api.Models
{
    public class Image
    { 
        
         [Key]
         public int Id {get;set;}
         public string Url {get;set;}
         public bool isMain {get;set;}
         public string PublicId {get;set;}
         public Category Category {get;set;}
         public int CategoryId {get; set;}
    }
}