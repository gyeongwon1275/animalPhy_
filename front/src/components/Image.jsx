import React from 'react';

import styled from '@emotion/styled';

const PostImage = styled.img({
  width: '100vw',
  height: 'auto',

  margin: '10px 0',

  cursor: 'pointer',
  objectFit: 'cover',

  '@media (min-width: 768px)': {
    width: '13.5vw',
    height: '13.5vw',

  },
});

export default function Image({ src, postId, onClick }) {
  return (
    <PostImage
      src={src}
      alt="post"
      onClick={() => onClick(postId)}
    />
  );
}
