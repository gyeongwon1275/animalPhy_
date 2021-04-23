import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginLink from '../components/LoginLink';
import ProfileButton from '../components/ProfileButton';
import { loadNonMember, logout } from '../data/userReducer';

export default function LoginLinkContainer() {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state) => state.user);

  if (!accessToken) {
    return <LoginLink />;
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(loadNonMember());
  };

  return <ProfileButton user={user} handleLogout={handleLogout} />;
}
