import React, { useState, useEffect } from 'react';
import { Book } from './Books';
import BookCard from './BookCard';
import Link from 'next/link';

const SubmissionForm = () => {
    const [submittedBooks, setSubmittedBooks] = useState<(Book & { isDuplicate?: boolean })[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showAllBooks, setShowAllBooks] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, [showAllBooks]);

    const fetchBooks = async () => {
        try {
            const endpoint = showAllBooks ? 'http://localhost:8082/api/books' : 'http://localhost:8082/api/books/recent';
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setSubmittedBooks(data);
        } catch (err) {
            setError('An error occurred while fetching books.');
        }
    };

    const generateBookKey = (book: Book) => {
        return `${book.title}-${book.authors}-${book.journalName}`;
    };

    const getUniqueBooks = (books: Book[]) => {
        const uniqueKeys = new Set();
        return books.map(book => {
            const key = generateBookKey(book);
            const isDuplicate = uniqueKeys.has(key);
            uniqueKeys.add(key);
            return { ...book, isDuplicate };
        });
    };

    return (
        <div className="submissionForm">
            <div className="header">
                <Link href="/" className="linkButton">
                    Show Book List
                </Link>
                <h1 className="title">{showAllBooks ? 'All Submitted Books' : 'Recent Submissions'}</h1>
                <button 
                    className="toggleButton"
                    onClick={() => setShowAllBooks(!showAllBooks)}
                >
                    {showAllBooks ? 'Show Recent' : 'Show All'}
                </button>
            </div>
            <div className="bookGrid">
                {getUniqueBooks(submittedBooks).map((book, index) => (
                    <div key={index} className="bookEntry">
                        <BookCard book={book} />
                        <span className={book.isDuplicate ? "duplicateIndicator" : "uniqueIndicator"}>
                            {book.isDuplicate ? '❌ Duplicate' : '✅ Unique'}
                        </span>
                    </div>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default SubmissionForm;