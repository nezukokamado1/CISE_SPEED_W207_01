import React from 'react';
import { Book } from './Books';
import { useRouter } from 'next/navigation';

interface IProp {
    book?: Book;
}

const BookCard = ({ book }: IProp) => {
    const router = useRouter();

    if (!book) {
        return null;
    }

    const onClick = () => {
        router.push(`/show-book/${book._id}`);
    };

    return (
        <div className="card-container" onClick={onClick}>
            <img
                src={book.imageCover || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"} 
                alt="Books"
                className="book-image"
            />
            <div className="desc">
                <h2 className="book-title">{book.title}</h2>
                <h3 className="book-author">By: {book.authors}</h3>
            </div>
        </div>
    );
};

export default BookCard;