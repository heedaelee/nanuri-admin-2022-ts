import React from "react";
import styled from "styled-components";
import LeftSideTop from "../molecules/LeftSideTop";
import LeftSideBottom from "../molecules/LeftSideBottom";

interface SidebarTemplateProps {}

const SidebarTemplate = () => {
  return (
    <LeftSide>
      {/* 상단 */}
      <LeftSideTop />
      {/* 하단 */}
      <LeftSideBottom />
    </LeftSide>
  );
};

const LeftSide = styled.div`
  display: flex;
  /* flex: 0.5 250px; */
  width: 250px;
  height: 100%;
  flex-direction: column;
  /* border: "1px solid blue"; */
`;

export default SidebarTemplate;