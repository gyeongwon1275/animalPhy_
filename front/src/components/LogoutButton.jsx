import React from 'react';

import styled from '@emotion/styled';

const Button = styled.button({

  width: '100%',
  height: '40px',

  textAlign: 'center',

  cursor: 'pointer',

  '&:hover': {
    fontWeight: 'bold',
    backgroundColor: 'rgb(100, 100, 100)',
  },

});

export default function LogoutButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      Log out
    </Button>
  );
}
