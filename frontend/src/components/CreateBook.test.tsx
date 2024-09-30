import { render, screen, fireEvent } from '@testing-library/react';
import CreateBook from './CreateBook';
import '@testing-library/jest-dom';


describe('CreateBook', () => {
  it('renders the form and submit button', () => {
    render(<CreateBook />);

    const titleInput = screen.getByPlaceholderText('Title of the Article');
    const submitButton = screen.getByText('Submit Book/Article');

    expect(titleInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should show a popup on successful form submission', async () => {
    render(<CreateBook />);
    
    const titleInput = screen.getByPlaceholderText('Title of the Article');
    const submitButton = screen.getByText('Submit Book/Article');

    fireEvent.change(titleInput, { target: { value: 'Test Article' } });
    fireEvent.click(submitButton);

    const popup = await screen.findByText('Thank you for adding an article!');
    expect(popup).toBeInTheDocument();
  });
});
