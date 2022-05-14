import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Theme from "../../lib/Theme";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  return (
    <Container>
      <FeaturedInfo>
        <FeaturedItem></FeaturedItem>
        <FeaturedItem></FeaturedItem>
      </FeaturedInfo>
      <Chart></Chart>
      <Bottom></Bottom>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const FeaturedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 2;
  /* border: 1px solid black; */
`;

//NOTE:css 그룹해서 사용하는것!
const boxShadow = css`
  box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
`;

const FeaturedItem = styled.div`
  flex: 1;
  /* margin: 0 20px; */
  /* margin-right: 10px; */
  /* border: 1px solid black; */
  & + & {
    margin-left: 30px;
  }

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  cursor: pointer;

  background: #ffffff;
  ${boxShadow}
`;

const Chart = styled.div`
  width: 100%;
  flex: 4.1;
  margin-top: 30px;
  ${boxShadow}/* border: 1px solid black; */
`;
const Bottom = styled.div`
  width: 100%;
  flex: 4;
  margin-top: 30px;
  ${boxShadow}
  
`;

export default Dashboard;
