using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppSPA.Models;

namespace WebAppSPA.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext (DbContextOptions<AppDBContext> options)
            : base(options)
        {
        }

        public DbSet<WebAppSPA.Models.Movie> Movie { get; set; }

        public DbSet<WebAppSPA.Models.Phone> Phone { get; set; }

        public DbSet<WebAppSPA.Models.Author> Author { get; set; }

        public DbSet<WebAppSPA.Models.Book> Book { get; set; }
    }
}
