import React from 'react';

import { useSelector } from 'react-redux';

import LoginLink from '../components/LoginLink';
import ProfileButton from '../components/ProfileButton';

export default function LoginLinkContainer() {
  const { accessToken, user } = useSelector((state) => state.user);

  if (!accessToken) {
    return <LoginLink />;
  }

  return <ProfileButton user={user} />;
}
