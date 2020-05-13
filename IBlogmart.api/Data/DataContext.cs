
using IBlogmart.api.Models;
using Microsoft.EntityFrameworkCore;
namespace IBlogmart.api.Data
{
  public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
         public DbSet<User> Users {get;set;}
         public DbSet<Category> Categories {get;set;}
         public DbSet<Image> Images {get;set;}
         public DbSet<SubCategory> SubCategories {get;set;}

    }
}