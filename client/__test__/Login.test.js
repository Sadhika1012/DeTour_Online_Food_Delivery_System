import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../src/components/pages/Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  let navigate;
  
  beforeEach(() => {
    navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  it('renders the login form without errors', () => {
    const { queryAllByText, getByPlaceholderText } = render(
      <Router>
        <Login />
      </Router>
    );
    expect(queryAllByText('Login')).toHaveLength(2); // Assuming there are 2 elements with 'Login' text
    expect(getByPlaceholderText('Enter your Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your Password')).toBeInTheDocument();
  });

  it('updates email and password on input change', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Login />
      </Router>
    );
    const emailInput = getByPlaceholderText('Enter your Email');
    const passwordInput = getByPlaceholderText('Enter your Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});

{/*it('submits the form and redirects on successful login', async () => {
  const { getByPlaceholderText, getByText } = render(
      <Router>
          <Login />
      </Router>
  );

  const emailInput = getByPlaceholderText('Enter your Email');
  const passwordInput = getByPlaceholderText('Enter your Password');
  const submitButton = getByText('Login'); // Assuming there's only one submit button

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ success: true }), // Simulating a successful response
  });

  fireEvent.click(submitButton);

  await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8800/users/login', {
          method: 'POST',
          body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
          headers: { 'Content-Type': 'application/json' },
      });
  });

  // Assuming the fetch resolves and redirects upon successful login
  await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/home');
  });
});

it('displays an error message on unsuccessful login', () => {
  const { getByPlaceholderText, queryAllByText } = render(
      <Router>
          <Login />
      </Router>
  );
  const emailInput = getByPlaceholderText('Enter your Email');
  const passwordInput = getByPlaceholderText('Enter your Password');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

  const submitButton = getByText('Login'); // Assuming there's only one submit button
  fireEvent.click(submitButton);

  const errorMessages = queryAllByText('Incorrect username or password');
  expect(errorMessages).toHaveLength(1); // Check for existence of at least one error message
  expect(errorMessages[0]).toBeInTheDocument();
});

});*/}
