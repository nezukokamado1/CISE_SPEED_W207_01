// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import SubmissionForm from './SubmissionForm';
// import '@testing-library/jest-dom';

// // Mocking the global fetch function
// const mockedFetch = jest.fn();
// global.fetch = mockedFetch;

// // Sample data
// const mockBooks = [
//     { title: 'Book 1', authors: 'Author 1', journalName: 'Journal 1' },
//     { title: 'Book 2', authors: 'Author 1', journalName: 'Journal 1' },
//     { title: 'Book 1', authors: 'Author 1', journalName: 'Journal 1' }, // Duplicate
// ];

// // Mocking useRouter
// jest.mock('next/navigation', () => ({
//     useRouter: () => ({
//         push: jest.fn(),
//     }),
// }));

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('SubmissionForm', () => {
//     it('renders the books displays', () => {
//         render(<SubmissionForm />);
//         expect(screen.getByText('All Submitted Books')).toBeInTheDocument();
//     });

//     it('fetches and displays all submitted Books', () => {
//       render(<SubmissionForm />);
//       expect(screen.getByText('All Submitted Books')).toBeInTheDocument();
//   });

//     it('displays an error message when fetch fails', async () => {
//         mockedFetch.mockResolvedValueOnce({ ok: false });

//         render(<SubmissionForm />);

//         await waitFor(() => {
//             expect(screen.getByText('An error occurred while fetching books.')).toBeInTheDocument();
//         });
//     });

//     it('checks for duplicate books', async () => {
//         mockedFetch.mockResolvedValueOnce({
//             ok: true,
//             json: jest.fn().mockResolvedValueOnce(mockBooks),
//         });

//         render(<SubmissionForm />);

//         await waitFor(() => {
//             // Ensure that duplicates are identified correctly
//             const duplicates = screen.getAllByText('❌ Duplicate');
//             expect(duplicates.length).toBe(1); // There should be one duplicate
//         });
//     });
// });