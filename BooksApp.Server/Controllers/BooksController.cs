using BooksApp.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BooksApp.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly DataMergerService _dataMergerService;

        public BooksController(DataMergerService dataMergerService)
        {
            _dataMergerService = dataMergerService;
        }

        [HttpGet]
        public IActionResult getBooks()
        {
            var books = _dataMergerService.GetMergedData();

            return Ok(books);
        }


    }
}
