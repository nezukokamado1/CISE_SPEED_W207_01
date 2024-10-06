import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Books';
import { Dropdown } from 'react-bootstrap';

function ShowBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('title');
    const [showPopup, setShowPopup] = useState(false);
    const methodologyLinks = [
        { name: "Agile" },
        { name: "Scrum" },
        { name: "Waterfall" },
        { name: "Lean" },
        { name: "Kanban" },
    ];

    // Handle input changes
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    // Handle search form submission
    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`http://localhost:8082/api/books/${filter}/${input}`)
            .then((res) => {
                if (!res.ok) {
                    setShowPopup(true);
                    fetchAllBooks();
                    throw new Error("Response empty");
                }
                return res.json();
            })
            .then((books) => {
                setBooks(books);
            })
            .catch((err) => {
                console.log('Error from ShowBookList: ' + err);
            });
    };

    const closePopUp = () => {
        setShowPopup(false);
    };

    // Fetch all books
    const fetchAllBooks = () => {
        fetch('http://localhost:8082/api/books')
            .then((res) => res.json())
            .then((books) => setBooks(books))
            .catch((err) => {
                console.error('Error fetching all books: ', err);
            });
    };

    // Fetch books on initial render
    useEffect(() => {
        fetchAllBooks();
    }, []);

    return (
        <div className='showBookList'>
            {showPopup ? (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h2>No Results for: {input}</h2>
                  <div>
                    <button className="btn btn-outline-success" onClick={closePopUp}>
                      Return
                    </button>
                  </div>
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>No Results for: {input}</h2>
                        <div>
                            <button className="btn btn-outline-success" onClick={closePopUp}>
                                Return
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className='container'>
                <div className='header'>
                    <div className="quick-links-header">
                        <h1 className="header-title">SPEED |</h1>
                        {methodologyLinks.map((link, index) => (
                            <button
                                key={index}
                                className="quick-link"
                                onClick={() => {
                                    setInput(link.name);
                                    fetch(`http://localhost:8082/api/books/title/${link.name}`)
                                        .then((res) => {
                                            if (!res.ok) {
                                                setShowPopup(true);
                                                fetchAllBooks();
                                                throw new Error("Response empty");
                                            }
                                            return res.json();
                                        })
                                        .then((books) => {
                                            setBooks(books);
                                        })
                                        .catch((err) => {
                                            console.log('Error from QuickLinks: ' + err);
                                        });
                                }}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                    <div className='buttonGroup'>
                        <Link href='/submission-form' className='linkButton'>
                            Submission
                        </Link>
                        <Link href='/create-book' className='linkButton'>
                            + Add New Book
                        </Link>
                    </div>
                </div>
                <form className='searchForm' noValidate onSubmit={onSearch}>
                    <input
                        type="text"
                        placeholder="Book Title"
                        name="title"
                        className='searchInput'
                        required
                        onChange={onChange}
                    />
                    <select
                        name="filter"
                        value={filter}
                        onChange={onFilter}
                    >
                        <option value="title">Title</option>
                        <option value="authors">Author</option>
                        <option value="journalName">Journal</option>
                        <option value="publicationYear">Year</option>
                    </select>
                    <button className='searchButton' type='submit'>
                        Search
                    </button>
                </form>
                <div className='bookGrid'>
                    {books.length === 0 ? (
                        <p className="no-books">There are no book records!</p>
                    ) : (
                        books.map((book, k) => <BookCard book={book} key={k} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowBookList;