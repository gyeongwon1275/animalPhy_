import React from 'react';

import { render, screen } from '@testing-library/react';

import LoginLink from '../LoginLink';

describe('LoginLink', () => {
  it('renders LoginLink', () => {
    render(<LoginLink />);

    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });
});
