import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";

import { darken, lighten } from "polished";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <Container>
      <LeftSide></LeftSide>
      <Content></Content>
      <RightSide></RightSide>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const LeftSide = styled.div`
  display: flex;
  flex: 2.2;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex: 6;
  flex-direction: column;
  background-color: ${Theme.color.blue[1]};
`;
const RightSide = styled.div`
  display: flex;
  flex: 2.8;
`;

export default Layout;
