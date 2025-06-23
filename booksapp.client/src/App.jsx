import { useEffect, useState, useMemo} from 'react';
import './App.css';
import TextHighlight from '../Components/TextHighlight';

function App() {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([])
    const [sortBy, setSortBy] = useState("author")
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeSearchQuery, setActiveSearchQuery] = useState("")

    useEffect(() => {
        setIsLoading(true)
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data)
                setDisplayedBooks(data)
                setIsLoading(false)
            }).
            catch((err) => {
                console.error("Fetch error: ", err)
                setIsLoading(false)
            })
    }, [])

    const searchBooks = () => {
        if (!searchQuery && searchQuery.trim() === "") {
            setDisplayedBooks(books)
            return
        }

        const query = searchQuery.trim().toLowerCase()
        setDisplayedBooks(books.filter(book => (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query))))
    }

    const sortedBooks = useMemo(() => {
        return [...displayedBooks].sort((a, b) =>
            String(a[sortBy]).localeCompare(String(b[sortBy]))
        );
    }, [displayedBooks, sortBy]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value)
    } 

    const handleSearch = () => {
        setActiveSearchQuery(searchQuery.trim().toLowerCase())
        searchBooks()
    }

    const handleClear = () => {
        setSearchQuery("")
        setDisplayedBooks(books)
        setActiveSearchQuery("")
    }

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    else {
        return (
            <div className="book-app">
                <div className="book-app__header">
                    <h1>Books App</h1>
                </div>

                <div className="book-app__filter">
                    <div className="book-app__search">
                        <input
                            className="book-app__search-input"
                            type="text"
                            placeholder="Search books"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        ></input>

                        <button className="book-app__button" onClick={handleSearch}>Search</button>
                        <button className="book-app__button book-app__button--clear" onClick={handleClear}>Clear</button>
                    </div>

                    <div className="book-app__sort">
                        <label className="book-app__sort-label">Sort by:</label>
                        <select
                            className="book-app__sort-select"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="author">Author</option>
                            <option value="title">Title</option>
                            <option value="genre">Genre</option>
                        </select>
                    </div>
                </div>

                <div className="book-app__data">
                    {sortedBooks.length === 0 ? (
                        <p>No matches found :(</p>
                    ) : (
                        <table className="book-app__table">
                            <thead>
                                <tr className="book-app__table-row book-app__table-row--header">
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Genre</th>
                                    <th className="book-app__table-header--hide-on-mobile">Rating /10</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {sortedBooks.map((book, i) => (
                                        <tr className={
                                            "book-app__table-row " + 
                                            (i % 2 !== 0 ? "book-app__table-row--striped" : "")
                                        } key={book.id}>
                                        <td><TextHighlight text={book.title} highlight={ activeSearchQuery} /></td>
                                        <td><TextHighlight text={book.author} highlight={activeSearchQuery} /></td>
                                        <td><TextHighlight text={book.genre} highlight={activeSearchQuery} /></td>
                                        <td className="book-app__table-cell--hide-on-mobile">{book.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        )
    }
    
}

export default App;