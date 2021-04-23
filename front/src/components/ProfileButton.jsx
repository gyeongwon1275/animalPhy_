import React from 'react';

import styled from '@emotion/styled';

import { DownOutlined } from '@ant-design/icons';

const ProfileWrapper = styled.div({

  display: 'flex',

  width: '170px',
  height: '40px',

  fontWeight: 'bold',

  backgroundColor: 'rgb(65, 65, 65)',

  cursor: 'pointer',

});

const ProfileImage = styled.img({

  width: '40px',
  height: '40px',

  backgroundColor: 'rgb(100, 100, 100)',

});

const UserNameWrapper = styled.div({

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,

  padding: '0 0.5rem',

  textOverflow: 'ellipsis',
});

const IconWrapper = styled.div({
  width: '40px',
  height: '40px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function ProfileButton({ user }) {
  if (!user) return <></>;

  const { profileUrl, name } = user;

  return (
    <ProfileWrapper>
      <ProfileImage src={profileUrl} alt="user-profile" />
      <UserNameWrapper>
        {name}
      </UserNameWrapper>
      <IconWrapper>
        <DownOutlined />
      </IconWrapper>
    </ProfileWrapper>
  );
}
