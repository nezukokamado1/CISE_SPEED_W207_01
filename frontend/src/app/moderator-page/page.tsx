// Updated moderator-page/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function ModeratorPage() {
  const [booksToExtract, setBooksToExtract] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState('All Articles');

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
    console.error('Error: NEXT_PUBLIC_URL environment variable is not defined');
  }

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/books`)
      .then((response) => {
        setAllBooks(response.data);
        setBooksToExtract(response.data.filter((book) => !book.detailsExtracted));
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const filteredBooks =
    filter === 'All Articles'
      ? allBooks
      : filter === 'Duplicates'
      ? allBooks.filter((book) => book.duplicate)
      : filter === 'Unique'
      ? allBooks.filter((book) => !book.duplicate)
      : booksToExtract;

  return (
    <div>
      <h1>Moderator Dashboard</h1>
      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All Articles">All Articles</option>
          <option value="Duplicates">Duplicates</option>
          <option value="Unique">Unique</option>
          <option value="Needs Extraction">Needs Extraction</option>
        </select>
      </div>
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <div key={book._id} className="article-card">
            <h2>{book.title}</h2>
            <p>By: {book.authors}</p>
            {book.detailsExtracted ? (
              <p>Verified</p>
            ) : (
              <Link href={`/moderator-page/extract-details/${book._id}`}>
                <button>Extract Details</button>
              </Link>
            )}
          </div>
        ))
      ) : (
        <p>No books match the filter at the moment.</p>
      )}
    </div>
  );
}