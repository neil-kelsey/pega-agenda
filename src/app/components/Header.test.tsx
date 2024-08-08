import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  test('renders the logo with correct attributes', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText('Pega logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/pega-logo.svg');
    expect(logo).toHaveAttribute('width', '134');
    expect(logo).toHaveAttribute('height', '50');
  });
});
