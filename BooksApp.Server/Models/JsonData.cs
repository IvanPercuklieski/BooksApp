using System.Text.Json.Serialization;

public class JsonData
{
    [JsonPropertyName("id")]  
    public int Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("author")]
    public string Author { get; set; }

    [JsonPropertyName("genre")]
    public string Genre { get; set; }
}
