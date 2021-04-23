import React from 'react';

import styled from '@emotion/styled';

import Paw from '../utils/paw.svg';

const PawIcon = styled(Paw)({
  width: '33px',
  height: 'auto',
});

const Link = styled.a({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  '&:hover': {
    color: 'inherit',
  },
});

const LogoTitle = styled.span({
  marginLeft: '5px',

  fontSize: '1.5rem',
  fontWeight: 'bold',
});

export default function Logo() {
  return (
    <Link href="/">
      <PawIcon />
      <LogoTitle>AnimalPhy</LogoTitle>
    </Link>
  );
}
