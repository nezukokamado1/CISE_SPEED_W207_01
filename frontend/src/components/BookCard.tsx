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
<<<<<<< Updated upstream
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
=======
                src={book.imageCover || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"} 
>>>>>>> Stashed changes
                alt="Books"
                height={200}
            />
            <div className="desc">
                <h2>{book.title}</h2>
                <h3>{book.authors}</h3> 
                <p>{book.journalName}</p> 
            </div>
        </div>
    );
};

export default BookCard;
