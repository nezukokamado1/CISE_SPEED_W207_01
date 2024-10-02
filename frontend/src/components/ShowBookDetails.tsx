'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Books';
import Link from 'next/link';
import StarRating from './StarRating';

function ShowBookDetails() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ratingMessage, setRatingMessage] = useState<string>('');
    const id = useParams<{ id: string }>().id;
    const navigate = useRouter();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8082/api/books/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setBook(json);
                const avgRating = json.averageRating != null ? Number(json.averageRating) : null;
                setAverageRating(avgRating);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('Error from ShowBookDetails: ' + err);
                setError('Failed to load book details. Please try again later.');
                setIsLoading(false);
            });
    }, [id]);

    const handleRating = async (newRating: number) => {
        setUserRating(newRating);
        try {
            const response = await fetch(`http://localhost:8082/api/books/${id}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit rating');
            }
    
            const data = await response.json();
            console.log('Response Data:', data); // Log the response to inspect it
            if (data.averageRating !== undefined) {
                setAverageRating(data.averageRating); // Update average rating from response
            } else {
                throw new Error('Average rating not provided in response');
            }
    
            setRatingMessage('Thanks for rating!');
            setTimeout(() => setRatingMessage(''), 3000);
        } catch (error) {
            console.error('Error submitting rating:', error); // Log the error
            setRatingMessage('Error saving rating. Please try again.'); // Error message
        }
    };
    

    const onDeleteClick = (id: string) => {
        fetch(`http://localhost:8082/api/books/${id}`, { method: 'DELETE' })
            .then(() => {
                navigate.push('/');
            })
            .catch((err) => {
                console.log('Error from ShowBookDetails_deleteClick: ' + err);
            });
    };

    const BookItem = (
        <div>
            <table className="table table-hover table-dark table-striped table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Title</td>
                        <td>{book.title}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Authors</td>
                        <td>{book.authors}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Journal Name</td>
                        <td>{book.journalName}</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>DOI</td>
                        <td>{book.doi}</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Publication Year</td>
                        <td>{book.publicationYear}</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>Volume</td>
                        <td>{book.volume}</td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>Issue Number</td>
                        <td>{book.issueNumber}</td>
                    </tr>
                    <tr>
                        <th scope="row">8</th>
                        <td>Pages</td>
                        <td>{book.pages}</td>
                    </tr>
                    <tr>
                        <th scope="row">9</th>
                        <td>Keywords</td>
                        <td>{book.keywords}</td>
                    </tr>
                    <tr>
                        <th scope="row">10</th>
                        <td>Abstract</td>
                        <td>{book.abstract}</td>
                    </tr>
                    <tr>
                        <th scope="row">11</th>
                        <td>Institution/Organization</td>
                        <td>{book.institution}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="ShowBookDetails">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <br /> <br />
                        <Link href="/" className="btn btn-outline-warning float-left">
                            Show Book List
                        </Link>
                    </div>
                    <br />
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center text-3xl mb-4">Book&apos;s Record</h1>
                        <p className="lead text-center">View Book&apos;s Info</p>
                        <hr /> <br />
                    </div>
                    {error && <div className="col-md-10 m-auto alert alert-danger">{error}</div>}
                    {isLoading ? (
                        <div className="col-md-10 m-auto">Loading...</div>
                    ) : (
                        <div className="col-md-10 m-auto">
                            {BookItem}
                        </div>
                    )}

                    {/* Rating Component Section */}
                    <div className="col-md-10 m-auto mb-4">
                        <h3 className="text-center text-2xl mb-3">Rate this Book</h3>
                        <div className="flex justify-center">
                            <StarRating
                                value={userRating || 0}
                                onChange={handleRating}
                                size={36}
                            />
                        </div>
                        <p className="text-center mt-2">
                            Your Rating: {userRating !== null ? userRating : 'Not rated yet'}
                        </p>
                        <p className="text-center mt-2">
                            Average Rating: {averageRating !== null && averageRating !== undefined 
                                ? Number(averageRating).toFixed(1) 
                                : 'Not rated yet'}
                        </p>
                        {ratingMessage && <p className="text-center mt-2">{ratingMessage}</p>}
                    </div>

                    <div className="col-md-6 m-auto">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-lg btn-block"
                            onClick={() => {
                                onDeleteClick(book._id || '');
                            }}
                        >
                            Delete Book
                        </button>
                    </div>
                    <div className="col-md-6 m-auto">
                        <Link href={`/edit-book/${book._id}`} className="btn btn-outline-info btn-lg btn-block">
                            Edit Book
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowBookDetails;
