import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the OgaStock brand in the header', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/OgaStock/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
