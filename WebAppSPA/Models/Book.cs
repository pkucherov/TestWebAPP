using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppSPA.Models
{
    public class Book
    {
        public int BookID { get; set; }
        public int AuthorID { get; set; }
        public string Title { get; set; }
        public Author Author { get; set; }
    }
}
