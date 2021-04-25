import React from 'react';

import {
  render, screen, fireEvent,
} from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import LoginLinkContainer from '../LoginLinkContainer';

import { mockUser } from '../../feature/mockData';
import { logout } from '../../data/userReducer';

describe('LoginLinkContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

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

      const loginLink = screen.getByTestId('login-link');
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

  context('when click Log out button', () => {
    it('logs out', async () => {
      given('accessToken', () => '1234');
      given('user', () => mockUser);

      render((<LoginLinkContainer />));

      const logoutButton = screen.getByText('Log out');

      expect(logoutButton).toBeInTheDocument();

      fireEvent.click(logoutButton);

      expect(dispatch).toHaveBeenCalledWith(logout());
    });
  });
});
