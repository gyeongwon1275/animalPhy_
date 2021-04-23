import React from 'react';

import { UserOutlined } from '@ant-design/icons';

import styled from '@emotion/styled';

const Link = styled.a({

  fontSize: '1rem',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  height: '40px',
  width: '170px',

  '&:hover': {
    color: 'white',
  },

});

const UserIconWrapper = styled.div({

  fontSize: '1.2rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '20%',
  height: '100%',

  backgroundColor: 'rgb(100, 100, 100)',

});

const TextWrapper = styled.div({

  width: '80%',
  height: '100%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: 'rgb(65, 65, 65)',

});

export default function LoginLink() {
  return (
    <Link href="/login" aria-label="login-link">
      <UserIconWrapper>
        <UserOutlined />
      </UserIconWrapper>
      <TextWrapper>
        Login
      </TextWrapper>
    </Link>
  );
}
