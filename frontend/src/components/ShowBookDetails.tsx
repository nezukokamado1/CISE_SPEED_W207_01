'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Books';
import Link from 'next/link';

function ShowBookDetails() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const id = useParams<{ id: string }>().id;
    const navigate = useRouter();

    useEffect(() => {
        fetch(`http://localhost:8082/api/books/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setBook(json);
            })
            .catch((err) => {
                console.log('Error from ShowBookDetails: ' + err);
            });
    }, [id]);

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
                        <h1 className="display-4 text-center">Book's Record</h1>
                        <p className="lead text-center">View Book's Info</p>
                        <hr /> <br />
                    </div>
                    <div className="col-md-10 m-auto">{BookItem}</div>
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