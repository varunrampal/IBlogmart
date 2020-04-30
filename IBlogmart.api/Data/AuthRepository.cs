using System.Threading.Tasks;
using IBlogmart.api.Models;
using Microsoft.EntityFrameworkCore;

namespace IBlogmart.api.Data
{
    public class AuthRepository : IAuthRepository
    {
        public DataContext _Context { get; set; }

        public AuthRepository(DataContext context)
        {
            _Context = context;
        }
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _Context.Users.AddAsync(user);
            await _Context.SaveChangesAsync();

            return user;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _Context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHAsh(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHAsh(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

       public async Task<bool> UserExists(string username)
        {
            if(await _Context.Users.AnyAsync(x => x.Username == username))
              return true;

            return false;
        }

    }
}