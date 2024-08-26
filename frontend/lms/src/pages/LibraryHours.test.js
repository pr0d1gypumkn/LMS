// src/pages/LibraryHours.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import LibraryHours from '/frontend/lms/src/pages/LibraryHours';

// Basic render test
test('renders the library hours correctly', () => {
  render(<LibraryHours />);
  
  // Check if the title is present
  expect(screen.getByText(/Library Hours/i)).toBeInTheDocument();
  
  // Check if the hours are displayed correctly
  expect(screen.getByText(/Monday to Friday: 9:00 AM - 8:00 PM/i)).toBeInTheDocument();
  expect(screen.getByText(/Saturday: 10:00 AM - 6:00 PM/i)).toBeInTheDocument();
  expect(screen.getByText(/Sunday: Closed/i)).toBeInTheDocument();
});
