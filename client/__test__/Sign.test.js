import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Sign from '../src/components/pages/Sign';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Sign Component', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  it('renders the sign-up form without errors', () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Sign />
      </Router>
    );

    expect(getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Your Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Re-enter Password')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('updates form data on input change', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Sign />
      </Router>
    );

    const nameInput = getByPlaceholderText('Your Name');
    const emailInput = getByPlaceholderText('Your Email');
    const passwordInput = getByPlaceholderText('Your Password');
    const reEnterPasswordInput = getByPlaceholderText('Re-enter Password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(reEnterPasswordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(reEnterPasswordInput.value).toBe('password123');
  });});

  {/*it('displays error message on password mismatch', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Router>
        <Sign />
      </Router>
    );

    const passwordInput = getByPlaceholderText('Your Password');
    const reEnterPasswordInput = getByPlaceholderText('Re-enter Password');
    const submitButton = getByText('Register');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(reEnterPasswordInput, { target: { value: 'mismatch' } });
    fireEvent.click(submitButton);

    expect(getByTestId('error-message')).toHaveTextContent('Passwords do not match');
  });

  it('submits the form and redirects on successful registration', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Sign />
      </Router>
    );

    const nameInput = getByPlaceholderText('Your Name');
    const emailInput = getByPlaceholderText('Your Email');
    const passwordInput = getByPlaceholderText('Your Password');
    const reEnterPasswordInput = getByPlaceholderText('Re-enter Password');
    const submitButton = getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(reEnterPasswordInput, { target: { value: 'password123' } });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ success: true }), // Simulating a successful response
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8800/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          reEnterPassword: 'password123',
        }),
      });
    });

    // Assuming the fetch resolves and redirects upon successful registration
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/home');
    });
  });

  it('displays an error message on unsuccessful registration', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Router>
        <Sign />
      </Router>
    );

    const nameInput = getByPlaceholderText('Your Name');
    const emailInput = getByPlaceholderText('Your Email');
    const passwordInput = getByPlaceholderText('Your Password');
    const reEnterPasswordInput = getByPlaceholderText('Re-enter Password');
    const submitButton = getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(reEnterPasswordInput, { target: { value: 'password123' } });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ success: false, message: 'User already exists' }), // Simulating an unsuccessful response
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8800/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          reEnterPassword: 'password123',
        }),
      });
    });

    expect(getByTestId('error-message')).toHaveTextContent('User already exists');
  });
});*/}