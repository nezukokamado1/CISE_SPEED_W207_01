// components/VerifiedBooks.tsx
import React, { useEffect, useState } from 'react';
import { Book } from './Books'; // Assuming you have a Book type
import BookCard from './BookCard'; // Assuming you have a BookCard component

const VerifiedBooks = () => {
    const [verifiedBooks, setVerifiedBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchVerifiedBooks = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/books/verified');
                if (!response.ok) {
                    throw new Error('Failed to fetch verified books');
                }
                const data = await response.json();
                setVerifiedBooks(data); // Assuming data is an array of books
            } catch (err) {
                setError('An error occurred while fetching verified books.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVerifiedBooks();
    }, []);

    return (
        <div className="verifiedBooks">
            {isLoading && <div className="loading">Loading...</div>}
            {error && (
                <div className="error-alert" onClick={() => setError(null)}>
                    {error}
                    <span className="close-btn">&times;</span>
                </div>
            )}
            <h1 className="title">Verified Books</h1>
            <div className="bookGrid">
                {verifiedBooks.map((book) => (
                    <div key={book._id} className="bookEntry">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerifiedBooks;
