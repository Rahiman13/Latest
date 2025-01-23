import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Background />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout; 