import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import Sidebar from "./Sidebar";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <Container>
      <Sidebar />
      <ContentContainer>
        {/* 자식 라우터 시작 --> */}
        <Outlet />
        {/*  -->  끝 */}
      </ContentContainer>
      <RightSide />
    </Container>
  );
};

//NOTE: 상단 css
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  /* width: 1440px; */
  max-width: 1440px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  /* width:862px; */
  background-color: ${Theme.color.blue[1]};
  padding: 40px 40px;
  /* border: 1px solid; */
`;

const RightSide = styled.div`
  display: flex;
  flex: 1.8;
`;

export default Layout;
