import React from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #19234d, #2b5a9e);
  z-index: -1;
`;

const Background = () => {
  return <BackgroundWrapper />;
};

export default Background; 