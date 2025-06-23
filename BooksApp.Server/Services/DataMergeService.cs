using BooksApp.Server.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Formats.Asn1;
using System.Globalization;
using System.Text.Json;

namespace BooksApp.Server.Services
{
    public class DataMergerService
    {
        private readonly IWebHostEnvironment _env;

        public DataMergerService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public List<MergedData> GetMergedData()
        {
            var csvPath = Path.Combine(_env.ContentRootPath, "Data", "books.csv");
            var jsonPath = Path.Combine(_env.ContentRootPath, "Data", "books.json");

            var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                PrepareHeaderForMatch = args => args.Header.ToLower(),
            };

            using var csvReader = new StreamReader(csvPath);
            using var csv = new CsvReader(csvReader, csvConfig);
            var csvData = csv.GetRecords<CSVData>().ToList();

           

            var jsonText = File.ReadAllText(jsonPath);
            var jsonData = JsonSerializer.Deserialize<List<JsonData>>(jsonText);

            

            return csvData.Join(
                jsonData,
                csv => csv.Id,
                json => json.Id,
                (csv, json) => new MergedData
                {
                    Id = csv.Id,
                    Title = csv.Title,
                    Author = csv.Author,
                    Rating = csv.Rating,
                    Genre = json.Genre,
                }).ToList();
        }

    }
}
