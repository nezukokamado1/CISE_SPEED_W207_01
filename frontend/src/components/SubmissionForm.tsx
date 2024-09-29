'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmissionForm = () => {
    const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

    useEffect(() => {
        const fetchRecentSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/books');
                setRecentSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching recent submissions:', error);
            }
        };

        fetchRecentSubmissions();
    }, []);

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Moderate Submissions</h1>

            <h3 className="text-xl font-semibold mt-6">Recent Submissions:</h3>
            <ul className="mt-2">
                {recentSubmissions.length > 0 ? (
                    recentSubmissions.map((submission) => (
                        <li key={submission._id} className="flex items-center justify-between">
                            <span>
                                {submission.title} by {submission.authors} - {submission.journalName}
                            </span>
                            {submission.isDuplicate ? (
                                <span className="text-red-600">❌</span> // Red Cross for duplicates
                            ) : (
                                <span className="text-green-600">✔️</span> // Green Tick for non-duplicates
                            )}
                        </li>
                    ))
                ) : (
                    <li>No recent submissions found.</li>
                )}
            </ul>
        </div>
    );
};

export default SubmissionForm;
