// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import UpdateBookInfo from './UpdateBookInfo';
// import { useRouter, useParams} from 'next/navigation';
// import '@testing-library/jest-dom';



// // Mock Next.js router
// jest.mock('next/navigation', () => ({
//     useRouter: jest.fn(),
//     useParams: jest.fn(),
// }));

// // Mock fetch
// global.fetch = jest.fn();

// describe('UpdateBookInfo Component', () => {
//     const mockBook = {
//         title: 'Mock Book Title',
//         authors: 'Author 1',
//         journalName: 'Journal 1',
//         doi: '10.1234/mockdoi',
//         publicationYear: 2022,
//         volume: '1',
//         issueNumber: '1',
//         pages: '1-10',
//         keywords: 'keyword1, keyword2',
//         abstract: 'This is a mock abstract.',
//         institution: 'Mock Institution',
//     };

//     beforeEach(() => {
//         (useRouter as jest.Mock).mockReturnValue({
//             push: jest.fn(),
//         });
//         (useParams as jest.Mock).mockReturnValue({ id: '1' });
//         (fetch as jest.Mock).mockImplementation((url) => {
//             if (url.endsWith('/1')) {
//                 return Promise.resolve({
//                     ok: true,
//                     json: () => Promise.resolve(mockBook),
//                 });
//             }
//             return Promise.resolve({ ok: true });
//         });
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('renders the component and fetches the book info', async () => {
//         render(<UpdateBookInfo />);

//         await waitFor(() => {
//             expect(screen.getByLabelText(/title/i)).toHaveValue(mockBook.title);
//             expect(screen.getByLabelText(/authors/i)).toHaveValue(mockBook.authors);
//             expect(screen.getByLabelText(/journal name/i)).toHaveValue(mockBook.journalName);
//         });
//     });

//     test('updates book info on form submission', async () => {
//         render(<UpdateBookInfo />);

//         // Wait for the input fields to be populated
//         await waitFor(() => {
//             expect(screen.getByLabelText(/title/i)).toHaveValue(mockBook.title);
//         });

//         // Change the book title
//         fireEvent.change(screen.getByLabelText(/title/i), {
//             target: { value: 'Updated Book Title' },
//         });

//         // Submit the form
//         fireEvent.click(screen.getByRole('button', { name: /update book/i }));

//         // Check if fetch was called with the correct PUT request
//         expect(fetch).toHaveBeenCalledWith(`http://localhost:8082/api/books/1`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ...mockBook,
//                 title: 'Updated Book Title',
//             }),
//         });
//     });

//     test('handles fetch error', async () => {
//         (fetch as jest.Mock).mockImplementationOnce(() =>
//             Promise.reject(new Error('Network Error'))
//         );

//         render(<UpdateBookInfo />);

//         await waitFor(() => {
//             expect(screen.getByText(/could not load book information/i)).toBeInTheDocument();
//         });
//     });
// });