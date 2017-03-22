using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppSPA.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAppSPA.Controllers
{
    [Route("api/[controller]")]
    public class BooksAPIController : Controller
    {
        private readonly AppDBContext _context;

        public BooksAPIController(AppDBContext context)
        {
            _context = context;
        }
           
        // GET: api/values
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            var appDBContext = _context.Book.Include(b => b.Author);
            return appDBContext;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        private static int globalbookid = 10;
        // POST api/values
        [HttpPost]
        public void /*IActionResult*/ Post([Bind("AuthorID,Title")][FromBody]Book book)
        {
            if (book != null && ModelState.IsValid)
            {              
                book.AuthorID = 1;
                _context.Add(book);
                _context.SaveChanges();
            }         
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void/*IActionResult*/ Delete(int id)
        {
            //  NotFound(); Ok(book);                                   

            var book = _context.Book.SingleOrDefault(m => m.BookID == id);

            if (book != null)
            {
                _context.Book.Remove(book);
                _context.SaveChanges();
            }
        }
    }
}
