using System.ComponentModel.DataAnnotations;

namespace IBlogmart.api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username {get;set;}
        public byte[] PasswordHash {get;set;}
        public byte[] PasswordSalt {get;set;}
    }
}