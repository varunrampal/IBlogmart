using System.Threading.Tasks;
using IBlogmart.api.Models;

namespace IBlogmart.api.Data
{
    public  interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}