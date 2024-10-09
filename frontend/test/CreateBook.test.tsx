// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import CreateBook from './CreateBook'; // Keep this as CreateBook

// // Mocking useRouter
// jest.mock('next/navigation', () => ({
//   useRouter: () => ({
//     push: jest.fn(),
//   }),
// }));

// // Mocking fetch
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     status: 200,
//     statusText: 'OK',
//     json: () => Promise.resolve({}),
//   } as Response)
// );

// describe('CreateBook', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); 
//   });

//   it('renders the form and submit button', () => {
//     render(<CreateBook />);

//     const titleInput = screen.getByPlaceholderText('Title of the Article');
//     const submitButton = screen.getByText('Submit Book/Article');

//     expect(titleInput).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });

//   it('should show a popup on successful form submission', async () => {
//     render(<CreateBook />);

//     const titleInput = screen.getByPlaceholderText('Title of the Article');
//     const submitButton = screen.getByText('Submit Book/Article');

//     // Simulate input change
//     fireEvent.change(titleInput, { target: { value: 'Test Article' } });

//     // Simulate form submission
//     fireEvent.click(submitButton);

//     // Await the popup message after successful submission
//     const popup = await screen.findByText('Thank you for adding an article!');
//     expect(popup).toBeInTheDocument();

//     // Ensure fetch was called
//     expect(fetch).toHaveBeenCalledWith('http://localhost:8082/api/books', expect.any(Object));
//   });
// });