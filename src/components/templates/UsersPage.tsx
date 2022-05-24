import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import Card from "../atoms/Card";
import DataTable from "../organisms/DataTableTemplate";

interface UserPageProps {}

const UsersPageTemplate = ({}: UserPageProps) => {
  return (
    <Container>
      <Card
        style={{
          height: "fit-content",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: 0,
        }}
      >
        <DataTable />
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
export default UsersPageTemplate;
