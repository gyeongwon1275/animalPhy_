import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import LogoutButton from '../LogoutButton';

describe('LogoutButton', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  it('renders LogoutButton', () => {
    render(<LogoutButton onClick={onClick} />);

    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('listens click event', () => {
    render(<LogoutButton onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Log out' });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
