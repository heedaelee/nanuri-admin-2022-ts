import React, { ReactNode } from "react";
import styled from "styled-components";
import Card from "../atoms/Card";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <Container>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {children}
      </Card>
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

export default AppContainer;
