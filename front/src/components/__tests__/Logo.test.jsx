import React from 'react';

import { render, screen } from '@testing-library/react';

import Logo from '../Logo';

describe('Logo', () => {
  it('renders LOGO', () => {
    render(<Logo />);

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
