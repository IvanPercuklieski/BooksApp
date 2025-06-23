## Prerequisites

Make sure you have the following installed on your machine:
- [.NET SDK 8.0.404](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) or later  
- [Node.js v23.4.0](https://nodejs.org/en/download/) or later (required for frontend build tools)  
- npm 10.9.2 or later (comes with Node.js)  
- Windows 10 or later (recommended)

## How to Run the Project Locally (Windows)
- git clone https://github.com/IvanPercuklieski/BooksApp.git
- cd BooksApp.Server
- dotnet dev-certs https --trust    # Run this once if HTTPS certificate is not trusted
- dotnet run
- Open in your browser https://localhost:10152/    # If this is not the correct port, the port should be shown in the window that pops out when you run


## Project Structure
```
BooksApp/
├── BooksApp.Client/ # React Frontend
│ ├── .vscode/
│ │ └── settings.json
│ ├── Components/
│ │ └── TextHighlight.jsx # Component that highlights the searched text
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── App.css # Main component style
│ │ ├── App.jsx # Main component
│ │ ├── index.css # Used to reset the styles
│ │ └── main.jsx
│ ├── Styles/
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── README.md
│ └── vite.config.js
└── BooksApp.Server/ # .Net Backend
├── Connected Services/
├── Dependencies/
├── Properties/
│ └── launchSettings.json
├── Controllers/
│ └── BooksController.cs # Controller for the api endpoint
├── Data/ # The provided data
│ ├── books.csv
│ └── books.json
├── Models/ # Models used to merge the data
│ ├── CSVData.cs
│ ├── JsonData.cs
│ └── MergedData.cs
├── Services/ # Service used to load and merge the data
│ └── DataMergeService.cs
├── appsettings.json
├── BooksApp.Server.http
├── CHANGELOG.md
└── Program.cs
```


