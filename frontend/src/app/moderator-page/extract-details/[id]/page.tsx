// Updated extract-details/[id]/page.tsx

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ExtractDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [extractedDetails, setExtractedDetails] = useState({
    keywords: '',
    abstract: '',
    institution: '',
  });

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
    console.error('Error: NEXT_PUBLIC_URL environment variable is not defined');
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/api/books/${id}`)
        .then((response) => {
          setBook(response.data);
          setExtractedDetails({
            keywords: response.data.keywords || '',
            abstract: response.data.abstract || '',
            institution: response.data.institution || '',
          });
        })
        .catch((error) => {
          console.error('Error fetching book details:', error);
        });
    }
  }, [id]);

  const handleSave = () => {
    axios
      .put(`${baseUrl}/api/books/${id}/extract-details`, extractedDetails)
      .then((response) => {
        alert('Details extracted successfully!');
        router.push('/moderator-page');
      })
      .catch((error) => {
        console.error('Error saving extracted details:', error);
        alert('Failed to extract details');
      });
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Extract Details for: {book.title}</h2>
      <label>Keywords:</label>
      <input
        type="text"
        value={extractedDetails.keywords}
        onChange={(e) => setExtractedDetails({ ...extractedDetails, keywords: e.target.value })}
      />
      <label>Abstract:</label>
      <textarea
        value={extractedDetails.abstract}
        onChange={(e) => setExtractedDetails({ ...extractedDetails, abstract: e.target.value })}
      />
      <label>Institution:</label>
      <input
        type="text"
        value={extractedDetails.institution}
        onChange={(e) => setExtractedDetails({ ...extractedDetails, institution: e.target.value })}
      />
      <button onClick={handleSave}>Extract Details</button>
    </div>
  );
}