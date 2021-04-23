import React from 'react';

import styled from '@emotion/styled';
import LogoutButton from './LogoutButton';

const List = styled.ul({

  position: 'absolute',

  width: '170px',
  height: 'auto',

  backgroundColor: 'rgb(65, 65, 65)',

  zIndex: 1,

});

export default function UserActionList({ handleLogout }) {
  return (
    <List aria-label="drop-down-menu">
      <li><LogoutButton onClick={handleLogout} /></li>
    </List>
  );
}
