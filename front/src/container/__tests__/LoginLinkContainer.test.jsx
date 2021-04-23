import React from 'react';

import { render, screen } from '@testing-library/react';

import { useSelector } from 'react-redux';

import given from 'given2';

import LoginLinkContainer from '../LoginLinkContainer';

import { mockUser } from '../../feature/mockData';

describe('LoginLinkContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementationOnce((selector) => selector({
      user: {
        accessToken: given.accessToken,
        user: given.user,
      },
    }));
  });

  context('without accessToken', () => {
    it('renders Login link', () => {
      given('accessToken', () => '');
      given('user', () => null);

      render((<LoginLinkContainer />));

      const loginLink = screen.getByRole('link', { name: 'login-link' });
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  context('with accessToken', () => {
    it('renders ProfileButton', () => {
      given('accessToken', () => '1234');
      given('user', () => mockUser);

      render((<LoginLinkContainer />));

      const loginLink = screen.queryByRole('link', { name: 'Login' });
      expect(loginLink).not.toBeInTheDocument();

      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'user-profile' })).toBeInTheDocument();
    });
  });
});
