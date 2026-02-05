import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('App component', () => {
  test('renders header, login and footer components', () => {
    render(<App />);
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });

  test('displays News from the School and its paragraph', () => {
    render(<App />);
    expect(screen.getByText(/News from the School/i)).toBeInTheDocument();
    expect(screen.getByText(/Holberton School News goes here/i)).toBeInTheDocument();
  });

  test('displays CourseList instead of Login after logIn is called', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(submitBtn);

    expect(screen.queryByText(/Login to access the full dashboard/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
  });
});

describe('App notification drawer behavior', () => {
  test('drawer is displayed by default', () => {
    render(<App />);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('hides drawer when clicking on close button', () => {
    render(<App />);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('shows drawer when clicking on "Your notifications" after hiding', () => {
    render(<App />);
    // First hide the drawer
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    // Then show it again
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('markNotificationAsRead removes the notification and logs it', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);

    // Since drawer is open by default, we can directly check for notifications
    const notif = screen.getByText(/New course available/i);
    expect(notif).toBeInTheDocument();

    // Simulate a click on the notification to mark as read
    fireEvent.click(notif);

    // Should disappear
    expect(screen.queryByText(/New course available/i)).not.toBeInTheDocument();

    // Verify the console.log
    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    logSpy.mockRestore();
  });
});
