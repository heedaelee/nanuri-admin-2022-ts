/* eslint-disable no-empty-pattern */
import { Hidden } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AppInfoProvider } from "../../lib/AppInfoProvider/AppInfoProvider";
import Theme from "../../lib/Theme";
import AppInfoView from "../atoms/AppInfoView";
import Sidebar from "./Sidebar";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <AppInfoProvider>
      <Container>
        <Sidebar />
        <ContentContainer>
          {/* 자식 라우터 시작 --> */}
          <Outlet />
          {/*  -->  끝 */}
          <AppInfoView />
        </ContentContainer>
        <Hidden lgDown>
          <RightSide />
        </Hidden>
      </Container>
    </AppInfoProvider>
  );
};

//NOTE: 상단 css
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  position: relative;
  /* width: 1440px; */
  max-width: 1440px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid #f9f9fb;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
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
