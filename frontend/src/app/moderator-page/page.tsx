'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function ModeratorPage() {
  const [booksToExtract, setBooksToExtract] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/books?needsExtraction=true`)
      .then((response) => {
        setBooksToExtract(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books needing extraction:', error);
      });
  }, []);

  return (
    <div>
      <h1>Moderator Dashboard</h1>
      {booksToExtract.length > 0 ? (
        booksToExtract.map((book) => (
          <div key={book._id}>
            <h2>{book.title}</h2>
            <Link href={`/moderator-page/extract-details/${book._id}`}>
              <button>Extract Details</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No books require extraction at the moment.</p>
      )}
    </div>
  );
}