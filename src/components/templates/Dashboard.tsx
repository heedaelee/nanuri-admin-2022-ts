import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  return (
    <Container>
      <Top></Top>
      <Center></Center>
      <Bottom></Bottom>
    </Container>
  );
};

const Container = styled.div`
  /* width: 100%; */
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex: 1;
  padding: 12vh 5vw;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  flex: 2;
  border: 1px solid black;
`;
const Center = styled.div`
  width: 100%;
  flex: 4.1;
  border: 1px solid black;
`;
const Bottom = styled.div`
  width: 100%;
  flex: 4;
  border: 1px solid black;
`;

export default Dashboard;
