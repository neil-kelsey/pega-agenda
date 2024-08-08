import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders without crashing', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });

  test('renders the copyright text', () => {
    const { getByText } = render(<Footer />);
    const copyrightText = getByText('© Copyright 2024 - Pegasystems Inc. | Built by Neil Kelsey');
    expect(copyrightText).toBeInTheDocument();
  });
});