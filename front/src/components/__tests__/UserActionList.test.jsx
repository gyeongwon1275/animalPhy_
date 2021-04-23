import React from 'react';

import { render, screen } from '@testing-library/react';

import UserActionList from '../UserActionList';

describe('UserActionList', () => {
  it('renders UserActionList', () => {
    render(<UserActionList />);

    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });
});
