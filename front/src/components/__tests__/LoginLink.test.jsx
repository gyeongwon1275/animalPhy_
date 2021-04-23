import React from 'react';

import { render, screen } from '@testing-library/react';

import LoginLink from '../LoginLink';

describe('LoginLink', () => {
  it('renders LoginLink', () => {
    render(<LoginLink />);

    expect(screen.getByRole('img', { name: 'user' })).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
