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

    const images = [
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        "https://th-thumbnailer.cdn-si-edu.com/sWf0xF1il7OWYO8j-PGqwBvxTAE=/1000x750/filters:no_upscale():focal(2550x1724:2551x1725)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/9a/d7/9ad71c28-a69d-4bc0-b03d-37160317bb32/gettyimages-577674005.jpg",
        "https://bdc2020.o0bc.com/wp-content/uploads/2021/12/AdobeStock_242762094-61b2260261960-768x432.jpeg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpotWxtMG9mld21UAR4v5z-8A8vZodVzEZsw&s",
        "https://live-production.wcms.abc-cdn.net.au/398836216839841241467590824c5cf1?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=0&width=862&height=485",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWTxQgaQS1C-xnSeYn-8-AI3uHpfnVz07BCv8n7_A-KXNuYWt9AXuRc5sDiEHzzfhj4s&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThXFs-XaVvmCkni9G_l-LUUEFcK4CTX9qvw5R_gzmi8hPzH_kf8TSNScDcSjKGm2EpJQw&usqp=CAU",

    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <div className="card-container" onClick={onClick}>
            <img
                src={randomImage}
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