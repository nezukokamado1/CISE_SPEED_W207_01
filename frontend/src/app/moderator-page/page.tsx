// frontend/src/app/moderator-page/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModeratorPage() {
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState('All Articles');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    // Updated axios call to ensure filters are applied correctly
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/books`, {
        params: { filter, sortBy },
      })
      .then((response) => {
        setAllBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, [filter, sortBy]);

  const filteredBooks = allBooks.filter((book) => {
    if (filter === 'All Articles') return true;
    if (filter === 'Duplicates') return book.duplicate;
    if (filter === 'Unique') return !book.duplicate;
    if (filter === 'Needs Extraction') return !book.detailsExtracted;
    return true;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortBy) return 0; // No sorting applied if "None" is selected
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'authors') return a.authors.localeCompare(b.authors);
    if (sortBy === 'publicationYear') return a.publicationYear - b.publicationYear;
    return 0;
  });

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

        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="authors">Authors</option>
          <option value="publicationYear">Publication Year</option>
        </select>
      </div>
      
      <table className="article-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Publication Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.publicationYear}</td>
                <td>{book.detailsExtracted ? 'Verified' : 'Needs Extraction'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No books available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}